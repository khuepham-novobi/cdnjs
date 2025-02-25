'use strict'

const eos = require('readable-stream').finished
const statusCodes = require('http').STATUS_CODES
const flatstr = require('flatstr')
const FJS = require('fast-json-stringify')
const {
  kFourOhFourContext,
  kReplyErrorHandlerCalled,
  kReplySent,
  kReplySentOverwritten,
  kReplyStartTime,
  kReplySerializer,
  kReplySerializerDefault,
  kReplyIsError,
  kReplyHeaders,
  kReplyHasStatusCode,
  kReplyIsRunningOnErrorHook,
  kDisableRequestLogging
} = require('./symbols.js')
const { hookRunner, hookIterator, onSendHookRunner } = require('./hooks')
const validation = require('./validation')
const serialize = validation.serialize

const internals = require('./handleRequest')[Symbol.for('internals')]
const loggerUtils = require('./logger')
const now = loggerUtils.now
const wrapThenable = require('./wrapThenable')

const serializeError = FJS({
  type: 'object',
  properties: {
    statusCode: { type: 'number' },
    code: { type: 'string' },
    error: { type: 'string' },
    message: { type: 'string' }
  }
})

const CONTENT_TYPE = {
  JSON: 'application/json; charset=utf-8',
  PLAIN: 'text/plain; charset=utf-8',
  OCTET: 'application/octet-stream'
}
const {
  codes: {
    FST_ERR_REP_INVALID_PAYLOAD_TYPE,
    FST_ERR_REP_ALREADY_SENT,
    FST_ERR_REP_SENT_VALUE,
    FST_ERR_SEND_INSIDE_ONERR,
    FST_ERR_BAD_STATUS_CODE
  }
} = require('./errors')

var getHeader

function Reply (res, context, request, log) {
  this.res = res
  this.context = context
  this[kReplySent] = false
  this[kReplySerializer] = null
  this[kReplyErrorHandlerCalled] = false
  this[kReplyIsError] = false
  this[kReplyIsRunningOnErrorHook] = false
  this.request = request
  this[kReplyHeaders] = {}
  this[kReplyHasStatusCode] = false
  this[kReplyStartTime] = undefined
  this.log = log
}

Object.defineProperty(Reply.prototype, 'sent', {
  enumerable: true,
  get () {
    return this[kReplySent]
  },
  set (value) {
    if (value !== true) {
      throw new FST_ERR_REP_SENT_VALUE()
    }

    if (this[kReplySent]) {
      throw new FST_ERR_REP_ALREADY_SENT()
    }

    this[kReplySentOverwritten] = true
    this[kReplySent] = true
  }
})

Object.defineProperty(Reply.prototype, 'statusCode', {
  get () {
    return this.res.statusCode
  },
  set (value) {
    this.code(value)
  }
})

Reply.prototype.send = function (payload) {
  if (this[kReplyIsRunningOnErrorHook] === true) {
    throw new FST_ERR_SEND_INSIDE_ONERR()
  }

  if (this[kReplySent]) {
    this.log.warn({ err: new FST_ERR_REP_ALREADY_SENT() }, 'Reply already sent')
    return this
  }

  if (payload instanceof Error || this[kReplyIsError] === true) {
    onErrorHook(this, payload, onSendHook)
    return this
  }

  if (payload === undefined) {
    onSendHook(this, payload)
    return this
  }

  var contentType = getHeader(this, 'content-type')
  var hasContentType = contentType !== undefined

  if (payload !== null) {
    if (Buffer.isBuffer(payload) || typeof payload.pipe === 'function') {
      if (hasContentType === false) {
        this[kReplyHeaders]['content-type'] = CONTENT_TYPE.OCTET
      }
      onSendHook(this, payload)
      return this
    }

    if (hasContentType === false && typeof payload === 'string') {
      this[kReplyHeaders]['content-type'] = CONTENT_TYPE.PLAIN
      onSendHook(this, payload)
      return this
    }
  }

  if (this[kReplySerializer] !== null) {
    payload = this[kReplySerializer](payload)

  // The indexOf below also matches custom json mimetypes such as 'application/hal+json' or 'application/ld+json'
  } else if (hasContentType === false || contentType.indexOf('json') > -1) {
    if (hasContentType === false) {
      this[kReplyHeaders]['content-type'] = CONTENT_TYPE.JSON
    } else {
      // If hasContentType === true, we have a JSON mimetype
      if (contentType.indexOf('charset') === -1) {
        // If we have simply application/json instead of a custom json mimetype
        if (contentType.indexOf('/json') > -1) {
          this[kReplyHeaders]['content-type'] = CONTENT_TYPE.JSON
        } else {
          const currContentType = this[kReplyHeaders]['content-type']
          // We extract the custom mimetype part (e.g. 'hal+' from 'application/hal+json')
          const customJsonType = currContentType.substring(
            currContentType.indexOf('/'),
            currContentType.indexOf('json') + 4
          )

          // We ensure we set the header to the proper JSON content-type if necessary
          // (e.g. 'application/hal+json' instead of 'application/json')
          this[kReplyHeaders]['content-type'] = CONTENT_TYPE.JSON.replace('/json', customJsonType)
        }
      }
    }
    if (typeof payload !== 'string') {
      preserializeHook(this, payload)
      return this
    }
  }

  onSendHook(this, payload)

  return this
}

