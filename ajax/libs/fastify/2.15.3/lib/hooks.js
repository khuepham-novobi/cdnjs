'use strict'

const supportedHooks = [
  'onRequest',
  'preParsing',
  'preValidation',
  'preSerialization',
  'preHandler',
  'onResponse',
  'onSend',
  'onError',
  // executed at start/close time
  'onRoute',
  'onRegister',
  'onReady',
  'onClose'
]
const {
  codes: {
    FST_ERR_HOOK_INVALID_TYPE,
    FST_ERR_HOOK_INVALID_HANDLER,
    FST_ERR_SEND_UNDEFINED_ERR
  }
} = require('./errors')

const {
  kChildren,
  kHooks
} = require('./symbols')

function Hooks () {
  this.onRequest = []
  this.preParsing = []
  this.preValidation = []
  this.preSerialization = []
  this.preHandler = []
  this.onResponse = []
  this.onSend = []
  this.onError = []
  this.onReady = []
}

Hooks.prototype.validate = function (hook, fn) {
  if (typeof hook !== 'string') throw new FST_ERR_HOOK_INVALID_TYPE()
  if (typeof fn !== 'function') throw new FST_ERR_HOOK_INVALID_HANDLER()
  if (supportedHooks.indexOf(hook) === -1) {
    throw new Error(`${hook} hook not supported!`)
  }
}

Hooks.prototype.add = function (hook, fn) {
  this.validate(hook, fn)
  this[hook].push(fn)
}

function buildHooks (h) {
  const hooks = new Hooks()
  hooks.onRequest = h.onRequest.slice()
  hooks.preParsing = h.preParsing.slice()
  hooks.preValidation = h.preValidation.slice()
  hooks.preSerialization = h.preSerialization.slice()
  hooks.preHandler = h.preHandler.slice()
  hooks.onSend = h.onSend.slice()
  hooks.onResponse = h.onResponse.slice()
  hooks.onError = h.onError.slice()
  hooks.onReady = []
  return hooks
}

function hookRunnerApplication (hookName, boot, server, cb) {
  const hooks = server[kHooks][hookName]
  var i = 0
  var c = 0

  next()

  function exit (err) {
    if (err) {
      cb(err)
      return
    }
    cb()
  }

  function next (err) {
    if (err) {
      exit(err)
      return
    }

    if (i === hooks.length && c === server[kChildren].length) {
      if (i === 0 && c === 0) { // speed up start
        exit()
      } else {
        boot(function manageTimeout (err, done) {
          exit(err) // reply to the client's cb
          done(err) // goahead with the avvio line
        })
      }
      return
    }

    if (i === hooks.length && c < server[kChildren].length) {
      const child = server[kChildren][c++]
      hookRunnerApplication(hookName, boot, child, next)
      return
    }

    boot(wrap(hooks[i++], server))
    next()
  }

  function wrap (fn, server) {
    return function (err, done) {
      if (err) {
        done(err)
        return
      }

      if (fn.length === 1) {
        try {
          fn.call(server, done)
        } catch (error) {
          done(error)
        }
        return
      }

      const ret = fn.call(server)
      if (ret && typeof ret.then === 'function') {
        ret.then(done, done)
        return
      }

      done(err) // auto done
    }
  }
}

function hookRunner (functions, runner, request, reply, cb) {
  var i = 0

  function next (err) {
    if (err || i === functions.length) {
      cb(err, request, reply)
      return
    }

    const result = runner(functions[i++], request, reply, next)
    if (result && typeof result.then === 'function') {
      result.then(handleResolve, handleReject)
    }
  }

  function handleResolve () {
    next()
  }

  function handleReject (err) {
    if (err === undefined) err = new FST_ERR_SEND_UNDEFINED_ERR()
    cb(err, request, reply)
  }

  next()
}

function onSendHookRunner (functions, request, reply, payload, cb) {
  var i = 0

  function next (err, newPayload) {
    if (err) {
      cb(err, request, reply, payload)
      return
    }

    if (newPayload !== undefined) {
      payload = newPayload
    }

    if (i === functions.length) {
      cb(null, request, reply, payload)
      return
    }

    const result = functions[i++](request, reply, payload, next)
    if (result && typeof result.then === 'function') {
      result.then(handleResolve, handleReject)
    }
  }

  function handleResolve (newPayload) {
    next(null, newPayload)
  }

  function handleReject (err) {
    cb(err, request, reply, payload)
  }

  next()
}

function hookIterator (fn, request, reply, next) {
  if (reply.sent === true) return undefined
  return fn(request, reply, next)
}

module.exports = {
  Hooks,
  buildHooks,
  hookRunner,
  onSendHookRunner,
  hookIterator,
  hookRunnerApplication
}