Reply.prototype.getHeader = function (key) {
  return getHeader(this, key)
}

Reply.prototype.hasHeader = function (key) {
  return this[kReplyHeaders][key.toLowerCase()] !== undefined
}

Reply.prototype.removeHeader = function (key) {
  // Node.js does not like headers with keys set to undefined,
  // so we have to delete the key.
  delete this[kReplyHeaders][key.toLowerCase()]
  return this
}

Reply.prototype.header = function (key, value) {
  var _key = key.toLowerCase()

  // default the value to ''
  value = value === undefined ? '' : value

  if (this[kReplyHeaders][_key] && _key === 'set-cookie') {
    // https://tools.ietf.org/html/rfc7230#section-3.2.2
    if (typeof this[kReplyHeaders][_key] === 'string') {
      this[kReplyHeaders][_key] = [this[kReplyHeaders][_key]]
    }
    if (Array.isArray(value)) {
      Array.prototype.push.apply(this[kReplyHeaders][_key], value)
    } else {
      this[kReplyHeaders][_key].push(value)
    }
  } else {
    this[kReplyHeaders][_key] = value
  }
  return this
}

Reply.prototype.headers = function (headers) {
  var keys = Object.keys(headers)
  for (var i = 0; i < keys.length; i++) {
    this.header(keys[i], headers[keys[i]])
  }
  return this
}

Reply.prototype.code = function (code) {
  const intValue = parseInt(code)
  if (isNaN(intValue) || intValue < 100 || intValue > 600) {
    throw new FST_ERR_BAD_STATUS_CODE(String(code))
  }

  this.res.statusCode = intValue
  this[kReplyHasStatusCode] = true
  return this
}

Reply.prototype.status = Reply.prototype.code

Reply.prototype.serialize = function (payload) {
  if (this[kReplySerializer] !== null) {
    return this[kReplySerializer](payload)
  } else {
    if (this.context && this.context[kReplySerializerDefault]) {
      return this.context[kReplySerializerDefault](payload, this.res.statusCode)
    } else {
      return serialize(this.context, payload, this.res.statusCode)
    }
  }
}

Reply.prototype.serializer = function (fn) {
  this[kReplySerializer] = fn
  return this
}

Reply.prototype.type = function (type) {
  this[kReplyHeaders]['content-type'] = type
  return this
}

Reply.prototype.redirect = function (code, url) {
  if (typeof code === 'string') {
    url = code
    code = this[kReplyHasStatusCode] ? this.res.statusCode : 302
  }

  this.header('location', url).code(code).send()
}

Reply.prototype.callNotFound = function () {
  notFound(this)
}

Reply.prototype.getResponseTime = function () {
  var responseTime = 0

  if (this[kReplyStartTime] !== undefined) {
    responseTime = now() - this[kReplyStartTime]
  }

  return responseTime
}

// Make reply a thenable, so it could be used with async/await.
// See
// - https://github.com/fastify/fastify/issues/1864 for the discussions
// - https://promisesaplus.com/ for the definition of thenable
// - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then for the signature
Reply.prototype.then = function (fullfilled, rejected) {
  if (this.sent) {
    fullfilled()
    return
  }

  eos(this.res, function (err) {
    // We must not treat ERR_STREAM_PREMATURE_CLOSE as
    // an error because it is created by eos, not by the stream.
    if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
      if (rejected) {
        rejected(err)
      }
    } else {
      fullfilled()
    }
  })
}

function preserializeHook (reply, payload) {
  if (reply.context.preSerialization !== null) {
    onSendHookRunner(
      reply.context.preSerialization,
      reply.request,
      reply,
      payload,
      preserializeHookEnd
    )
  } else {
    preserializeHookEnd(null, reply.request, reply, payload)
  }
}

function preserializeHookEnd (err, request, reply, payload) {
  if (err != null) {
    onErrorHook(reply, err)
    return
  }

  if (reply.context && reply.context[kReplySerializerDefault]) {
    payload = reply.context[kReplySerializerDefault](payload, reply.res.statusCode)
  } else {
    payload = serialize(reply.context, payload, reply.res.statusCode)
  }

  flatstr(payload)

  onSendHook(reply, payload)
}

function onSendHook (reply, payload) {
  reply[kReplySent] = true
  if (reply.context.onSend !== null) {
    onSendHookRunner(
      reply.context.onSend,
      reply.request,
      reply,
      payload,
      wrapOnSendEnd
    )
  } else {
    onSendEnd(reply, payload)
  }
}

function wrapOnSendEnd (err, request, reply, payload) {
  if (err != null) {
    onErrorHook(reply, err)
  } else {
    onSendEnd(reply, payload)
  }
}

function onSendEnd (reply, payload) {
  var res = reply.res
  var statusCode = res.statusCode

  if (payload === undefined || payload === null) {
    reply[kReplySent] = true

    // according to https://tools.ietf.org/html/rfc7230#section-3.3.2
    // we cannot send a content-length for 304 and 204, and all status code
    // < 200.
    if (statusCode >= 200 && statusCode !== 204 && statusCode !== 304) {
      reply[kReplyHeaders]['content-length'] = '0'
    }

    res.writeHead(statusCode, reply[kReplyHeaders])
    // avoid ArgumentsAdaptorTrampoline from V8
    res.end(null, null, null)
    return
  }

  if (typeof payload.pipe === 'function') {
    sendStream(payload, res, reply)
    return
  }

  if (typeof payload !== 'string' && !Buffer.isBuffer(payload)) {
    throw new FST_ERR_REP_INVALID_PAYLOAD_TYPE(typeof payload)
  }

  if (!reply[kReplyHeaders]['content-length']) {
    reply[kReplyHeaders]['content-length'] = '' + Buffer.byteLength(payload)
  }

  reply[kReplySent] = true

  res.writeHead(statusCode, reply[kReplyHeaders])

  // avoid ArgumentsAdaptorTrampoline from V8
  res.end(payload, null, null)
}

function sendStream (payload, res, reply) {
  var sourceOpen = true

  eos(payload, { readable: true, writable: false }, function (err) {
    sourceOpen = false
    if (err != null) {
      if (res.headersSent) {
        reply.log.warn({ err }, 'response terminated with an error with headers already sent')
        res.destroy()
      } else {
        onErrorHook(reply, err)
      }
    }
    // there is nothing to do if there is not an error
  })

  eos(res, function (err) {
    if (err != null) {
      if (res.headersSent) {
        reply.log.warn({ err }, 'response terminated with an error with headers already sent')
      }
      if (sourceOpen) {
        if (payload.destroy) {
          payload.destroy()
        } else if (typeof payload.close === 'function') {
          payload.close(noop)
        } else if (typeof payload.abort === 'function') {
          payload.abort()
        }
      }
    }
  })

  // streams will error asynchronously, and we want to handle that error
  // appropriately, e.g. a 404 for a missing file. So we cannot use
  // writeHead, and we need to resort to setHeader, which will trigger
  // a writeHead when there is data to send.
  if (!res.headersSent) {
    for (var key in reply[kReplyHeaders]) {
      res.setHeader(key, reply[kReplyHeaders][key])
    }
  } else {
    reply.log.warn('response will send, but you shouldn\'t use res.writeHead in stream mode')
  }
  payload.pipe(res)
}

function onErrorHook (reply, error, cb) {
  reply[kReplySent] = true
  if (reply.context.onError !== null && reply[kReplyErrorHandlerCalled] === true) {
    reply[kReplyIsRunningOnErrorHook] = true
    onSendHookRunner(
      reply.context.onError,
      reply.request,
      reply,
      error,
      () => handleError(reply, error, cb)
    )
  } else {
    handleError(reply, error, cb)
  }
}

function handleError (reply, error, cb) {
  reply[kReplyIsRunningOnErrorHook] = false
  var res = reply.res
  var statusCode = res.statusCode
  statusCode = (statusCode >= 400) ? statusCode : 500
  // treat undefined and null as same
  if (error != null) {
    if (error.headers !== undefined) {
      reply.headers(error.headers)
    }
    if (error.status >= 400) {
      statusCode = error.status
    } else if (error.statusCode >= 400) {
      statusCode = error.statusCode
    }
  }

  res.statusCode = statusCode

  var errorHandler = reply.context.errorHandler
  if (errorHandler && reply[kReplyErrorHandlerCalled] === false) {
    reply[kReplySent] = false
    reply[kReplyIsError] = false
    reply[kReplyErrorHandlerCalled] = true
    var result = errorHandler(error, reply.request, reply)
    if (result && typeof result.then === 'function') {
      wrapThenable(result, reply)
    }
    return
  }

  var payload = serializeError({
    error: statusCodes[statusCode + ''],
    code: error.code,
    message: error.message || '',
    statusCode: statusCode
  })
  flatstr(payload)
  reply[kReplyHeaders]['content-type'] = CONTENT_TYPE.JSON
  reply[kReplyHeaders]['content-length'] = '' + Buffer.byteLength(payload)

  if (cb) {
    cb(reply, payload)
    return
  }

  reply[kReplySent] = true
  res.writeHead(res.statusCode, reply[kReplyHeaders])
  res.end(payload)
}

function setupResponseListeners (reply) {
  reply[kReplyStartTime] = now()

  var onResFinished = err => {
    reply.res.removeListener('finish', onResFinished)
    reply.res.removeListener('error', onResFinished)

    var ctx = reply.context

    if (ctx && ctx.onResponse !== null) {
      hookRunner(
        ctx.onResponse,
        onResponseIterator,
        reply.request,
        reply,
        onResponseCallback
      )
    } else {
      onResponseCallback(err, reply.request, reply)
    }
  }

  reply.res.on('finish', onResFinished)
  reply.res.on('error', onResFinished)
}

function onResponseIterator (fn, request, reply, next) {
  return fn(request, reply, next)
}

function onResponseCallback (err, request, reply) {
  if (reply.log[kDisableRequestLogging]) {
    return
  }

  var responseTime = reply.getResponseTime()

  if (err != null) {
    reply.log.error({
      res: reply.res,
      err,
      responseTime
    }, 'request errored')
    return
  }

  reply.log.info({
    res: reply.res,
    responseTime
  }, 'request completed')
}

function buildReply (R) {
  function _Reply (res, context, request, log) {
    this.res = res
    this.context = context
    this[kReplyIsError] = false
    this[kReplyErrorHandlerCalled] = false
    this[kReplySent] = false
    this[kReplySentOverwritten] = false
    this[kReplySerializer] = null
    this.request = request
    this[kReplyHeaders] = {}
    this[kReplyStartTime] = undefined
    this.log = log
  }
  _Reply.prototype = new R()
  return _Reply
}

function notFound (reply) {
  reply[kReplySent] = false
  reply[kReplyIsError] = false

  if (reply.context[kFourOhFourContext] === null) {
    reply.log.warn('Trying to send a NotFound error inside a 404 handler. Sending basic 404 response.')
    reply.code(404).send('404 Not Found')
    return
  }

  reply.context = reply.context[kFourOhFourContext]

  // preHandler hook
  if (reply.context.preHandler !== null) {
    hookRunner(
      reply.context.preHandler,
      hookIterator,
      reply.request,
      reply,
      internals.preHandlerCallback
    )
  } else {
    internals.preHandlerCallback(null, reply.request, reply)
  }
}

function noop () {}

function getHeaderProper (reply, key) {
  key = key.toLowerCase()
  var res = reply.res
  var value = reply[kReplyHeaders][key]
  if (value === undefined && res.hasHeader(key)) {
    value = res.getHeader(key)
  }
  return value
}

function getHeaderFallback (reply, key) {
  key = key.toLowerCase()
  var res = reply.res
  var value = reply[kReplyHeaders][key]
  if (value === undefined) {
    value = res.getHeader(key)
  }
  return value
}

// ponyfill for hasHeader. It has been introduced into Node 7.7,
// so it's ok to use it in 8+
{
  const v = process.version.match(/v(\d+)/)[1]
  if (Number(v) > 7) {
    getHeader = getHeaderProper
  } else {
    getHeader = getHeaderFallback
  }
}

module.exports = Reply
module.exports.buildReply = buildReply
module.exports.setupResponseListeners = setupResponseListeners
