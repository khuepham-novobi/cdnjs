/**
 * auth0-js v9.13.4
 * Author: Auth0
 * Date: 2020-09-11
 * License: MIT
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.CordovaAuth0Plugin = factory());
}(this, (function () { 'use strict';

  var version = { raw: '9.13.4' };

  var toString = Object.prototype.toString;

  function attribute(o, attr, type, text) {
    type = type === 'array' ? 'object' : type;
    if (o && typeof o[attr] !== type) {
      throw new Error(text);
    }
  }

  function variable(o, type, text) {
    if (typeof o !== type) {
      throw new Error(text);
    }
  }

  function value(o, values, text) {
    if (values.indexOf(o) === -1) {
      throw new Error(text);
    }
  }

  function check(o, config, attributes) {
    if (!config.optional || o) {
      variable(o, config.type, config.message);
    }
    if (config.type === 'object' && attributes) {
      var keys = Object.keys(attributes);

      for (var index = 0; index < keys.length; index++) {
        var a = keys[index];
        if (!attributes[a].optional || o[a]) {
          if (!attributes[a].condition || attributes[a].condition(o)) {
            attribute(o, a, attributes[a].type, attributes[a].message);
            if (attributes[a].values) {
              value(o[a], attributes[a].values, attributes[a].value_message);
            }
          }
        }
      }
    }
  }

  /**
   * Wrap `Array.isArray` Polyfill for IE9
   * source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
   *
   * @param {Array} array
   * @private
   */
  function isArray(array) {
    if (this.supportsIsArray()) {
      return Array.isArray(array);
    }

    return toString.call(array) === '[object Array]';
  }

  function supportsIsArray() {
    return Array.isArray != null;
  }

  var assert = {
    check: check,
    attribute: attribute,
    variable: variable,
    value: value,
    isArray: isArray,
    supportsIsArray: supportsIsArray
  };

  /* eslint-disable no-continue */

  function get() {
    if (!Object.assign) {
      return objectAssignPolyfill;
    }

    return Object.assign;
  }

  function objectAssignPolyfill(target) {
    if (target === undefined || target === null) {
      throw new TypeError('Cannot convert first argument to object');
    }

    var to = Object(target);
    for (var i = 1; i < arguments.length; i++) {
      var nextSource = arguments[i];
      if (nextSource === undefined || nextSource === null) {
        continue;
      }

      var keysArray = Object.keys(Object(nextSource));
      for (
        var nextIndex = 0, len = keysArray.length;
        nextIndex < len;
        nextIndex++
      ) {
        var nextKey = keysArray[nextIndex];
        var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
        if (desc !== undefined && desc.enumerable) {
          to[nextKey] = nextSource[nextKey];
        }
      }
    }
    return to;
  }

  var objectAssign = {
    get: get,
    objectAssignPolyfill: objectAssignPolyfill
  };

  /* eslint-disable no-param-reassign */

  function pick(object, keys) {
    return keys.reduce(function(prev, key) {
      if (object[key]) {
        prev[key] = object[key];
      }
      return prev;
    }, {});
  }

  function getKeysNotIn(obj, allowedKeys) {
    var notAllowed = [];
    for (var key in obj) {
      if (allowedKeys.indexOf(key) === -1) {
        notAllowed.push(key);
      }
    }
    return notAllowed;
  }

  function objectValues(obj) {
    var values = [];
    for (var key in obj) {
      values.push(obj[key]);
    }
    return values;
  }

  function extend() {
    var params = objectValues(arguments);
    params.unshift({});
    return objectAssign.get().apply(undefined, params);
  }

  function merge(object, keys) {
    return {
      base: keys ? pick(object, keys) : object,
      with: function(object2, keys2) {
        object2 = keys2 ? pick(object2, keys2) : object2;
        return extend(this.base, object2);
      }
    };
  }

  function blacklist(object, blacklistedKeys) {
    return Object.keys(object).reduce(function(p, key) {
      if (blacklistedKeys.indexOf(key) === -1) {
        p[key] = object[key];
      }
      return p;
    }, {});
  }

  function camelToSnake(str) {
    var newKey = '';
    var index = 0;
    var code;
    var wasPrevNumber = true;
    var wasPrevUppercase = true;

    while (index < str.length) {
      code = str.charCodeAt(index);
      if (
        (!wasPrevUppercase && code >= 65 && code <= 90) ||
        (!wasPrevNumber && code >= 48 && code <= 57)
      ) {
        newKey += '_';
        newKey += str[index].toLowerCase();
      } else {
        newKey += str[index].toLowerCase();
      }
      wasPrevNumber = code >= 48 && code <= 57;
      wasPrevUppercase = code >= 65 && code <= 90;
      index++;
    }

    return newKey;
  }

  function snakeToCamel(str) {
    var parts = str.split('_');
    return parts.reduce(function(p, c) {
      return p + c.charAt(0).toUpperCase() + c.slice(1);
    }, parts.shift());
  }

  function toSnakeCase(object, exceptions) {
    if (typeof object !== 'object' || assert.isArray(object) || object === null) {
      return object;
    }
    exceptions = exceptions || [];

    return Object.keys(object).reduce(function(p, key) {
      var newKey = exceptions.indexOf(key) === -1 ? camelToSnake(key) : key;
      p[newKey] = toSnakeCase(object[key]);
      return p;
    }, {});
  }

  function toCamelCase(object, exceptions, options) {
    if (typeof object !== 'object' || assert.isArray(object) || object === null) {
      return object;
    }

    exceptions = exceptions || [];
    options = options || {};
    return Object.keys(object).reduce(function(p, key) {
      var newKey = exceptions.indexOf(key) === -1 ? snakeToCamel(key) : key;

      p[newKey] = toCamelCase(object[newKey] || object[key], [], options);

      if (options.keepOriginal) {
        p[key] = toCamelCase(object[key], [], options);
      }
      return p;
    }, {});
  }

  function getLocationFromUrl(href) {
    var match = href.match(
      /^(https?:|file:|chrome-extension:)\/\/(([^:/?#]*)(?::([0-9]+))?)([/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/
    );
    return (
      match && {
        href: href,
        protocol: match[1],
        host: match[2],
        hostname: match[3],
        port: match[4],
        pathname: match[5],
        search: match[6],
        hash: match[7]
      }
    );
  }

  function getOriginFromUrl(url) {
    if (!url) {
      return undefined;
    }
    var parsed = getLocationFromUrl(url);
    if (!parsed) {
      return null;
    }
    var origin = parsed.protocol + '//' + parsed.hostname;
    if (parsed.port) {
      origin += ':' + parsed.port;
    }
    return origin;
  }

  function trim(options, key) {
    var trimmed = extend(options);
    if (options[key]) {
      trimmed[key] = options[key].trim();
    }
    return trimmed;
  }

  function trimMultiple(options, keys) {
    return keys.reduce(trim, options);
  }

  function trimUserDetails(options) {
    return trimMultiple(options, ['username', 'email', 'phoneNumber']);
  }

  /**
   * Updates the value of a property on the given object, using a deep path selector.
   * @param {object} obj The object to set the property value on
   * @param {string|array} path The path to the property that should have its value updated. e.g. 'prop1.prop2.prop3' or ['prop1', 'prop2', 'prop3']
   * @param {any} value The value to set
   */
  function updatePropertyOn(obj, path, value) {
    if (typeof path === 'string') {
      path = path.split('.');
    }

    var next = path[0];

    if (obj.hasOwnProperty(next)) {
      if (path.length === 1) {
        obj[next] = value;
      } else {
        updatePropertyOn(obj[next], path.slice(1), value);
      }
    }
  }

  var objectHelper = {
    toSnakeCase: toSnakeCase,
    toCamelCase: toCamelCase,
    blacklist: blacklist,
    merge: merge,
    pick: pick,
    getKeysNotIn: getKeysNotIn,
    extend: extend,
    getOriginFromUrl: getOriginFromUrl,
    getLocationFromUrl: getLocationFromUrl,
    trimUserDetails: trimUserDetails,
    updatePropertyOn: updatePropertyOn
  };

  function redirect(url) {
    getWindow().location = url;
  }

  function getDocument() {
    return getWindow().document;
  }

  function getWindow() {
    return window;
  }

  function getOrigin() {
    var location = getWindow().location;
    var origin = location.origin;

    if (!origin) {
      origin = objectHelper.getOriginFromUrl(location.href);
    }

    return origin;
  }

  var windowHandler = {
    redirect: redirect,
    getDocument: getDocument,
    getWindow: getWindow,
    getOrigin: getOrigin
  };

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var urlJoin = createCommonjsModule(function (module) {
  (function (name, context, definition) {
    if ( module.exports) module.exports = definition();
    else context[name] = definition();
  })('urljoin', commonjsGlobal, function () {

    function normalize (strArray) {
      var resultArray = [];
      if (strArray.length === 0) { return ''; }

      if (typeof strArray[0] !== 'string') {
        throw new TypeError('Url must be a string. Received ' + strArray[0]);
      }

      // If the first part is a plain protocol, we combine it with the next part.
      if (strArray[0].match(/^[^/:]+:\/*$/) && strArray.length > 1) {
        var first = strArray.shift();
        strArray[0] = first + strArray[0];
      }

      // There must be two or three slashes in the file protocol, two slashes in anything else.
      if (strArray[0].match(/^file:\/\/\//)) {
        strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1:///');
      } else {
        strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1://');
      }

      for (var i = 0; i < strArray.length; i++) {
        var component = strArray[i];

        if (typeof component !== 'string') {
          throw new TypeError('Url must be a string. Received ' + component);
        }

        if (component === '') { continue; }

        if (i > 0) {
          // Removing the starting slashes for each component but the first.
          component = component.replace(/^[\/]+/, '');
        }
        if (i < strArray.length - 1) {
          // Removing the ending slashes for each component but the last.
          component = component.replace(/[\/]+$/, '');
        } else {
          // For the last component we will combine multiple slashes to a single one.
          component = component.replace(/[\/]+$/, '/');
        }

        resultArray.push(component);

      }

      var str = resultArray.join('/');
      // Each input component is now separated by a single slash except the possible first plain protocol part.

      // remove trailing slash before parameters or hash
      str = str.replace(/\/(\?|&|#[^!])/g, '$1');

      // replace ? in parameters with &
      var parts = str.split('?');
      str = parts.shift() + (parts.length > 0 ? '?': '') + parts.join('&');

      return str;
    }

    return function () {
      var input;

      if (typeof arguments[0] === 'object') {
        input = arguments[0];
      } else {
        input = [].slice.call(arguments);
      }

      return normalize(input);
    };

  });
  });

  var has = Object.prototype.hasOwnProperty;
  var isArray$1 = Array.isArray;

  var hexTable = (function () {
      var array = [];
      for (var i = 0; i < 256; ++i) {
          array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
      }

      return array;
  }());

  var compactQueue = function compactQueue(queue) {
      while (queue.length > 1) {
          var item = queue.pop();
          var obj = item.obj[item.prop];

          if (isArray$1(obj)) {
              var compacted = [];

              for (var j = 0; j < obj.length; ++j) {
                  if (typeof obj[j] !== 'undefined') {
                      compacted.push(obj[j]);
                  }
              }

              item.obj[item.prop] = compacted;
          }
      }
  };

  var arrayToObject = function arrayToObject(source, options) {
      var obj = options && options.plainObjects ? Object.create(null) : {};
      for (var i = 0; i < source.length; ++i) {
          if (typeof source[i] !== 'undefined') {
              obj[i] = source[i];
          }
      }

      return obj;
  };

  var merge$1 = function merge(target, source, options) {
      /* eslint no-param-reassign: 0 */
      if (!source) {
          return target;
      }

      if (typeof source !== 'object') {
          if (isArray$1(target)) {
              target.push(source);
          } else if (target && typeof target === 'object') {
              if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                  target[source] = true;
              }
          } else {
              return [target, source];
          }

          return target;
      }

      if (!target || typeof target !== 'object') {
          return [target].concat(source);
      }

      var mergeTarget = target;
      if (isArray$1(target) && !isArray$1(source)) {
          mergeTarget = arrayToObject(target, options);
      }

      if (isArray$1(target) && isArray$1(source)) {
          source.forEach(function (item, i) {
              if (has.call(target, i)) {
                  var targetItem = target[i];
                  if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                      target[i] = merge(targetItem, item, options);
                  } else {
                      target.push(item);
                  }
              } else {
                  target[i] = item;
              }
          });
          return target;
      }

      return Object.keys(source).reduce(function (acc, key) {
          var value = source[key];

          if (has.call(acc, key)) {
              acc[key] = merge(acc[key], value, options);
          } else {
              acc[key] = value;
          }
          return acc;
      }, mergeTarget);
  };

  var assign = function assignSingleSource(target, source) {
      return Object.keys(source).reduce(function (acc, key) {
          acc[key] = source[key];
          return acc;
      }, target);
  };

  var decode = function (str, decoder, charset) {
      var strWithoutPlus = str.replace(/\+/g, ' ');
      if (charset === 'iso-8859-1') {
          // unescape never throws, no try...catch needed:
          return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
      }
      // utf-8
      try {
          return decodeURIComponent(strWithoutPlus);
      } catch (e) {
          return strWithoutPlus;
      }
  };

  var encode = function encode(str, defaultEncoder, charset) {
      // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
      // It has been adapted here for stricter adherence to RFC 3986
      if (str.length === 0) {
          return str;
      }

      var string = str;
      if (typeof str === 'symbol') {
          string = Symbol.prototype.toString.call(str);
      } else if (typeof str !== 'string') {
          string = String(str);
      }

      if (charset === 'iso-8859-1') {
          return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
              return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
          });
      }

      var out = '';
      for (var i = 0; i < string.length; ++i) {
          var c = string.charCodeAt(i);

          if (
              c === 0x2D // -
              || c === 0x2E // .
              || c === 0x5F // _
              || c === 0x7E // ~
              || (c >= 0x30 && c <= 0x39) // 0-9
              || (c >= 0x41 && c <= 0x5A) // a-z
              || (c >= 0x61 && c <= 0x7A) // A-Z
          ) {
              out += string.charAt(i);
              continue;
          }

          if (c < 0x80) {
              out = out + hexTable[c];
              continue;
          }

          if (c < 0x800) {
              out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
              continue;
          }

          if (c < 0xD800 || c >= 0xE000) {
              out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
              continue;
          }

          i += 1;
          c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
          out += hexTable[0xF0 | (c >> 18)]
              + hexTable[0x80 | ((c >> 12) & 0x3F)]
              + hexTable[0x80 | ((c >> 6) & 0x3F)]
              + hexTable[0x80 | (c & 0x3F)];
      }

      return out;
  };

  var compact = function compact(value) {
      var queue = [{ obj: { o: value }, prop: 'o' }];
      var refs = [];

      for (var i = 0; i < queue.length; ++i) {
          var item = queue[i];
          var obj = item.obj[item.prop];

          var keys = Object.keys(obj);
          for (var j = 0; j < keys.length; ++j) {
              var key = keys[j];
              var val = obj[key];
              if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                  queue.push({ obj: obj, prop: key });
                  refs.push(val);
              }
          }
      }

      compactQueue(queue);

      return value;
  };

  var isRegExp = function isRegExp(obj) {
      return Object.prototype.toString.call(obj) === '[object RegExp]';
  };

  var isBuffer = function isBuffer(obj) {
      if (!obj || typeof obj !== 'object') {
          return false;
      }

      return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
  };

  var combine = function combine(a, b) {
      return [].concat(a, b);
  };

  var maybeMap = function maybeMap(val, fn) {
      if (isArray$1(val)) {
          var mapped = [];
          for (var i = 0; i < val.length; i += 1) {
              mapped.push(fn(val[i]));
          }
          return mapped;
      }
      return fn(val);
  };

  var utils = {
      arrayToObject: arrayToObject,
      assign: assign,
      combine: combine,
      compact: compact,
      decode: decode,
      encode: encode,
      isBuffer: isBuffer,
      isRegExp: isRegExp,
      maybeMap: maybeMap,
      merge: merge$1
  };

  var replace = String.prototype.replace;
  var percentTwenties = /%20/g;



  var Format = {
      RFC1738: 'RFC1738',
      RFC3986: 'RFC3986'
  };

  var formats = utils.assign(
      {
          'default': Format.RFC3986,
          formatters: {
              RFC1738: function (value) {
                  return replace.call(value, percentTwenties, '+');
              },
              RFC3986: function (value) {
                  return String(value);
              }
          }
      },
      Format
  );

  var has$1 = Object.prototype.hasOwnProperty;

  var arrayPrefixGenerators = {
      brackets: function brackets(prefix) {
          return prefix + '[]';
      },
      comma: 'comma',
      indices: function indices(prefix, key) {
          return prefix + '[' + key + ']';
      },
      repeat: function repeat(prefix) {
          return prefix;
      }
  };

  var isArray$2 = Array.isArray;
  var push = Array.prototype.push;
  var pushToArray = function (arr, valueOrArray) {
      push.apply(arr, isArray$2(valueOrArray) ? valueOrArray : [valueOrArray]);
  };

  var toISO = Date.prototype.toISOString;

  var defaultFormat = formats['default'];
  var defaults = {
      addQueryPrefix: false,
      allowDots: false,
      charset: 'utf-8',
      charsetSentinel: false,
      delimiter: '&',
      encode: true,
      encoder: utils.encode,
      encodeValuesOnly: false,
      format: defaultFormat,
      formatter: formats.formatters[defaultFormat],
      // deprecated
      indices: false,
      serializeDate: function serializeDate(date) {
          return toISO.call(date);
      },
      skipNulls: false,
      strictNullHandling: false
  };

  var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
      return typeof v === 'string'
          || typeof v === 'number'
          || typeof v === 'boolean'
          || typeof v === 'symbol'
          || typeof v === 'bigint';
  };

  var stringify = function stringify(
      object,
      prefix,
      generateArrayPrefix,
      strictNullHandling,
      skipNulls,
      encoder,
      filter,
      sort,
      allowDots,
      serializeDate,
      formatter,
      encodeValuesOnly,
      charset
  ) {
      var obj = object;
      if (typeof filter === 'function') {
          obj = filter(prefix, obj);
      } else if (obj instanceof Date) {
          obj = serializeDate(obj);
      } else if (generateArrayPrefix === 'comma' && isArray$2(obj)) {
          obj = utils.maybeMap(obj, function (value) {
              if (value instanceof Date) {
                  return serializeDate(value);
              }
              return value;
          }).join(',');
      }

      if (obj === null) {
          if (strictNullHandling) {
              return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, 'key') : prefix;
          }

          obj = '';
      }

      if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
          if (encoder) {
              var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key');
              return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset, 'value'))];
          }
          return [formatter(prefix) + '=' + formatter(String(obj))];
      }

      var values = [];

      if (typeof obj === 'undefined') {
          return values;
      }

      var objKeys;
      if (isArray$2(filter)) {
          objKeys = filter;
      } else {
          var keys = Object.keys(obj);
          objKeys = sort ? keys.sort(sort) : keys;
      }

      for (var i = 0; i < objKeys.length; ++i) {
          var key = objKeys[i];
          var value = obj[key];

          if (skipNulls && value === null) {
              continue;
          }

          var keyPrefix = isArray$2(obj)
              ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix
              : prefix + (allowDots ? '.' + key : '[' + key + ']');

          pushToArray(values, stringify(
              value,
              keyPrefix,
              generateArrayPrefix,
              strictNullHandling,
              skipNulls,
              encoder,
              filter,
              sort,
              allowDots,
              serializeDate,
              formatter,
              encodeValuesOnly,
              charset
          ));
      }

      return values;
  };

  var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
      if (!opts) {
          return defaults;
      }

      if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
          throw new TypeError('Encoder has to be a function.');
      }

      var charset = opts.charset || defaults.charset;
      if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
          throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
      }

      var format = formats['default'];
      if (typeof opts.format !== 'undefined') {
          if (!has$1.call(formats.formatters, opts.format)) {
              throw new TypeError('Unknown format option provided.');
          }
          format = opts.format;
      }
      var formatter = formats.formatters[format];

      var filter = defaults.filter;
      if (typeof opts.filter === 'function' || isArray$2(opts.filter)) {
          filter = opts.filter;
      }

      return {
          addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
          allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
          charset: charset,
          charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
          delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
          encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
          encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
          encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
          filter: filter,
          formatter: formatter,
          serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
          skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
          sort: typeof opts.sort === 'function' ? opts.sort : null,
          strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
      };
  };

  var stringify_1 = function (object, opts) {
      var obj = object;
      var options = normalizeStringifyOptions(opts);

      var objKeys;
      var filter;

      if (typeof options.filter === 'function') {
          filter = options.filter;
          obj = filter('', obj);
      } else if (isArray$2(options.filter)) {
          filter = options.filter;
          objKeys = filter;
      }

      var keys = [];

      if (typeof obj !== 'object' || obj === null) {
          return '';
      }

      var arrayFormat;
      if (opts && opts.arrayFormat in arrayPrefixGenerators) {
          arrayFormat = opts.arrayFormat;
      } else if (opts && 'indices' in opts) {
          arrayFormat = opts.indices ? 'indices' : 'repeat';
      } else {
          arrayFormat = 'indices';
      }

      var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

      if (!objKeys) {
          objKeys = Object.keys(obj);
      }

      if (options.sort) {
          objKeys.sort(options.sort);
      }

      for (var i = 0; i < objKeys.length; ++i) {
          var key = objKeys[i];

          if (options.skipNulls && obj[key] === null) {
              continue;
          }
          pushToArray(keys, stringify(
              obj[key],
              key,
              generateArrayPrefix,
              options.strictNullHandling,
              options.skipNulls,
              options.encode ? options.encoder : null,
              options.filter,
              options.sort,
              options.allowDots,
              options.serializeDate,
              options.formatter,
              options.encodeValuesOnly,
              options.charset
          ));
      }

      var joined = keys.join(options.delimiter);
      var prefix = options.addQueryPrefix === true ? '?' : '';

      if (options.charsetSentinel) {
          if (options.charset === 'iso-8859-1') {
              // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
              prefix += 'utf8=%26%2310003%3B&';
          } else {
              // encodeURIComponent('✓')
              prefix += 'utf8=%E2%9C%93&';
          }
      }

      return joined.length > 0 ? prefix + joined : '';
  };

  var has$2 = Object.prototype.hasOwnProperty;
  var isArray$3 = Array.isArray;

  var defaults$1 = {
      allowDots: false,
      allowPrototypes: false,
      arrayLimit: 20,
      charset: 'utf-8',
      charsetSentinel: false,
      comma: false,
      decoder: utils.decode,
      delimiter: '&',
      depth: 5,
      ignoreQueryPrefix: false,
      interpretNumericEntities: false,
      parameterLimit: 1000,
      parseArrays: true,
      plainObjects: false,
      strictNullHandling: false
  };

  var interpretNumericEntities = function (str) {
      return str.replace(/&#(\d+);/g, function ($0, numberStr) {
          return String.fromCharCode(parseInt(numberStr, 10));
      });
  };

  var parseArrayValue = function (val, options) {
      if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
          return val.split(',');
      }

      return val;
  };

  // This is what browsers will submit when the ✓ character occurs in an
  // application/x-www-form-urlencoded body and the encoding of the page containing
  // the form is iso-8859-1, or when the submitted form has an accept-charset
  // attribute of iso-8859-1. Presumably also with other charsets that do not contain
  // the ✓ character, such as us-ascii.
  var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

  // These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
  var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

  var parseValues = function parseQueryStringValues(str, options) {
      var obj = {};
      var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
      var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
      var parts = cleanStr.split(options.delimiter, limit);
      var skipIndex = -1; // Keep track of where the utf8 sentinel was found
      var i;

      var charset = options.charset;
      if (options.charsetSentinel) {
          for (i = 0; i < parts.length; ++i) {
              if (parts[i].indexOf('utf8=') === 0) {
                  if (parts[i] === charsetSentinel) {
                      charset = 'utf-8';
                  } else if (parts[i] === isoSentinel) {
                      charset = 'iso-8859-1';
                  }
                  skipIndex = i;
                  i = parts.length; // The eslint settings do not allow break;
              }
          }
      }

      for (i = 0; i < parts.length; ++i) {
          if (i === skipIndex) {
              continue;
          }
          var part = parts[i];

          var bracketEqualsPos = part.indexOf(']=');
          var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

          var key, val;
          if (pos === -1) {
              key = options.decoder(part, defaults$1.decoder, charset, 'key');
              val = options.strictNullHandling ? null : '';
          } else {
              key = options.decoder(part.slice(0, pos), defaults$1.decoder, charset, 'key');
              val = utils.maybeMap(
                  parseArrayValue(part.slice(pos + 1), options),
                  function (encodedVal) {
                      return options.decoder(encodedVal, defaults$1.decoder, charset, 'value');
                  }
              );
          }

          if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
              val = interpretNumericEntities(val);
          }

          if (part.indexOf('[]=') > -1) {
              val = isArray$3(val) ? [val] : val;
          }

          if (has$2.call(obj, key)) {
              obj[key] = utils.combine(obj[key], val);
          } else {
              obj[key] = val;
          }
      }

      return obj;
  };

  var parseObject = function (chain, val, options, valuesParsed) {
      var leaf = valuesParsed ? val : parseArrayValue(val, options);

      for (var i = chain.length - 1; i >= 0; --i) {
          var obj;
          var root = chain[i];

          if (root === '[]' && options.parseArrays) {
              obj = [].concat(leaf);
          } else {
              obj = options.plainObjects ? Object.create(null) : {};
              var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
              var index = parseInt(cleanRoot, 10);
              if (!options.parseArrays && cleanRoot === '') {
                  obj = { 0: leaf };
              } else if (
                  !isNaN(index)
                  && root !== cleanRoot
                  && String(index) === cleanRoot
                  && index >= 0
                  && (options.parseArrays && index <= options.arrayLimit)
              ) {
                  obj = [];
                  obj[index] = leaf;
              } else {
                  obj[cleanRoot] = leaf;
              }
          }

          leaf = obj; // eslint-disable-line no-param-reassign
      }

      return leaf;
  };

  var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
      if (!givenKey) {
          return;
      }

      // Transform dot notation to bracket notation
      var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

      // The regex chunks

      var brackets = /(\[[^[\]]*])/;
      var child = /(\[[^[\]]*])/g;

      // Get the parent

      var segment = options.depth > 0 && brackets.exec(key);
      var parent = segment ? key.slice(0, segment.index) : key;

      // Stash the parent if it exists

      var keys = [];
      if (parent) {
          // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
          if (!options.plainObjects && has$2.call(Object.prototype, parent)) {
              if (!options.allowPrototypes) {
                  return;
              }
          }

          keys.push(parent);
      }

      // Loop through children appending to the array until we hit depth

      var i = 0;
      while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
          i += 1;
          if (!options.plainObjects && has$2.call(Object.prototype, segment[1].slice(1, -1))) {
              if (!options.allowPrototypes) {
                  return;
              }
          }
          keys.push(segment[1]);
      }

      // If there's a remainder, just add whatever is left

      if (segment) {
          keys.push('[' + key.slice(segment.index) + ']');
      }

      return parseObject(keys, val, options, valuesParsed);
  };

  var normalizeParseOptions = function normalizeParseOptions(opts) {
      if (!opts) {
          return defaults$1;
      }

      if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
          throw new TypeError('Decoder has to be a function.');
      }

      if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
          throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
      }
      var charset = typeof opts.charset === 'undefined' ? defaults$1.charset : opts.charset;

      return {
          allowDots: typeof opts.allowDots === 'undefined' ? defaults$1.allowDots : !!opts.allowDots,
          allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults$1.allowPrototypes,
          arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults$1.arrayLimit,
          charset: charset,
          charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults$1.charsetSentinel,
          comma: typeof opts.comma === 'boolean' ? opts.comma : defaults$1.comma,
          decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults$1.decoder,
          delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults$1.delimiter,
          // eslint-disable-next-line no-implicit-coercion, no-extra-parens
          depth: (typeof opts.depth === 'number' || opts.depth === false) ? +opts.depth : defaults$1.depth,
          ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
          interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults$1.interpretNumericEntities,
          parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults$1.parameterLimit,
          parseArrays: opts.parseArrays !== false,
          plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults$1.plainObjects,
          strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults$1.strictNullHandling
      };
  };

  var parse = function (str, opts) {
      var options = normalizeParseOptions(opts);

      if (str === '' || str === null || typeof str === 'undefined') {
          return options.plainObjects ? Object.create(null) : {};
      }

      var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
      var obj = options.plainObjects ? Object.create(null) : {};

      // Iterate over the keys and setup the new object

      var keys = Object.keys(tempObj);
      for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
          obj = utils.merge(obj, newObj, options);
      }

      return utils.compact(obj);
  };

  var lib = {
      formats: formats,
      parse: parse,
      stringify: stringify_1
  };

  function PopupHandler(webAuth) {
    this.webAuth = webAuth;
    this._current_popup = null;
    this.options = null;
  }

  PopupHandler.prototype.preload = function(options) {
    var _this = this;
    var _window = windowHandler.getWindow();

    var url = options.url || 'about:blank';
    var popupOptions = options.popupOptions || {};

    popupOptions.location = 'yes';
    delete popupOptions.width;
    delete popupOptions.height;

    var windowFeatures = lib.stringify(popupOptions, {
      encode: false,
      delimiter: ','
    });

    if (this._current_popup && !this._current_popup.closed) {
      return this._current_popup;
    }

    this._current_popup = _window.open(url, '_blank', windowFeatures);

    this._current_popup.kill = function(success) {
      _this._current_popup.success = success;
      this.close();
      _this._current_popup = null;
    };

    return this._current_popup;
  };

  PopupHandler.prototype.load = function(url, _, options, cb) {
    var _this = this;
    this.url = url;
    this.options = options;
    if (!this._current_popup) {
      options.url = url;
      this.preload(options);
    } else {
      this._current_popup.location.href = url;
    }

    this.transientErrorHandler = function(event) {
      _this.errorHandler(event, cb);
    };

    this.transientStartHandler = function(event) {
      _this.startHandler(event, cb);
    };

    this.transientExitHandler = function() {
      _this.exitHandler(cb);
    };

    this._current_popup.addEventListener('loaderror', this.transientErrorHandler);
    this._current_popup.addEventListener('loadstart', this.transientStartHandler);
    this._current_popup.addEventListener('exit', this.transientExitHandler);
  };

  PopupHandler.prototype.errorHandler = function(event, cb) {
    if (!this._current_popup) {
      return;
    }

    this._current_popup.kill(true);

    cb({ error: 'window_error', errorDescription: event.message });
  };

  PopupHandler.prototype.unhook = function() {
    this._current_popup.removeEventListener(
      'loaderror',
      this.transientErrorHandler
    );
    this._current_popup.removeEventListener(
      'loadstart',
      this.transientStartHandler
    );
    this._current_popup.removeEventListener('exit', this.transientExitHandler);
  };

  PopupHandler.prototype.exitHandler = function(cb) {
    if (!this._current_popup) {
      return;
    }

    // when the modal is closed, this event is called which ends up removing the
    // event listeners. If you move this before closing the modal, it will add ~1 sec
    // delay between the user being redirected to the callback and the popup gets closed.
    this.unhook();

    if (!this._current_popup.success) {
      cb({ error: 'window_closed', errorDescription: 'Browser window closed' });
    }
  };

  PopupHandler.prototype.startHandler = function(event, cb) {
    var _this = this;

    if (!this._current_popup) {
      return;
    }

    var callbackUrl = urlJoin(
      'https:',
      this.webAuth.baseOptions.domain,
      '/mobile'
    );

    if (event.url && !(event.url.indexOf(callbackUrl + '#') === 0)) {
      return;
    }

    var parts = event.url.split('#');

    if (parts.length === 1) {
      return;
    }

    var opts = { hash: parts.pop() };

    if (this.options.nonce) {
      opts.nonce = this.options.nonce;
    }

    this.webAuth.parseHash(opts, function(error, result) {
      if (error || result) {
        _this._current_popup.kill(true);
        cb(error, result);
      }
    });
  };

  function PluginHandler(webAuth) {
    this.webAuth = webAuth;
  }

  PluginHandler.prototype.processParams = function(params) {
    params.redirectUri = urlJoin('https://' + params.domain, 'mobile');
    delete params.owp;
    return params;
  };

  PluginHandler.prototype.getPopupHandler = function() {
    return new PopupHandler(this.webAuth);
  };

  function CordovaPlugin() {
    this.webAuth = null;
    this.version = version.raw;
    this.extensibilityPoints = ['popup.authorize', 'popup.getPopupHandler'];
  }

  CordovaPlugin.prototype.setWebAuth = function(webAuth) {
    this.webAuth = webAuth;
  };

  CordovaPlugin.prototype.supports = function(extensibilityPoint) {
    var _window = windowHandler.getWindow();
    return (
      (!!_window.cordova || !!_window.electron) &&
      this.extensibilityPoints.indexOf(extensibilityPoint) > -1
    );
  };

  CordovaPlugin.prototype.init = function() {
    return new PluginHandler(this.webAuth);
  };

  return CordovaPlugin;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZG92YS1hdXRoMC1wbHVnaW4uanMiLCJzb3VyY2VzIjpbIi4uL3NyYy92ZXJzaW9uLmpzIiwiLi4vc3JjL2hlbHBlci9hc3NlcnQuanMiLCIuLi9zcmMvaGVscGVyL29iamVjdC1hc3NpZ24uanMiLCIuLi9zcmMvaGVscGVyL29iamVjdC5qcyIsIi4uL3NyYy9oZWxwZXIvd2luZG93LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3VybC1qb2luL2xpYi91cmwtam9pbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9xcy9saWIvdXRpbHMuanMiLCIuLi9ub2RlX21vZHVsZXMvcXMvbGliL2Zvcm1hdHMuanMiLCIuLi9ub2RlX21vZHVsZXMvcXMvbGliL3N0cmluZ2lmeS5qcyIsIi4uL25vZGVfbW9kdWxlcy9xcy9saWIvcGFyc2UuanMiLCIuLi9ub2RlX21vZHVsZXMvcXMvbGliL2luZGV4LmpzIiwiLi4vcGx1Z2lucy9jb3Jkb3ZhL3BvcHVwLWhhbmRsZXIuanMiLCIuLi9wbHVnaW5zL2NvcmRvdmEvcGx1Z2luLWhhbmRsZXIuanMiLCIuLi9wbHVnaW5zL2NvcmRvdmEvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSB7IHJhdzogJzkuMTMuNCcgfTtcbiIsInZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbmZ1bmN0aW9uIGF0dHJpYnV0ZShvLCBhdHRyLCB0eXBlLCB0ZXh0KSB7XG4gIHR5cGUgPSB0eXBlID09PSAnYXJyYXknID8gJ29iamVjdCcgOiB0eXBlO1xuICBpZiAobyAmJiB0eXBlb2Ygb1thdHRyXSAhPT0gdHlwZSkge1xuICAgIHRocm93IG5ldyBFcnJvcih0ZXh0KTtcbiAgfVxufVxuXG5mdW5jdGlvbiB2YXJpYWJsZShvLCB0eXBlLCB0ZXh0KSB7XG4gIGlmICh0eXBlb2YgbyAhPT0gdHlwZSkge1xuICAgIHRocm93IG5ldyBFcnJvcih0ZXh0KTtcbiAgfVxufVxuXG5mdW5jdGlvbiB2YWx1ZShvLCB2YWx1ZXMsIHRleHQpIHtcbiAgaWYgKHZhbHVlcy5pbmRleE9mKG8pID09PSAtMSkge1xuICAgIHRocm93IG5ldyBFcnJvcih0ZXh0KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVjayhvLCBjb25maWcsIGF0dHJpYnV0ZXMpIHtcbiAgaWYgKCFjb25maWcub3B0aW9uYWwgfHwgbykge1xuICAgIHZhcmlhYmxlKG8sIGNvbmZpZy50eXBlLCBjb25maWcubWVzc2FnZSk7XG4gIH1cbiAgaWYgKGNvbmZpZy50eXBlID09PSAnb2JqZWN0JyAmJiBhdHRyaWJ1dGVzKSB7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKTtcblxuICAgIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBrZXlzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgdmFyIGEgPSBrZXlzW2luZGV4XTtcbiAgICAgIGlmICghYXR0cmlidXRlc1thXS5vcHRpb25hbCB8fCBvW2FdKSB7XG4gICAgICAgIGlmICghYXR0cmlidXRlc1thXS5jb25kaXRpb24gfHwgYXR0cmlidXRlc1thXS5jb25kaXRpb24obykpIHtcbiAgICAgICAgICBhdHRyaWJ1dGUobywgYSwgYXR0cmlidXRlc1thXS50eXBlLCBhdHRyaWJ1dGVzW2FdLm1lc3NhZ2UpO1xuICAgICAgICAgIGlmIChhdHRyaWJ1dGVzW2FdLnZhbHVlcykge1xuICAgICAgICAgICAgdmFsdWUob1thXSwgYXR0cmlidXRlc1thXS52YWx1ZXMsIGF0dHJpYnV0ZXNbYV0udmFsdWVfbWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogV3JhcCBgQXJyYXkuaXNBcnJheWAgUG9seWZpbGwgZm9yIElFOVxuICogc291cmNlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9pc0FycmF5XG4gKlxuICogQHBhcmFtIHtBcnJheX0gYXJyYXlcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkoYXJyYXkpIHtcbiAgaWYgKHRoaXMuc3VwcG9ydHNJc0FycmF5KCkpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheShhcnJheSk7XG4gIH1cblxuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcnJheSkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbmZ1bmN0aW9uIHN1cHBvcnRzSXNBcnJheSgpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkgIT0gbnVsbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBjaGVjazogY2hlY2ssXG4gIGF0dHJpYnV0ZTogYXR0cmlidXRlLFxuICB2YXJpYWJsZTogdmFyaWFibGUsXG4gIHZhbHVlOiB2YWx1ZSxcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgc3VwcG9ydHNJc0FycmF5OiBzdXBwb3J0c0lzQXJyYXlcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb250aW51ZSAqL1xuXG5mdW5jdGlvbiBnZXQoKSB7XG4gIGlmICghT2JqZWN0LmFzc2lnbikge1xuICAgIHJldHVybiBvYmplY3RBc3NpZ25Qb2x5ZmlsbDtcbiAgfVxuXG4gIHJldHVybiBPYmplY3QuYXNzaWduO1xufVxuXG5mdW5jdGlvbiBvYmplY3RBc3NpZ25Qb2x5ZmlsbCh0YXJnZXQpIHtcbiAgaWYgKHRhcmdldCA9PT0gdW5kZWZpbmVkIHx8IHRhcmdldCA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IGZpcnN0IGFyZ3VtZW50IHRvIG9iamVjdCcpO1xuICB9XG5cbiAgdmFyIHRvID0gT2JqZWN0KHRhcmdldCk7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIG5leHRTb3VyY2UgPSBhcmd1bWVudHNbaV07XG4gICAgaWYgKG5leHRTb3VyY2UgPT09IHVuZGVmaW5lZCB8fCBuZXh0U291cmNlID09PSBudWxsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICB2YXIga2V5c0FycmF5ID0gT2JqZWN0LmtleXMoT2JqZWN0KG5leHRTb3VyY2UpKTtcbiAgICBmb3IgKFxuICAgICAgdmFyIG5leHRJbmRleCA9IDAsIGxlbiA9IGtleXNBcnJheS5sZW5ndGg7XG4gICAgICBuZXh0SW5kZXggPCBsZW47XG4gICAgICBuZXh0SW5kZXgrK1xuICAgICkge1xuICAgICAgdmFyIG5leHRLZXkgPSBrZXlzQXJyYXlbbmV4dEluZGV4XTtcbiAgICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihuZXh0U291cmNlLCBuZXh0S2V5KTtcbiAgICAgIGlmIChkZXNjICE9PSB1bmRlZmluZWQgJiYgZGVzYy5lbnVtZXJhYmxlKSB7XG4gICAgICAgIHRvW25leHRLZXldID0gbmV4dFNvdXJjZVtuZXh0S2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRvO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGdldDogZ2V0LFxuICBvYmplY3RBc3NpZ25Qb2x5ZmlsbDogb2JqZWN0QXNzaWduUG9seWZpbGxcbn07XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cbi8qIGVzbGludC1kaXNhYmxlIGd1YXJkLWZvci1pbiAqL1xuXG5pbXBvcnQgYXNzZXJ0IGZyb20gJy4vYXNzZXJ0JztcbmltcG9ydCBvYmplY3RBc3NpZ24gZnJvbSAnLi9vYmplY3QtYXNzaWduJztcblxuZnVuY3Rpb24gcGljayhvYmplY3QsIGtleXMpIHtcbiAgcmV0dXJuIGtleXMucmVkdWNlKGZ1bmN0aW9uKHByZXYsIGtleSkge1xuICAgIGlmIChvYmplY3Rba2V5XSkge1xuICAgICAgcHJldltrZXldID0gb2JqZWN0W2tleV07XG4gICAgfVxuICAgIHJldHVybiBwcmV2O1xuICB9LCB7fSk7XG59XG5cbmZ1bmN0aW9uIGdldEtleXNOb3RJbihvYmosIGFsbG93ZWRLZXlzKSB7XG4gIHZhciBub3RBbGxvd2VkID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoYWxsb3dlZEtleXMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgbm90QWxsb3dlZC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBub3RBbGxvd2VkO1xufVxuXG5mdW5jdGlvbiBvYmplY3RWYWx1ZXMob2JqKSB7XG4gIHZhciB2YWx1ZXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIHZhbHVlcy5wdXNoKG9ialtrZXldKTtcbiAgfVxuICByZXR1cm4gdmFsdWVzO1xufVxuXG5mdW5jdGlvbiBleHRlbmQoKSB7XG4gIHZhciBwYXJhbXMgPSBvYmplY3RWYWx1ZXMoYXJndW1lbnRzKTtcbiAgcGFyYW1zLnVuc2hpZnQoe30pO1xuICByZXR1cm4gb2JqZWN0QXNzaWduLmdldCgpLmFwcGx5KHVuZGVmaW5lZCwgcGFyYW1zKTtcbn1cblxuZnVuY3Rpb24gbWVyZ2Uob2JqZWN0LCBrZXlzKSB7XG4gIHJldHVybiB7XG4gICAgYmFzZToga2V5cyA/IHBpY2sob2JqZWN0LCBrZXlzKSA6IG9iamVjdCxcbiAgICB3aXRoOiBmdW5jdGlvbihvYmplY3QyLCBrZXlzMikge1xuICAgICAgb2JqZWN0MiA9IGtleXMyID8gcGljayhvYmplY3QyLCBrZXlzMikgOiBvYmplY3QyO1xuICAgICAgcmV0dXJuIGV4dGVuZCh0aGlzLmJhc2UsIG9iamVjdDIpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gYmxhY2tsaXN0KG9iamVjdCwgYmxhY2tsaXN0ZWRLZXlzKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmplY3QpLnJlZHVjZShmdW5jdGlvbihwLCBrZXkpIHtcbiAgICBpZiAoYmxhY2tsaXN0ZWRLZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTEpIHtcbiAgICAgIHBba2V5XSA9IG9iamVjdFtrZXldO1xuICAgIH1cbiAgICByZXR1cm4gcDtcbiAgfSwge30pO1xufVxuXG5mdW5jdGlvbiBjYW1lbFRvU25ha2Uoc3RyKSB7XG4gIHZhciBuZXdLZXkgPSAnJztcbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGNvZGU7XG4gIHZhciB3YXNQcmV2TnVtYmVyID0gdHJ1ZTtcbiAgdmFyIHdhc1ByZXZVcHBlcmNhc2UgPSB0cnVlO1xuXG4gIHdoaWxlIChpbmRleCA8IHN0ci5sZW5ndGgpIHtcbiAgICBjb2RlID0gc3RyLmNoYXJDb2RlQXQoaW5kZXgpO1xuICAgIGlmIChcbiAgICAgICghd2FzUHJldlVwcGVyY2FzZSAmJiBjb2RlID49IDY1ICYmIGNvZGUgPD0gOTApIHx8XG4gICAgICAoIXdhc1ByZXZOdW1iZXIgJiYgY29kZSA+PSA0OCAmJiBjb2RlIDw9IDU3KVxuICAgICkge1xuICAgICAgbmV3S2V5ICs9ICdfJztcbiAgICAgIG5ld0tleSArPSBzdHJbaW5kZXhdLnRvTG93ZXJDYXNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5ld0tleSArPSBzdHJbaW5kZXhdLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuICAgIHdhc1ByZXZOdW1iZXIgPSBjb2RlID49IDQ4ICYmIGNvZGUgPD0gNTc7XG4gICAgd2FzUHJldlVwcGVyY2FzZSA9IGNvZGUgPj0gNjUgJiYgY29kZSA8PSA5MDtcbiAgICBpbmRleCsrO1xuICB9XG5cbiAgcmV0dXJuIG5ld0tleTtcbn1cblxuZnVuY3Rpb24gc25ha2VUb0NhbWVsKHN0cikge1xuICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoJ18nKTtcbiAgcmV0dXJuIHBhcnRzLnJlZHVjZShmdW5jdGlvbihwLCBjKSB7XG4gICAgcmV0dXJuIHAgKyBjLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgYy5zbGljZSgxKTtcbiAgfSwgcGFydHMuc2hpZnQoKSk7XG59XG5cbmZ1bmN0aW9uIHRvU25ha2VDYXNlKG9iamVjdCwgZXhjZXB0aW9ucykge1xuICBpZiAodHlwZW9mIG9iamVjdCAhPT0gJ29iamVjdCcgfHwgYXNzZXJ0LmlzQXJyYXkob2JqZWN0KSB8fCBvYmplY3QgPT09IG51bGwpIHtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG4gIGV4Y2VwdGlvbnMgPSBleGNlcHRpb25zIHx8IFtdO1xuXG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmplY3QpLnJlZHVjZShmdW5jdGlvbihwLCBrZXkpIHtcbiAgICB2YXIgbmV3S2V5ID0gZXhjZXB0aW9ucy5pbmRleE9mKGtleSkgPT09IC0xID8gY2FtZWxUb1NuYWtlKGtleSkgOiBrZXk7XG4gICAgcFtuZXdLZXldID0gdG9TbmFrZUNhc2Uob2JqZWN0W2tleV0pO1xuICAgIHJldHVybiBwO1xuICB9LCB7fSk7XG59XG5cbmZ1bmN0aW9uIHRvQ2FtZWxDYXNlKG9iamVjdCwgZXhjZXB0aW9ucywgb3B0aW9ucykge1xuICBpZiAodHlwZW9mIG9iamVjdCAhPT0gJ29iamVjdCcgfHwgYXNzZXJ0LmlzQXJyYXkob2JqZWN0KSB8fCBvYmplY3QgPT09IG51bGwpIHtcbiAgICByZXR1cm4gb2JqZWN0O1xuICB9XG5cbiAgZXhjZXB0aW9ucyA9IGV4Y2VwdGlvbnMgfHwgW107XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqZWN0KS5yZWR1Y2UoZnVuY3Rpb24ocCwga2V5KSB7XG4gICAgdmFyIG5ld0tleSA9IGV4Y2VwdGlvbnMuaW5kZXhPZihrZXkpID09PSAtMSA/IHNuYWtlVG9DYW1lbChrZXkpIDoga2V5O1xuXG4gICAgcFtuZXdLZXldID0gdG9DYW1lbENhc2Uob2JqZWN0W25ld0tleV0gfHwgb2JqZWN0W2tleV0sIFtdLCBvcHRpb25zKTtcblxuICAgIGlmIChvcHRpb25zLmtlZXBPcmlnaW5hbCkge1xuICAgICAgcFtrZXldID0gdG9DYW1lbENhc2Uob2JqZWN0W2tleV0sIFtdLCBvcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIHA7XG4gIH0sIHt9KTtcbn1cblxuZnVuY3Rpb24gZ2V0TG9jYXRpb25Gcm9tVXJsKGhyZWYpIHtcbiAgdmFyIG1hdGNoID0gaHJlZi5tYXRjaChcbiAgICAvXihodHRwcz86fGZpbGU6fGNocm9tZS1leHRlbnNpb246KVxcL1xcLygoW146Lz8jXSopKD86OihbMC05XSspKT8pKFsvXXswLDF9W14/I10qKShcXD9bXiNdKnwpKCMuKnwpJC9cbiAgKTtcbiAgcmV0dXJuIChcbiAgICBtYXRjaCAmJiB7XG4gICAgICBocmVmOiBocmVmLFxuICAgICAgcHJvdG9jb2w6IG1hdGNoWzFdLFxuICAgICAgaG9zdDogbWF0Y2hbMl0sXG4gICAgICBob3N0bmFtZTogbWF0Y2hbM10sXG4gICAgICBwb3J0OiBtYXRjaFs0XSxcbiAgICAgIHBhdGhuYW1lOiBtYXRjaFs1XSxcbiAgICAgIHNlYXJjaDogbWF0Y2hbNl0sXG4gICAgICBoYXNoOiBtYXRjaFs3XVxuICAgIH1cbiAgKTtcbn1cblxuZnVuY3Rpb24gZ2V0T3JpZ2luRnJvbVVybCh1cmwpIHtcbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIHZhciBwYXJzZWQgPSBnZXRMb2NhdGlvbkZyb21VcmwodXJsKTtcbiAgaWYgKCFwYXJzZWQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2YXIgb3JpZ2luID0gcGFyc2VkLnByb3RvY29sICsgJy8vJyArIHBhcnNlZC5ob3N0bmFtZTtcbiAgaWYgKHBhcnNlZC5wb3J0KSB7XG4gICAgb3JpZ2luICs9ICc6JyArIHBhcnNlZC5wb3J0O1xuICB9XG4gIHJldHVybiBvcmlnaW47XG59XG5cbmZ1bmN0aW9uIHRyaW0ob3B0aW9ucywga2V5KSB7XG4gIHZhciB0cmltbWVkID0gZXh0ZW5kKG9wdGlvbnMpO1xuICBpZiAob3B0aW9uc1trZXldKSB7XG4gICAgdHJpbW1lZFtrZXldID0gb3B0aW9uc1trZXldLnRyaW0oKTtcbiAgfVxuICByZXR1cm4gdHJpbW1lZDtcbn1cblxuZnVuY3Rpb24gdHJpbU11bHRpcGxlKG9wdGlvbnMsIGtleXMpIHtcbiAgcmV0dXJuIGtleXMucmVkdWNlKHRyaW0sIG9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiB0cmltVXNlckRldGFpbHMob3B0aW9ucykge1xuICByZXR1cm4gdHJpbU11bHRpcGxlKG9wdGlvbnMsIFsndXNlcm5hbWUnLCAnZW1haWwnLCAncGhvbmVOdW1iZXInXSk7XG59XG5cbi8qKlxuICogVXBkYXRlcyB0aGUgdmFsdWUgb2YgYSBwcm9wZXJ0eSBvbiB0aGUgZ2l2ZW4gb2JqZWN0LCB1c2luZyBhIGRlZXAgcGF0aCBzZWxlY3Rvci5cbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBzZXQgdGhlIHByb3BlcnR5IHZhbHVlIG9uXG4gKiBAcGFyYW0ge3N0cmluZ3xhcnJheX0gcGF0aCBUaGUgcGF0aCB0byB0aGUgcHJvcGVydHkgdGhhdCBzaG91bGQgaGF2ZSBpdHMgdmFsdWUgdXBkYXRlZC4gZS5nLiAncHJvcDEucHJvcDIucHJvcDMnIG9yIFsncHJvcDEnLCAncHJvcDInLCAncHJvcDMnXVxuICogQHBhcmFtIHthbnl9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXRcbiAqL1xuZnVuY3Rpb24gdXBkYXRlUHJvcGVydHlPbihvYmosIHBhdGgsIHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICBwYXRoID0gcGF0aC5zcGxpdCgnLicpO1xuICB9XG5cbiAgdmFyIG5leHQgPSBwYXRoWzBdO1xuXG4gIGlmIChvYmouaGFzT3duUHJvcGVydHkobmV4dCkpIHtcbiAgICBpZiAocGF0aC5sZW5ndGggPT09IDEpIHtcbiAgICAgIG9ialtuZXh0XSA9IHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB1cGRhdGVQcm9wZXJ0eU9uKG9ialtuZXh0XSwgcGF0aC5zbGljZSgxKSwgdmFsdWUpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRvU25ha2VDYXNlOiB0b1NuYWtlQ2FzZSxcbiAgdG9DYW1lbENhc2U6IHRvQ2FtZWxDYXNlLFxuICBibGFja2xpc3Q6IGJsYWNrbGlzdCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBwaWNrOiBwaWNrLFxuICBnZXRLZXlzTm90SW46IGdldEtleXNOb3RJbixcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIGdldE9yaWdpbkZyb21Vcmw6IGdldE9yaWdpbkZyb21VcmwsXG4gIGdldExvY2F0aW9uRnJvbVVybDogZ2V0TG9jYXRpb25Gcm9tVXJsLFxuICB0cmltVXNlckRldGFpbHM6IHRyaW1Vc2VyRGV0YWlscyxcbiAgdXBkYXRlUHJvcGVydHlPbjogdXBkYXRlUHJvcGVydHlPblxufTtcbiIsImltcG9ydCBvYmplY3RIZWxwZXIgZnJvbSAnLi9vYmplY3QnO1xuXG5mdW5jdGlvbiByZWRpcmVjdCh1cmwpIHtcbiAgZ2V0V2luZG93KCkubG9jYXRpb24gPSB1cmw7XG59XG5cbmZ1bmN0aW9uIGdldERvY3VtZW50KCkge1xuICByZXR1cm4gZ2V0V2luZG93KCkuZG9jdW1lbnQ7XG59XG5cbmZ1bmN0aW9uIGdldFdpbmRvdygpIHtcbiAgcmV0dXJuIHdpbmRvdztcbn1cblxuZnVuY3Rpb24gZ2V0T3JpZ2luKCkge1xuICB2YXIgbG9jYXRpb24gPSBnZXRXaW5kb3coKS5sb2NhdGlvbjtcbiAgdmFyIG9yaWdpbiA9IGxvY2F0aW9uLm9yaWdpbjtcblxuICBpZiAoIW9yaWdpbikge1xuICAgIG9yaWdpbiA9IG9iamVjdEhlbHBlci5nZXRPcmlnaW5Gcm9tVXJsKGxvY2F0aW9uLmhyZWYpO1xuICB9XG5cbiAgcmV0dXJuIG9yaWdpbjtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICByZWRpcmVjdDogcmVkaXJlY3QsXG4gIGdldERvY3VtZW50OiBnZXREb2N1bWVudCxcbiAgZ2V0V2luZG93OiBnZXRXaW5kb3csXG4gIGdldE9yaWdpbjogZ2V0T3JpZ2luXG59O1xuIiwiKGZ1bmN0aW9uIChuYW1lLCBjb250ZXh0LCBkZWZpbml0aW9uKSB7XG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgbW9kdWxlLmV4cG9ydHMgPSBkZWZpbml0aW9uKCk7XG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkgZGVmaW5lKGRlZmluaXRpb24pO1xuICBlbHNlIGNvbnRleHRbbmFtZV0gPSBkZWZpbml0aW9uKCk7XG59KSgndXJsam9pbicsIHRoaXMsIGZ1bmN0aW9uICgpIHtcblxuICBmdW5jdGlvbiBub3JtYWxpemUgKHN0ckFycmF5KSB7XG4gICAgdmFyIHJlc3VsdEFycmF5ID0gW107XG4gICAgaWYgKHN0ckFycmF5Lmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gJyc7IH1cblxuICAgIGlmICh0eXBlb2Ygc3RyQXJyYXlbMF0gIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVcmwgbXVzdCBiZSBhIHN0cmluZy4gUmVjZWl2ZWQgJyArIHN0ckFycmF5WzBdKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgZmlyc3QgcGFydCBpcyBhIHBsYWluIHByb3RvY29sLCB3ZSBjb21iaW5lIGl0IHdpdGggdGhlIG5leHQgcGFydC5cbiAgICBpZiAoc3RyQXJyYXlbMF0ubWF0Y2goL15bXi86XSs6XFwvKiQvKSAmJiBzdHJBcnJheS5sZW5ndGggPiAxKSB7XG4gICAgICB2YXIgZmlyc3QgPSBzdHJBcnJheS5zaGlmdCgpO1xuICAgICAgc3RyQXJyYXlbMF0gPSBmaXJzdCArIHN0ckFycmF5WzBdO1xuICAgIH1cblxuICAgIC8vIFRoZXJlIG11c3QgYmUgdHdvIG9yIHRocmVlIHNsYXNoZXMgaW4gdGhlIGZpbGUgcHJvdG9jb2wsIHR3byBzbGFzaGVzIGluIGFueXRoaW5nIGVsc2UuXG4gICAgaWYgKHN0ckFycmF5WzBdLm1hdGNoKC9eZmlsZTpcXC9cXC9cXC8vKSkge1xuICAgICAgc3RyQXJyYXlbMF0gPSBzdHJBcnJheVswXS5yZXBsYWNlKC9eKFteLzpdKyk6XFwvKi8sICckMTovLy8nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyQXJyYXlbMF0gPSBzdHJBcnJheVswXS5yZXBsYWNlKC9eKFteLzpdKyk6XFwvKi8sICckMTovLycpO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjb21wb25lbnQgPSBzdHJBcnJheVtpXTtcblxuICAgICAgaWYgKHR5cGVvZiBjb21wb25lbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1VybCBtdXN0IGJlIGEgc3RyaW5nLiBSZWNlaXZlZCAnICsgY29tcG9uZW50KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNvbXBvbmVudCA9PT0gJycpIHsgY29udGludWU7IH1cblxuICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgIC8vIFJlbW92aW5nIHRoZSBzdGFydGluZyBzbGFzaGVzIGZvciBlYWNoIGNvbXBvbmVudCBidXQgdGhlIGZpcnN0LlxuICAgICAgICBjb21wb25lbnQgPSBjb21wb25lbnQucmVwbGFjZSgvXltcXC9dKy8sICcnKTtcbiAgICAgIH1cbiAgICAgIGlmIChpIDwgc3RyQXJyYXkubGVuZ3RoIC0gMSkge1xuICAgICAgICAvLyBSZW1vdmluZyB0aGUgZW5kaW5nIHNsYXNoZXMgZm9yIGVhY2ggY29tcG9uZW50IGJ1dCB0aGUgbGFzdC5cbiAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50LnJlcGxhY2UoL1tcXC9dKyQvLCAnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGb3IgdGhlIGxhc3QgY29tcG9uZW50IHdlIHdpbGwgY29tYmluZSBtdWx0aXBsZSBzbGFzaGVzIHRvIGEgc2luZ2xlIG9uZS5cbiAgICAgICAgY29tcG9uZW50ID0gY29tcG9uZW50LnJlcGxhY2UoL1tcXC9dKyQvLCAnLycpO1xuICAgICAgfVxuXG4gICAgICByZXN1bHRBcnJheS5wdXNoKGNvbXBvbmVudCk7XG5cbiAgICB9XG5cbiAgICB2YXIgc3RyID0gcmVzdWx0QXJyYXkuam9pbignLycpO1xuICAgIC8vIEVhY2ggaW5wdXQgY29tcG9uZW50IGlzIG5vdyBzZXBhcmF0ZWQgYnkgYSBzaW5nbGUgc2xhc2ggZXhjZXB0IHRoZSBwb3NzaWJsZSBmaXJzdCBwbGFpbiBwcm90b2NvbCBwYXJ0LlxuXG4gICAgLy8gcmVtb3ZlIHRyYWlsaW5nIHNsYXNoIGJlZm9yZSBwYXJhbWV0ZXJzIG9yIGhhc2hcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvXFwvKFxcP3wmfCNbXiFdKS9nLCAnJDEnKTtcblxuICAgIC8vIHJlcGxhY2UgPyBpbiBwYXJhbWV0ZXJzIHdpdGggJlxuICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgnPycpO1xuICAgIHN0ciA9IHBhcnRzLnNoaWZ0KCkgKyAocGFydHMubGVuZ3RoID4gMCA/ICc/JzogJycpICsgcGFydHMuam9pbignJicpO1xuXG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGlucHV0O1xuXG4gICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKSB7XG4gICAgICBpbnB1dCA9IGFyZ3VtZW50c1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5wdXQgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vcm1hbGl6ZShpbnB1dCk7XG4gIH07XG5cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxudmFyIGhleFRhYmxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJyYXkgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gICAgICAgIGFycmF5LnB1c2goJyUnICsgKChpIDwgMTYgPyAnMCcgOiAnJykgKyBpLnRvU3RyaW5nKDE2KSkudG9VcHBlckNhc2UoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5O1xufSgpKTtcblxudmFyIGNvbXBhY3RRdWV1ZSA9IGZ1bmN0aW9uIGNvbXBhY3RRdWV1ZShxdWV1ZSkge1xuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAxKSB7XG4gICAgICAgIHZhciBpdGVtID0gcXVldWUucG9wKCk7XG4gICAgICAgIHZhciBvYmogPSBpdGVtLm9ialtpdGVtLnByb3BdO1xuXG4gICAgICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIHZhciBjb21wYWN0ZWQgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBvYmoubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9ialtqXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGFjdGVkLnB1c2gob2JqW2pdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZW0ub2JqW2l0ZW0ucHJvcF0gPSBjb21wYWN0ZWQ7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgYXJyYXlUb09iamVjdCA9IGZ1bmN0aW9uIGFycmF5VG9PYmplY3Qoc291cmNlLCBvcHRpb25zKSB7XG4gICAgdmFyIG9iaiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2UubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VbaV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBvYmpbaV0gPSBzb3VyY2VbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxudmFyIG1lcmdlID0gZnVuY3Rpb24gbWVyZ2UodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpIHtcbiAgICAvKiBlc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246IDAgKi9cbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygc291cmNlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAoaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgICAgICAgICB0YXJnZXQucHVzaChzb3VyY2UpO1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldCAmJiB0eXBlb2YgdGFyZ2V0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgaWYgKChvcHRpb25zICYmIChvcHRpb25zLnBsYWluT2JqZWN0cyB8fCBvcHRpb25zLmFsbG93UHJvdG90eXBlcykpIHx8ICFoYXMuY2FsbChPYmplY3QucHJvdG90eXBlLCBzb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W3NvdXJjZV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFt0YXJnZXQsIHNvdXJjZV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGlmICghdGFyZ2V0IHx8IHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBbdGFyZ2V0XS5jb25jYXQoc291cmNlKTtcbiAgICB9XG5cbiAgICB2YXIgbWVyZ2VUYXJnZXQgPSB0YXJnZXQ7XG4gICAgaWYgKGlzQXJyYXkodGFyZ2V0KSAmJiAhaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICAgIG1lcmdlVGFyZ2V0ID0gYXJyYXlUb09iamVjdCh0YXJnZXQsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmIChpc0FycmF5KHRhcmdldCkgJiYgaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICAgIHNvdXJjZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpKSB7XG4gICAgICAgICAgICBpZiAoaGFzLmNhbGwodGFyZ2V0LCBpKSkge1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXRJdGVtID0gdGFyZ2V0W2ldO1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRJdGVtICYmIHR5cGVvZiB0YXJnZXRJdGVtID09PSAnb2JqZWN0JyAmJiBpdGVtICYmIHR5cGVvZiBpdGVtID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRbaV0gPSBtZXJnZSh0YXJnZXRJdGVtLCBpdGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldFtpXSA9IGl0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3Qua2V5cyhzb3VyY2UpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gc291cmNlW2tleV07XG5cbiAgICAgICAgaWYgKGhhcy5jYWxsKGFjYywga2V5KSkge1xuICAgICAgICAgICAgYWNjW2tleV0gPSBtZXJnZShhY2Nba2V5XSwgdmFsdWUsIG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWNjW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIG1lcmdlVGFyZ2V0KTtcbn07XG5cbnZhciBhc3NpZ24gPSBmdW5jdGlvbiBhc3NpZ25TaW5nbGVTb3VyY2UodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgIGFjY1trZXldID0gc291cmNlW2tleV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgdGFyZ2V0KTtcbn07XG5cbnZhciBkZWNvZGUgPSBmdW5jdGlvbiAoc3RyLCBkZWNvZGVyLCBjaGFyc2V0KSB7XG4gICAgdmFyIHN0cldpdGhvdXRQbHVzID0gc3RyLnJlcGxhY2UoL1xcKy9nLCAnICcpO1xuICAgIGlmIChjaGFyc2V0ID09PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgLy8gdW5lc2NhcGUgbmV2ZXIgdGhyb3dzLCBubyB0cnkuLi5jYXRjaCBuZWVkZWQ6XG4gICAgICAgIHJldHVybiBzdHJXaXRob3V0UGx1cy5yZXBsYWNlKC8lWzAtOWEtZl17Mn0vZ2ksIHVuZXNjYXBlKTtcbiAgICB9XG4gICAgLy8gdXRmLThcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0cldpdGhvdXRQbHVzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBzdHJXaXRob3V0UGx1cztcbiAgICB9XG59O1xuXG52YXIgZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKHN0ciwgZGVmYXVsdEVuY29kZXIsIGNoYXJzZXQpIHtcbiAgICAvLyBUaGlzIGNvZGUgd2FzIG9yaWdpbmFsbHkgd3JpdHRlbiBieSBCcmlhbiBXaGl0ZSAobXNjZGV4KSBmb3IgdGhlIGlvLmpzIGNvcmUgcXVlcnlzdHJpbmcgbGlicmFyeS5cbiAgICAvLyBJdCBoYXMgYmVlbiBhZGFwdGVkIGhlcmUgZm9yIHN0cmljdGVyIGFkaGVyZW5jZSB0byBSRkMgMzk4NlxuICAgIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgdmFyIHN0cmluZyA9IHN0cjtcbiAgICBpZiAodHlwZW9mIHN0ciA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgICAgc3RyaW5nID0gU3ltYm9sLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN0cik7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgICAgICBzdHJpbmcgPSBTdHJpbmcoc3RyKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgIHJldHVybiBlc2NhcGUoc3RyaW5nKS5yZXBsYWNlKC8ldVswLTlhLWZdezR9L2dpLCBmdW5jdGlvbiAoJDApIHtcbiAgICAgICAgICAgIHJldHVybiAnJTI2JTIzJyArIHBhcnNlSW50KCQwLnNsaWNlKDIpLCAxNikgKyAnJTNCJztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIG91dCA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBjID0gc3RyaW5nLmNoYXJDb2RlQXQoaSk7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgYyA9PT0gMHgyRCAvLyAtXG4gICAgICAgICAgICB8fCBjID09PSAweDJFIC8vIC5cbiAgICAgICAgICAgIHx8IGMgPT09IDB4NUYgLy8gX1xuICAgICAgICAgICAgfHwgYyA9PT0gMHg3RSAvLyB+XG4gICAgICAgICAgICB8fCAoYyA+PSAweDMwICYmIGMgPD0gMHgzOSkgLy8gMC05XG4gICAgICAgICAgICB8fCAoYyA+PSAweDQxICYmIGMgPD0gMHg1QSkgLy8gYS16XG4gICAgICAgICAgICB8fCAoYyA+PSAweDYxICYmIGMgPD0gMHg3QSkgLy8gQS1aXG4gICAgICAgICkge1xuICAgICAgICAgICAgb3V0ICs9IHN0cmluZy5jaGFyQXQoaSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHg4MCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgaGV4VGFibGVbY107XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHg4MDApIHtcbiAgICAgICAgICAgIG91dCA9IG91dCArIChoZXhUYWJsZVsweEMwIHwgKGMgPj4gNildICsgaGV4VGFibGVbMHg4MCB8IChjICYgMHgzRildKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweEQ4MDAgfHwgYyA+PSAweEUwMDApIHtcbiAgICAgICAgICAgIG91dCA9IG91dCArIChoZXhUYWJsZVsweEUwIHwgKGMgPj4gMTIpXSArIGhleFRhYmxlWzB4ODAgfCAoKGMgPj4gNikgJiAweDNGKV0gKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNGKV0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpICs9IDE7XG4gICAgICAgIGMgPSAweDEwMDAwICsgKCgoYyAmIDB4M0ZGKSA8PCAxMCkgfCAoc3RyaW5nLmNoYXJDb2RlQXQoaSkgJiAweDNGRikpO1xuICAgICAgICBvdXQgKz0gaGV4VGFibGVbMHhGMCB8IChjID4+IDE4KV1cbiAgICAgICAgICAgICsgaGV4VGFibGVbMHg4MCB8ICgoYyA+PiAxMikgJiAweDNGKV1cbiAgICAgICAgICAgICsgaGV4VGFibGVbMHg4MCB8ICgoYyA+PiA2KSAmIDB4M0YpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNGKV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbnZhciBjb21wYWN0ID0gZnVuY3Rpb24gY29tcGFjdCh2YWx1ZSkge1xuICAgIHZhciBxdWV1ZSA9IFt7IG9iajogeyBvOiB2YWx1ZSB9LCBwcm9wOiAnbycgfV07XG4gICAgdmFyIHJlZnMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBxdWV1ZVtpXTtcbiAgICAgICAgdmFyIG9iaiA9IGl0ZW0ub2JqW2l0ZW0ucHJvcF07XG5cbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGtleXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2pdO1xuICAgICAgICAgICAgdmFyIHZhbCA9IG9ialtrZXldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbCAhPT0gbnVsbCAmJiByZWZzLmluZGV4T2YodmFsKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKHsgb2JqOiBvYmosIHByb3A6IGtleSB9KTtcbiAgICAgICAgICAgICAgICByZWZzLnB1c2godmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBhY3RRdWV1ZShxdWV1ZSk7XG5cbiAgICByZXR1cm4gdmFsdWU7XG59O1xuXG52YXIgaXNSZWdFeHAgPSBmdW5jdGlvbiBpc1JlZ0V4cChvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufTtcblxudmFyIGlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIob2JqKSB7XG4gICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAhIShvYmouY29uc3RydWN0b3IgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopKTtcbn07XG5cbnZhciBjb21iaW5lID0gZnVuY3Rpb24gY29tYmluZShhLCBiKSB7XG4gICAgcmV0dXJuIFtdLmNvbmNhdChhLCBiKTtcbn07XG5cbnZhciBtYXliZU1hcCA9IGZ1bmN0aW9uIG1heWJlTWFwKHZhbCwgZm4pIHtcbiAgICBpZiAoaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIHZhciBtYXBwZWQgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIG1hcHBlZC5wdXNoKGZuKHZhbFtpXSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXBwZWQ7XG4gICAgfVxuICAgIHJldHVybiBmbih2YWwpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXJyYXlUb09iamVjdDogYXJyYXlUb09iamVjdCxcbiAgICBhc3NpZ246IGFzc2lnbixcbiAgICBjb21iaW5lOiBjb21iaW5lLFxuICAgIGNvbXBhY3Q6IGNvbXBhY3QsXG4gICAgZGVjb2RlOiBkZWNvZGUsXG4gICAgZW5jb2RlOiBlbmNvZGUsXG4gICAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICAgIGlzUmVnRXhwOiBpc1JlZ0V4cCxcbiAgICBtYXliZU1hcDogbWF5YmVNYXAsXG4gICAgbWVyZ2U6IG1lcmdlXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVwbGFjZSA9IFN0cmluZy5wcm90b3R5cGUucmVwbGFjZTtcbnZhciBwZXJjZW50VHdlbnRpZXMgPSAvJTIwL2c7XG5cbnZhciB1dGlsID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgRm9ybWF0ID0ge1xuICAgIFJGQzE3Mzg6ICdSRkMxNzM4JyxcbiAgICBSRkMzOTg2OiAnUkZDMzk4Nidcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbC5hc3NpZ24oXG4gICAge1xuICAgICAgICAnZGVmYXVsdCc6IEZvcm1hdC5SRkMzOTg2LFxuICAgICAgICBmb3JtYXR0ZXJzOiB7XG4gICAgICAgICAgICBSRkMxNzM4OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVwbGFjZS5jYWxsKHZhbHVlLCBwZXJjZW50VHdlbnRpZXMsICcrJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgUkZDMzk4NjogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIEZvcm1hdFxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgYXJyYXlQcmVmaXhHZW5lcmF0b3JzID0ge1xuICAgIGJyYWNrZXRzOiBmdW5jdGlvbiBicmFja2V0cyhwcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIHByZWZpeCArICdbXSc7XG4gICAgfSxcbiAgICBjb21tYTogJ2NvbW1hJyxcbiAgICBpbmRpY2VzOiBmdW5jdGlvbiBpbmRpY2VzKHByZWZpeCwga2V5KSB7XG4gICAgICAgIHJldHVybiBwcmVmaXggKyAnWycgKyBrZXkgKyAnXSc7XG4gICAgfSxcbiAgICByZXBlYXQ6IGZ1bmN0aW9uIHJlcGVhdChwcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIHByZWZpeDtcbiAgICB9XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG52YXIgcHVzaCA9IEFycmF5LnByb3RvdHlwZS5wdXNoO1xudmFyIHB1c2hUb0FycmF5ID0gZnVuY3Rpb24gKGFyciwgdmFsdWVPckFycmF5KSB7XG4gICAgcHVzaC5hcHBseShhcnIsIGlzQXJyYXkodmFsdWVPckFycmF5KSA/IHZhbHVlT3JBcnJheSA6IFt2YWx1ZU9yQXJyYXldKTtcbn07XG5cbnZhciB0b0lTTyA9IERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nO1xuXG52YXIgZGVmYXVsdEZvcm1hdCA9IGZvcm1hdHNbJ2RlZmF1bHQnXTtcbnZhciBkZWZhdWx0cyA9IHtcbiAgICBhZGRRdWVyeVByZWZpeDogZmFsc2UsXG4gICAgYWxsb3dEb3RzOiBmYWxzZSxcbiAgICBjaGFyc2V0OiAndXRmLTgnLFxuICAgIGNoYXJzZXRTZW50aW5lbDogZmFsc2UsXG4gICAgZGVsaW1pdGVyOiAnJicsXG4gICAgZW5jb2RlOiB0cnVlLFxuICAgIGVuY29kZXI6IHV0aWxzLmVuY29kZSxcbiAgICBlbmNvZGVWYWx1ZXNPbmx5OiBmYWxzZSxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgZm9ybWF0dGVyOiBmb3JtYXRzLmZvcm1hdHRlcnNbZGVmYXVsdEZvcm1hdF0sXG4gICAgLy8gZGVwcmVjYXRlZFxuICAgIGluZGljZXM6IGZhbHNlLFxuICAgIHNlcmlhbGl6ZURhdGU6IGZ1bmN0aW9uIHNlcmlhbGl6ZURhdGUoZGF0ZSkge1xuICAgICAgICByZXR1cm4gdG9JU08uY2FsbChkYXRlKTtcbiAgICB9LFxuICAgIHNraXBOdWxsczogZmFsc2UsXG4gICAgc3RyaWN0TnVsbEhhbmRsaW5nOiBmYWxzZVxufTtcblxudmFyIGlzTm9uTnVsbGlzaFByaW1pdGl2ZSA9IGZ1bmN0aW9uIGlzTm9uTnVsbGlzaFByaW1pdGl2ZSh2KSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2ID09PSAnc3RyaW5nJ1xuICAgICAgICB8fCB0eXBlb2YgdiA9PT0gJ251bWJlcidcbiAgICAgICAgfHwgdHlwZW9mIHYgPT09ICdib29sZWFuJ1xuICAgICAgICB8fCB0eXBlb2YgdiA9PT0gJ3N5bWJvbCdcbiAgICAgICAgfHwgdHlwZW9mIHYgPT09ICdiaWdpbnQnO1xufTtcblxudmFyIHN0cmluZ2lmeSA9IGZ1bmN0aW9uIHN0cmluZ2lmeShcbiAgICBvYmplY3QsXG4gICAgcHJlZml4LFxuICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgIHNraXBOdWxscyxcbiAgICBlbmNvZGVyLFxuICAgIGZpbHRlcixcbiAgICBzb3J0LFxuICAgIGFsbG93RG90cyxcbiAgICBzZXJpYWxpemVEYXRlLFxuICAgIGZvcm1hdHRlcixcbiAgICBlbmNvZGVWYWx1ZXNPbmx5LFxuICAgIGNoYXJzZXRcbikge1xuICAgIHZhciBvYmogPSBvYmplY3Q7XG4gICAgaWYgKHR5cGVvZiBmaWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgb2JqID0gZmlsdGVyKHByZWZpeCwgb2JqKTtcbiAgICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgb2JqID0gc2VyaWFsaXplRGF0ZShvYmopO1xuICAgIH0gZWxzZSBpZiAoZ2VuZXJhdGVBcnJheVByZWZpeCA9PT0gJ2NvbW1hJyAmJiBpc0FycmF5KG9iaikpIHtcbiAgICAgICAgb2JqID0gdXRpbHMubWF5YmVNYXAob2JqLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VyaWFsaXplRGF0ZSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0pLmpvaW4oJywnKTtcbiAgICB9XG5cbiAgICBpZiAob2JqID09PSBudWxsKSB7XG4gICAgICAgIGlmIChzdHJpY3ROdWxsSGFuZGxpbmcpIHtcbiAgICAgICAgICAgIHJldHVybiBlbmNvZGVyICYmICFlbmNvZGVWYWx1ZXNPbmx5ID8gZW5jb2RlcihwcmVmaXgsIGRlZmF1bHRzLmVuY29kZXIsIGNoYXJzZXQsICdrZXknKSA6IHByZWZpeDtcbiAgICAgICAgfVxuXG4gICAgICAgIG9iaiA9ICcnO1xuICAgIH1cblxuICAgIGlmIChpc05vbk51bGxpc2hQcmltaXRpdmUob2JqKSB8fCB1dGlscy5pc0J1ZmZlcihvYmopKSB7XG4gICAgICAgIGlmIChlbmNvZGVyKSB7XG4gICAgICAgICAgICB2YXIga2V5VmFsdWUgPSBlbmNvZGVWYWx1ZXNPbmx5ID8gcHJlZml4IDogZW5jb2RlcihwcmVmaXgsIGRlZmF1bHRzLmVuY29kZXIsIGNoYXJzZXQsICdrZXknKTtcbiAgICAgICAgICAgIHJldHVybiBbZm9ybWF0dGVyKGtleVZhbHVlKSArICc9JyArIGZvcm1hdHRlcihlbmNvZGVyKG9iaiwgZGVmYXVsdHMuZW5jb2RlciwgY2hhcnNldCwgJ3ZhbHVlJykpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2Zvcm1hdHRlcihwcmVmaXgpICsgJz0nICsgZm9ybWF0dGVyKFN0cmluZyhvYmopKV07XG4gICAgfVxuXG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuXG4gICAgdmFyIG9iaktleXM7XG4gICAgaWYgKGlzQXJyYXkoZmlsdGVyKSkge1xuICAgICAgICBvYmpLZXlzID0gZmlsdGVyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgICAgb2JqS2V5cyA9IHNvcnQgPyBrZXlzLnNvcnQoc29ydCkgOiBrZXlzO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqS2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0gb2JqS2V5c1tpXTtcbiAgICAgICAgdmFyIHZhbHVlID0gb2JqW2tleV07XG5cbiAgICAgICAgaWYgKHNraXBOdWxscyAmJiB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIga2V5UHJlZml4ID0gaXNBcnJheShvYmopXG4gICAgICAgICAgICA/IHR5cGVvZiBnZW5lcmF0ZUFycmF5UHJlZml4ID09PSAnZnVuY3Rpb24nID8gZ2VuZXJhdGVBcnJheVByZWZpeChwcmVmaXgsIGtleSkgOiBwcmVmaXhcbiAgICAgICAgICAgIDogcHJlZml4ICsgKGFsbG93RG90cyA/ICcuJyArIGtleSA6ICdbJyArIGtleSArICddJyk7XG5cbiAgICAgICAgcHVzaFRvQXJyYXkodmFsdWVzLCBzdHJpbmdpZnkoXG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgIGtleVByZWZpeCxcbiAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICBza2lwTnVsbHMsXG4gICAgICAgICAgICBlbmNvZGVyLFxuICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgc29ydCxcbiAgICAgICAgICAgIGFsbG93RG90cyxcbiAgICAgICAgICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICBmb3JtYXR0ZXIsXG4gICAgICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5LFxuICAgICAgICAgICAgY2hhcnNldFxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzO1xufTtcblxudmFyIG5vcm1hbGl6ZVN0cmluZ2lmeU9wdGlvbnMgPSBmdW5jdGlvbiBub3JtYWxpemVTdHJpbmdpZnlPcHRpb25zKG9wdHMpIHtcbiAgICBpZiAoIW9wdHMpIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRzO1xuICAgIH1cblxuICAgIGlmIChvcHRzLmVuY29kZXIgIT09IG51bGwgJiYgb3B0cy5lbmNvZGVyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9wdHMuZW5jb2RlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFbmNvZGVyIGhhcyB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIHZhciBjaGFyc2V0ID0gb3B0cy5jaGFyc2V0IHx8IGRlZmF1bHRzLmNoYXJzZXQ7XG4gICAgaWYgKHR5cGVvZiBvcHRzLmNoYXJzZXQgIT09ICd1bmRlZmluZWQnICYmIG9wdHMuY2hhcnNldCAhPT0gJ3V0Zi04JyAmJiBvcHRzLmNoYXJzZXQgIT09ICdpc28tODg1OS0xJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgY2hhcnNldCBvcHRpb24gbXVzdCBiZSBlaXRoZXIgdXRmLTgsIGlzby04ODU5LTEsIG9yIHVuZGVmaW5lZCcpO1xuICAgIH1cblxuICAgIHZhciBmb3JtYXQgPSBmb3JtYXRzWydkZWZhdWx0J107XG4gICAgaWYgKHR5cGVvZiBvcHRzLmZvcm1hdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKCFoYXMuY2FsbChmb3JtYXRzLmZvcm1hdHRlcnMsIG9wdHMuZm9ybWF0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBmb3JtYXQgb3B0aW9uIHByb3ZpZGVkLicpO1xuICAgICAgICB9XG4gICAgICAgIGZvcm1hdCA9IG9wdHMuZm9ybWF0O1xuICAgIH1cbiAgICB2YXIgZm9ybWF0dGVyID0gZm9ybWF0cy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG5cbiAgICB2YXIgZmlsdGVyID0gZGVmYXVsdHMuZmlsdGVyO1xuICAgIGlmICh0eXBlb2Ygb3B0cy5maWx0ZXIgPT09ICdmdW5jdGlvbicgfHwgaXNBcnJheShvcHRzLmZpbHRlcikpIHtcbiAgICAgICAgZmlsdGVyID0gb3B0cy5maWx0ZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkUXVlcnlQcmVmaXg6IHR5cGVvZiBvcHRzLmFkZFF1ZXJ5UHJlZml4ID09PSAnYm9vbGVhbicgPyBvcHRzLmFkZFF1ZXJ5UHJlZml4IDogZGVmYXVsdHMuYWRkUXVlcnlQcmVmaXgsXG4gICAgICAgIGFsbG93RG90czogdHlwZW9mIG9wdHMuYWxsb3dEb3RzID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmFsbG93RG90cyA6ICEhb3B0cy5hbGxvd0RvdHMsXG4gICAgICAgIGNoYXJzZXQ6IGNoYXJzZXQsXG4gICAgICAgIGNoYXJzZXRTZW50aW5lbDogdHlwZW9mIG9wdHMuY2hhcnNldFNlbnRpbmVsID09PSAnYm9vbGVhbicgPyBvcHRzLmNoYXJzZXRTZW50aW5lbCA6IGRlZmF1bHRzLmNoYXJzZXRTZW50aW5lbCxcbiAgICAgICAgZGVsaW1pdGVyOiB0eXBlb2Ygb3B0cy5kZWxpbWl0ZXIgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuZGVsaW1pdGVyIDogb3B0cy5kZWxpbWl0ZXIsXG4gICAgICAgIGVuY29kZTogdHlwZW9mIG9wdHMuZW5jb2RlID09PSAnYm9vbGVhbicgPyBvcHRzLmVuY29kZSA6IGRlZmF1bHRzLmVuY29kZSxcbiAgICAgICAgZW5jb2RlcjogdHlwZW9mIG9wdHMuZW5jb2RlciA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuZW5jb2RlciA6IGRlZmF1bHRzLmVuY29kZXIsXG4gICAgICAgIGVuY29kZVZhbHVlc09ubHk6IHR5cGVvZiBvcHRzLmVuY29kZVZhbHVlc09ubHkgPT09ICdib29sZWFuJyA/IG9wdHMuZW5jb2RlVmFsdWVzT25seSA6IGRlZmF1bHRzLmVuY29kZVZhbHVlc09ubHksXG4gICAgICAgIGZpbHRlcjogZmlsdGVyLFxuICAgICAgICBmb3JtYXR0ZXI6IGZvcm1hdHRlcixcbiAgICAgICAgc2VyaWFsaXplRGF0ZTogdHlwZW9mIG9wdHMuc2VyaWFsaXplRGF0ZSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuc2VyaWFsaXplRGF0ZSA6IGRlZmF1bHRzLnNlcmlhbGl6ZURhdGUsXG4gICAgICAgIHNraXBOdWxsczogdHlwZW9mIG9wdHMuc2tpcE51bGxzID09PSAnYm9vbGVhbicgPyBvcHRzLnNraXBOdWxscyA6IGRlZmF1bHRzLnNraXBOdWxscyxcbiAgICAgICAgc29ydDogdHlwZW9mIG9wdHMuc29ydCA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuc29ydCA6IG51bGwsXG4gICAgICAgIHN0cmljdE51bGxIYW5kbGluZzogdHlwZW9mIG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nID09PSAnYm9vbGVhbicgPyBvcHRzLnN0cmljdE51bGxIYW5kbGluZyA6IGRlZmF1bHRzLnN0cmljdE51bGxIYW5kbGluZ1xuICAgIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG9wdHMpIHtcbiAgICB2YXIgb2JqID0gb2JqZWN0O1xuICAgIHZhciBvcHRpb25zID0gbm9ybWFsaXplU3RyaW5naWZ5T3B0aW9ucyhvcHRzKTtcblxuICAgIHZhciBvYmpLZXlzO1xuICAgIHZhciBmaWx0ZXI7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgICAgICBvYmogPSBmaWx0ZXIoJycsIG9iaik7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KG9wdGlvbnMuZmlsdGVyKSkge1xuICAgICAgICBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICAgICAgb2JqS2V5cyA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgdmFyIGFycmF5Rm9ybWF0O1xuICAgIGlmIChvcHRzICYmIG9wdHMuYXJyYXlGb3JtYXQgaW4gYXJyYXlQcmVmaXhHZW5lcmF0b3JzKSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gb3B0cy5hcnJheUZvcm1hdDtcbiAgICB9IGVsc2UgaWYgKG9wdHMgJiYgJ2luZGljZXMnIGluIG9wdHMpIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSBvcHRzLmluZGljZXMgPyAnaW5kaWNlcycgOiAncmVwZWF0JztcbiAgICB9IGVsc2Uge1xuICAgICAgICBhcnJheUZvcm1hdCA9ICdpbmRpY2VzJztcbiAgICB9XG5cbiAgICB2YXIgZ2VuZXJhdGVBcnJheVByZWZpeCA9IGFycmF5UHJlZml4R2VuZXJhdG9yc1thcnJheUZvcm1hdF07XG5cbiAgICBpZiAoIW9iaktleXMpIHtcbiAgICAgICAgb2JqS2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuc29ydCkge1xuICAgICAgICBvYmpLZXlzLnNvcnQob3B0aW9ucy5zb3J0KTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iaktleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IG9iaktleXNbaV07XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuc2tpcE51bGxzICYmIG9ialtrZXldID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBwdXNoVG9BcnJheShrZXlzLCBzdHJpbmdpZnkoXG4gICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgIG9wdGlvbnMuc2tpcE51bGxzLFxuICAgICAgICAgICAgb3B0aW9ucy5lbmNvZGUgPyBvcHRpb25zLmVuY29kZXIgOiBudWxsLFxuICAgICAgICAgICAgb3B0aW9ucy5maWx0ZXIsXG4gICAgICAgICAgICBvcHRpb25zLnNvcnQsXG4gICAgICAgICAgICBvcHRpb25zLmFsbG93RG90cyxcbiAgICAgICAgICAgIG9wdGlvbnMuc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgICAgIG9wdGlvbnMuZm9ybWF0dGVyLFxuICAgICAgICAgICAgb3B0aW9ucy5lbmNvZGVWYWx1ZXNPbmx5LFxuICAgICAgICAgICAgb3B0aW9ucy5jaGFyc2V0XG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHZhciBqb2luZWQgPSBrZXlzLmpvaW4ob3B0aW9ucy5kZWxpbWl0ZXIpO1xuICAgIHZhciBwcmVmaXggPSBvcHRpb25zLmFkZFF1ZXJ5UHJlZml4ID09PSB0cnVlID8gJz8nIDogJyc7XG5cbiAgICBpZiAob3B0aW9ucy5jaGFyc2V0U2VudGluZWwpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgICAgICAvLyBlbmNvZGVVUklDb21wb25lbnQoJyYjMTAwMDM7JyksIHRoZSBcIm51bWVyaWMgZW50aXR5XCIgcmVwcmVzZW50YXRpb24gb2YgYSBjaGVja21hcmtcbiAgICAgICAgICAgIHByZWZpeCArPSAndXRmOD0lMjYlMjMxMDAwMyUzQiYnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZW5jb2RlVVJJQ29tcG9uZW50KCfinJMnKVxuICAgICAgICAgICAgcHJlZml4ICs9ICd1dGY4PSVFMiU5QyU5MyYnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpvaW5lZC5sZW5ndGggPiAwID8gcHJlZml4ICsgam9pbmVkIDogJyc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG52YXIgZGVmYXVsdHMgPSB7XG4gICAgYWxsb3dEb3RzOiBmYWxzZSxcbiAgICBhbGxvd1Byb3RvdHlwZXM6IGZhbHNlLFxuICAgIGFycmF5TGltaXQ6IDIwLFxuICAgIGNoYXJzZXQ6ICd1dGYtOCcsXG4gICAgY2hhcnNldFNlbnRpbmVsOiBmYWxzZSxcbiAgICBjb21tYTogZmFsc2UsXG4gICAgZGVjb2RlcjogdXRpbHMuZGVjb2RlLFxuICAgIGRlbGltaXRlcjogJyYnLFxuICAgIGRlcHRoOiA1LFxuICAgIGlnbm9yZVF1ZXJ5UHJlZml4OiBmYWxzZSxcbiAgICBpbnRlcnByZXROdW1lcmljRW50aXRpZXM6IGZhbHNlLFxuICAgIHBhcmFtZXRlckxpbWl0OiAxMDAwLFxuICAgIHBhcnNlQXJyYXlzOiB0cnVlLFxuICAgIHBsYWluT2JqZWN0czogZmFsc2UsXG4gICAgc3RyaWN0TnVsbEhhbmRsaW5nOiBmYWxzZVxufTtcblxudmFyIGludGVycHJldE51bWVyaWNFbnRpdGllcyA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoLyYjKFxcZCspOy9nLCBmdW5jdGlvbiAoJDAsIG51bWJlclN0cikge1xuICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChudW1iZXJTdHIsIDEwKSk7XG4gICAgfSk7XG59O1xuXG52YXIgcGFyc2VBcnJheVZhbHVlID0gZnVuY3Rpb24gKHZhbCwgb3B0aW9ucykge1xuICAgIGlmICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgJiYgb3B0aW9ucy5jb21tYSAmJiB2YWwuaW5kZXhPZignLCcpID4gLTEpIHtcbiAgICAgICAgcmV0dXJuIHZhbC5zcGxpdCgnLCcpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWw7XG59O1xuXG4vLyBUaGlzIGlzIHdoYXQgYnJvd3NlcnMgd2lsbCBzdWJtaXQgd2hlbiB0aGUg4pyTIGNoYXJhY3RlciBvY2N1cnMgaW4gYW5cbi8vIGFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCBib2R5IGFuZCB0aGUgZW5jb2Rpbmcgb2YgdGhlIHBhZ2UgY29udGFpbmluZ1xuLy8gdGhlIGZvcm0gaXMgaXNvLTg4NTktMSwgb3Igd2hlbiB0aGUgc3VibWl0dGVkIGZvcm0gaGFzIGFuIGFjY2VwdC1jaGFyc2V0XG4vLyBhdHRyaWJ1dGUgb2YgaXNvLTg4NTktMS4gUHJlc3VtYWJseSBhbHNvIHdpdGggb3RoZXIgY2hhcnNldHMgdGhhdCBkbyBub3QgY29udGFpblxuLy8gdGhlIOKckyBjaGFyYWN0ZXIsIHN1Y2ggYXMgdXMtYXNjaWkuXG52YXIgaXNvU2VudGluZWwgPSAndXRmOD0lMjYlMjMxMDAwMyUzQic7IC8vIGVuY29kZVVSSUNvbXBvbmVudCgnJiMxMDAwMzsnKVxuXG4vLyBUaGVzZSBhcmUgdGhlIHBlcmNlbnQtZW5jb2RlZCB1dGYtOCBvY3RldHMgcmVwcmVzZW50aW5nIGEgY2hlY2ttYXJrLCBpbmRpY2F0aW5nIHRoYXQgdGhlIHJlcXVlc3QgYWN0dWFsbHkgaXMgdXRmLTggZW5jb2RlZC5cbnZhciBjaGFyc2V0U2VudGluZWwgPSAndXRmOD0lRTIlOUMlOTMnOyAvLyBlbmNvZGVVUklDb21wb25lbnQoJ+KckycpXG5cbnZhciBwYXJzZVZhbHVlcyA9IGZ1bmN0aW9uIHBhcnNlUXVlcnlTdHJpbmdWYWx1ZXMoc3RyLCBvcHRpb25zKSB7XG4gICAgdmFyIG9iaiA9IHt9O1xuICAgIHZhciBjbGVhblN0ciA9IG9wdGlvbnMuaWdub3JlUXVlcnlQcmVmaXggPyBzdHIucmVwbGFjZSgvXlxcPy8sICcnKSA6IHN0cjtcbiAgICB2YXIgbGltaXQgPSBvcHRpb25zLnBhcmFtZXRlckxpbWl0ID09PSBJbmZpbml0eSA/IHVuZGVmaW5lZCA6IG9wdGlvbnMucGFyYW1ldGVyTGltaXQ7XG4gICAgdmFyIHBhcnRzID0gY2xlYW5TdHIuc3BsaXQob3B0aW9ucy5kZWxpbWl0ZXIsIGxpbWl0KTtcbiAgICB2YXIgc2tpcEluZGV4ID0gLTE7IC8vIEtlZXAgdHJhY2sgb2Ygd2hlcmUgdGhlIHV0Zjggc2VudGluZWwgd2FzIGZvdW5kXG4gICAgdmFyIGk7XG5cbiAgICB2YXIgY2hhcnNldCA9IG9wdGlvbnMuY2hhcnNldDtcbiAgICBpZiAob3B0aW9ucy5jaGFyc2V0U2VudGluZWwpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAocGFydHNbaV0uaW5kZXhPZigndXRmOD0nKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChwYXJ0c1tpXSA9PT0gY2hhcnNldFNlbnRpbmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYXJzZXQgPSAndXRmLTgnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFydHNbaV0gPT09IGlzb1NlbnRpbmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYXJzZXQgPSAnaXNvLTg4NTktMSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNraXBJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgaSA9IHBhcnRzLmxlbmd0aDsgLy8gVGhlIGVzbGludCBzZXR0aW5ncyBkbyBub3QgYWxsb3cgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKGkgPT09IHNraXBJbmRleCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBhcnQgPSBwYXJ0c1tpXTtcblxuICAgICAgICB2YXIgYnJhY2tldEVxdWFsc1BvcyA9IHBhcnQuaW5kZXhPZignXT0nKTtcbiAgICAgICAgdmFyIHBvcyA9IGJyYWNrZXRFcXVhbHNQb3MgPT09IC0xID8gcGFydC5pbmRleE9mKCc9JykgOiBicmFja2V0RXF1YWxzUG9zICsgMTtcblxuICAgICAgICB2YXIga2V5LCB2YWw7XG4gICAgICAgIGlmIChwb3MgPT09IC0xKSB7XG4gICAgICAgICAgICBrZXkgPSBvcHRpb25zLmRlY29kZXIocGFydCwgZGVmYXVsdHMuZGVjb2RlciwgY2hhcnNldCwgJ2tleScpO1xuICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgPyBudWxsIDogJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBrZXkgPSBvcHRpb25zLmRlY29kZXIocGFydC5zbGljZSgwLCBwb3MpLCBkZWZhdWx0cy5kZWNvZGVyLCBjaGFyc2V0LCAna2V5Jyk7XG4gICAgICAgICAgICB2YWwgPSB1dGlscy5tYXliZU1hcChcbiAgICAgICAgICAgICAgICBwYXJzZUFycmF5VmFsdWUocGFydC5zbGljZShwb3MgKyAxKSwgb3B0aW9ucyksXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGVuY29kZWRWYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMuZGVjb2RlcihlbmNvZGVkVmFsLCBkZWZhdWx0cy5kZWNvZGVyLCBjaGFyc2V0LCAndmFsdWUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbCAmJiBvcHRpb25zLmludGVycHJldE51bWVyaWNFbnRpdGllcyAmJiBjaGFyc2V0ID09PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgICAgIHZhbCA9IGludGVycHJldE51bWVyaWNFbnRpdGllcyh2YWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcnQuaW5kZXhPZignW109JykgPiAtMSkge1xuICAgICAgICAgICAgdmFsID0gaXNBcnJheSh2YWwpID8gW3ZhbF0gOiB2YWw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFzLmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgICAgICBvYmpba2V5XSA9IHV0aWxzLmNvbWJpbmUob2JqW2tleV0sIHZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYmpba2V5XSA9IHZhbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59O1xuXG52YXIgcGFyc2VPYmplY3QgPSBmdW5jdGlvbiAoY2hhaW4sIHZhbCwgb3B0aW9ucywgdmFsdWVzUGFyc2VkKSB7XG4gICAgdmFyIGxlYWYgPSB2YWx1ZXNQYXJzZWQgPyB2YWwgOiBwYXJzZUFycmF5VmFsdWUodmFsLCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIGkgPSBjaGFpbi5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgb2JqO1xuICAgICAgICB2YXIgcm9vdCA9IGNoYWluW2ldO1xuXG4gICAgICAgIGlmIChyb290ID09PSAnW10nICYmIG9wdGlvbnMucGFyc2VBcnJheXMpIHtcbiAgICAgICAgICAgIG9iaiA9IFtdLmNvbmNhdChsZWFmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9iaiA9IG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICAgICAgICAgICAgdmFyIGNsZWFuUm9vdCA9IHJvb3QuY2hhckF0KDApID09PSAnWycgJiYgcm9vdC5jaGFyQXQocm9vdC5sZW5ndGggLSAxKSA9PT0gJ10nID8gcm9vdC5zbGljZSgxLCAtMSkgOiByb290O1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoY2xlYW5Sb290LCAxMCk7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMucGFyc2VBcnJheXMgJiYgY2xlYW5Sb290ID09PSAnJykge1xuICAgICAgICAgICAgICAgIG9iaiA9IHsgMDogbGVhZiB9O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAhaXNOYU4oaW5kZXgpXG4gICAgICAgICAgICAgICAgJiYgcm9vdCAhPT0gY2xlYW5Sb290XG4gICAgICAgICAgICAgICAgJiYgU3RyaW5nKGluZGV4KSA9PT0gY2xlYW5Sb290XG4gICAgICAgICAgICAgICAgJiYgaW5kZXggPj0gMFxuICAgICAgICAgICAgICAgICYmIChvcHRpb25zLnBhcnNlQXJyYXlzICYmIGluZGV4IDw9IG9wdGlvbnMuYXJyYXlMaW1pdClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG9iaiA9IFtdO1xuICAgICAgICAgICAgICAgIG9ialtpbmRleF0gPSBsZWFmO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmpbY2xlYW5Sb290XSA9IGxlYWY7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZWFmID0gb2JqOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgfVxuXG4gICAgcmV0dXJuIGxlYWY7XG59O1xuXG52YXIgcGFyc2VLZXlzID0gZnVuY3Rpb24gcGFyc2VRdWVyeVN0cmluZ0tleXMoZ2l2ZW5LZXksIHZhbCwgb3B0aW9ucywgdmFsdWVzUGFyc2VkKSB7XG4gICAgaWYgKCFnaXZlbktleSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVHJhbnNmb3JtIGRvdCBub3RhdGlvbiB0byBicmFja2V0IG5vdGF0aW9uXG4gICAgdmFyIGtleSA9IG9wdGlvbnMuYWxsb3dEb3RzID8gZ2l2ZW5LZXkucmVwbGFjZSgvXFwuKFteLltdKykvZywgJ1skMV0nKSA6IGdpdmVuS2V5O1xuXG4gICAgLy8gVGhlIHJlZ2V4IGNodW5rc1xuXG4gICAgdmFyIGJyYWNrZXRzID0gLyhcXFtbXltcXF1dKl0pLztcbiAgICB2YXIgY2hpbGQgPSAvKFxcW1teW1xcXV0qXSkvZztcblxuICAgIC8vIEdldCB0aGUgcGFyZW50XG5cbiAgICB2YXIgc2VnbWVudCA9IG9wdGlvbnMuZGVwdGggPiAwICYmIGJyYWNrZXRzLmV4ZWMoa2V5KTtcbiAgICB2YXIgcGFyZW50ID0gc2VnbWVudCA/IGtleS5zbGljZSgwLCBzZWdtZW50LmluZGV4KSA6IGtleTtcblxuICAgIC8vIFN0YXNoIHRoZSBwYXJlbnQgaWYgaXQgZXhpc3RzXG5cbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgLy8gSWYgd2UgYXJlbid0IHVzaW5nIHBsYWluIG9iamVjdHMsIG9wdGlvbmFsbHkgcHJlZml4IGtleXMgdGhhdCB3b3VsZCBvdmVyd3JpdGUgb2JqZWN0IHByb3RvdHlwZSBwcm9wZXJ0aWVzXG4gICAgICAgIGlmICghb3B0aW9ucy5wbGFpbk9iamVjdHMgJiYgaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgcGFyZW50KSkge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmFsbG93UHJvdG90eXBlcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGtleXMucHVzaChwYXJlbnQpO1xuICAgIH1cblxuICAgIC8vIExvb3AgdGhyb3VnaCBjaGlsZHJlbiBhcHBlbmRpbmcgdG8gdGhlIGFycmF5IHVudGlsIHdlIGhpdCBkZXB0aFxuXG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChvcHRpb25zLmRlcHRoID4gMCAmJiAoc2VnbWVudCA9IGNoaWxkLmV4ZWMoa2V5KSkgIT09IG51bGwgJiYgaSA8IG9wdGlvbnMuZGVwdGgpIHtcbiAgICAgICAgaSArPSAxO1xuICAgICAgICBpZiAoIW9wdGlvbnMucGxhaW5PYmplY3RzICYmIGhhcy5jYWxsKE9iamVjdC5wcm90b3R5cGUsIHNlZ21lbnRbMV0uc2xpY2UoMSwgLTEpKSkge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmFsbG93UHJvdG90eXBlcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBrZXlzLnB1c2goc2VnbWVudFsxXSk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUncyBhIHJlbWFpbmRlciwganVzdCBhZGQgd2hhdGV2ZXIgaXMgbGVmdFxuXG4gICAgaWYgKHNlZ21lbnQpIHtcbiAgICAgICAga2V5cy5wdXNoKCdbJyArIGtleS5zbGljZShzZWdtZW50LmluZGV4KSArICddJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnNlT2JqZWN0KGtleXMsIHZhbCwgb3B0aW9ucywgdmFsdWVzUGFyc2VkKTtcbn07XG5cbnZhciBub3JtYWxpemVQYXJzZU9wdGlvbnMgPSBmdW5jdGlvbiBub3JtYWxpemVQYXJzZU9wdGlvbnMob3B0cykge1xuICAgIGlmICghb3B0cykge1xuICAgICAgICByZXR1cm4gZGVmYXVsdHM7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuZGVjb2RlciAhPT0gbnVsbCAmJiBvcHRzLmRlY29kZXIgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb3B0cy5kZWNvZGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0RlY29kZXIgaGFzIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvcHRzLmNoYXJzZXQgIT09ICd1bmRlZmluZWQnICYmIG9wdHMuY2hhcnNldCAhPT0gJ3V0Zi04JyAmJiBvcHRzLmNoYXJzZXQgIT09ICdpc28tODg1OS0xJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgY2hhcnNldCBvcHRpb24gbXVzdCBiZSBlaXRoZXIgdXRmLTgsIGlzby04ODU5LTEsIG9yIHVuZGVmaW5lZCcpO1xuICAgIH1cbiAgICB2YXIgY2hhcnNldCA9IHR5cGVvZiBvcHRzLmNoYXJzZXQgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuY2hhcnNldCA6IG9wdHMuY2hhcnNldDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFsbG93RG90czogdHlwZW9mIG9wdHMuYWxsb3dEb3RzID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmFsbG93RG90cyA6ICEhb3B0cy5hbGxvd0RvdHMsXG4gICAgICAgIGFsbG93UHJvdG90eXBlczogdHlwZW9mIG9wdHMuYWxsb3dQcm90b3R5cGVzID09PSAnYm9vbGVhbicgPyBvcHRzLmFsbG93UHJvdG90eXBlcyA6IGRlZmF1bHRzLmFsbG93UHJvdG90eXBlcyxcbiAgICAgICAgYXJyYXlMaW1pdDogdHlwZW9mIG9wdHMuYXJyYXlMaW1pdCA9PT0gJ251bWJlcicgPyBvcHRzLmFycmF5TGltaXQgOiBkZWZhdWx0cy5hcnJheUxpbWl0LFxuICAgICAgICBjaGFyc2V0OiBjaGFyc2V0LFxuICAgICAgICBjaGFyc2V0U2VudGluZWw6IHR5cGVvZiBvcHRzLmNoYXJzZXRTZW50aW5lbCA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5jaGFyc2V0U2VudGluZWwgOiBkZWZhdWx0cy5jaGFyc2V0U2VudGluZWwsXG4gICAgICAgIGNvbW1hOiB0eXBlb2Ygb3B0cy5jb21tYSA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5jb21tYSA6IGRlZmF1bHRzLmNvbW1hLFxuICAgICAgICBkZWNvZGVyOiB0eXBlb2Ygb3B0cy5kZWNvZGVyID09PSAnZnVuY3Rpb24nID8gb3B0cy5kZWNvZGVyIDogZGVmYXVsdHMuZGVjb2RlcixcbiAgICAgICAgZGVsaW1pdGVyOiB0eXBlb2Ygb3B0cy5kZWxpbWl0ZXIgPT09ICdzdHJpbmcnIHx8IHV0aWxzLmlzUmVnRXhwKG9wdHMuZGVsaW1pdGVyKSA/IG9wdHMuZGVsaW1pdGVyIDogZGVmYXVsdHMuZGVsaW1pdGVyLFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8taW1wbGljaXQtY29lcmNpb24sIG5vLWV4dHJhLXBhcmVuc1xuICAgICAgICBkZXB0aDogKHR5cGVvZiBvcHRzLmRlcHRoID09PSAnbnVtYmVyJyB8fCBvcHRzLmRlcHRoID09PSBmYWxzZSkgPyArb3B0cy5kZXB0aCA6IGRlZmF1bHRzLmRlcHRoLFxuICAgICAgICBpZ25vcmVRdWVyeVByZWZpeDogb3B0cy5pZ25vcmVRdWVyeVByZWZpeCA9PT0gdHJ1ZSxcbiAgICAgICAgaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzOiB0eXBlb2Ygb3B0cy5pbnRlcnByZXROdW1lcmljRW50aXRpZXMgPT09ICdib29sZWFuJyA/IG9wdHMuaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzIDogZGVmYXVsdHMuaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzLFxuICAgICAgICBwYXJhbWV0ZXJMaW1pdDogdHlwZW9mIG9wdHMucGFyYW1ldGVyTGltaXQgPT09ICdudW1iZXInID8gb3B0cy5wYXJhbWV0ZXJMaW1pdCA6IGRlZmF1bHRzLnBhcmFtZXRlckxpbWl0LFxuICAgICAgICBwYXJzZUFycmF5czogb3B0cy5wYXJzZUFycmF5cyAhPT0gZmFsc2UsXG4gICAgICAgIHBsYWluT2JqZWN0czogdHlwZW9mIG9wdHMucGxhaW5PYmplY3RzID09PSAnYm9vbGVhbicgPyBvcHRzLnBsYWluT2JqZWN0cyA6IGRlZmF1bHRzLnBsYWluT2JqZWN0cyxcbiAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nOiB0eXBlb2Ygb3B0cy5zdHJpY3ROdWxsSGFuZGxpbmcgPT09ICdib29sZWFuJyA/IG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nIDogZGVmYXVsdHMuc3RyaWN0TnVsbEhhbmRsaW5nXG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0ciwgb3B0cykge1xuICAgIHZhciBvcHRpb25zID0gbm9ybWFsaXplUGFyc2VPcHRpb25zKG9wdHMpO1xuXG4gICAgaWYgKHN0ciA9PT0gJycgfHwgc3RyID09PSBudWxsIHx8IHR5cGVvZiBzdHIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgICB9XG5cbiAgICB2YXIgdGVtcE9iaiA9IHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnID8gcGFyc2VWYWx1ZXMoc3RyLCBvcHRpb25zKSA6IHN0cjtcbiAgICB2YXIgb2JqID0gb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG5cbiAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIGtleXMgYW5kIHNldHVwIHRoZSBuZXcgb2JqZWN0XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRlbXBPYmopO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgdmFyIG5ld09iaiA9IHBhcnNlS2V5cyhrZXksIHRlbXBPYmpba2V5XSwgb3B0aW9ucywgdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycpO1xuICAgICAgICBvYmogPSB1dGlscy5tZXJnZShvYmosIG5ld09iaiwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHV0aWxzLmNvbXBhY3Qob2JqKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnkgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpO1xudmFyIHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpO1xudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZm9ybWF0czogZm9ybWF0cyxcbiAgICBwYXJzZTogcGFyc2UsXG4gICAgc3RyaW5naWZ5OiBzdHJpbmdpZnlcbn07XG4iLCJpbXBvcnQgd2luZG93SGFuZGxlciBmcm9tICcuLi8uLi9zcmMvaGVscGVyL3dpbmRvdyc7XG5pbXBvcnQgcXMgZnJvbSAncXMnO1xuaW1wb3J0IHVybGpvaW4gZnJvbSAndXJsLWpvaW4nO1xuXG5mdW5jdGlvbiBQb3B1cEhhbmRsZXIod2ViQXV0aCkge1xuICB0aGlzLndlYkF1dGggPSB3ZWJBdXRoO1xuICB0aGlzLl9jdXJyZW50X3BvcHVwID0gbnVsbDtcbiAgdGhpcy5vcHRpb25zID0gbnVsbDtcbn1cblxuUG9wdXBIYW5kbGVyLnByb3RvdHlwZS5wcmVsb2FkID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuICB2YXIgX3dpbmRvdyA9IHdpbmRvd0hhbmRsZXIuZ2V0V2luZG93KCk7XG5cbiAgdmFyIHVybCA9IG9wdGlvbnMudXJsIHx8ICdhYm91dDpibGFuayc7XG4gIHZhciBwb3B1cE9wdGlvbnMgPSBvcHRpb25zLnBvcHVwT3B0aW9ucyB8fCB7fTtcblxuICBwb3B1cE9wdGlvbnMubG9jYXRpb24gPSAneWVzJztcbiAgZGVsZXRlIHBvcHVwT3B0aW9ucy53aWR0aDtcbiAgZGVsZXRlIHBvcHVwT3B0aW9ucy5oZWlnaHQ7XG5cbiAgdmFyIHdpbmRvd0ZlYXR1cmVzID0gcXMuc3RyaW5naWZ5KHBvcHVwT3B0aW9ucywge1xuICAgIGVuY29kZTogZmFsc2UsXG4gICAgZGVsaW1pdGVyOiAnLCdcbiAgfSk7XG5cbiAgaWYgKHRoaXMuX2N1cnJlbnRfcG9wdXAgJiYgIXRoaXMuX2N1cnJlbnRfcG9wdXAuY2xvc2VkKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRfcG9wdXA7XG4gIH1cblxuICB0aGlzLl9jdXJyZW50X3BvcHVwID0gX3dpbmRvdy5vcGVuKHVybCwgJ19ibGFuaycsIHdpbmRvd0ZlYXR1cmVzKTtcblxuICB0aGlzLl9jdXJyZW50X3BvcHVwLmtpbGwgPSBmdW5jdGlvbihzdWNjZXNzKSB7XG4gICAgX3RoaXMuX2N1cnJlbnRfcG9wdXAuc3VjY2VzcyA9IHN1Y2Nlc3M7XG4gICAgdGhpcy5jbG9zZSgpO1xuICAgIF90aGlzLl9jdXJyZW50X3BvcHVwID0gbnVsbDtcbiAgfTtcblxuICByZXR1cm4gdGhpcy5fY3VycmVudF9wb3B1cDtcbn07XG5cblBvcHVwSGFuZGxlci5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uKHVybCwgXywgb3B0aW9ucywgY2IpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcbiAgdGhpcy51cmwgPSB1cmw7XG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIGlmICghdGhpcy5fY3VycmVudF9wb3B1cCkge1xuICAgIG9wdGlvbnMudXJsID0gdXJsO1xuICAgIHRoaXMucHJlbG9hZChvcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9jdXJyZW50X3BvcHVwLmxvY2F0aW9uLmhyZWYgPSB1cmw7XG4gIH1cblxuICB0aGlzLnRyYW5zaWVudEVycm9ySGFuZGxlciA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgX3RoaXMuZXJyb3JIYW5kbGVyKGV2ZW50LCBjYik7XG4gIH07XG5cbiAgdGhpcy50cmFuc2llbnRTdGFydEhhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuICAgIF90aGlzLnN0YXJ0SGFuZGxlcihldmVudCwgY2IpO1xuICB9O1xuXG4gIHRoaXMudHJhbnNpZW50RXhpdEhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICBfdGhpcy5leGl0SGFuZGxlcihjYik7XG4gIH07XG5cbiAgdGhpcy5fY3VycmVudF9wb3B1cC5hZGRFdmVudExpc3RlbmVyKCdsb2FkZXJyb3InLCB0aGlzLnRyYW5zaWVudEVycm9ySGFuZGxlcik7XG4gIHRoaXMuX2N1cnJlbnRfcG9wdXAuYWRkRXZlbnRMaXN0ZW5lcignbG9hZHN0YXJ0JywgdGhpcy50cmFuc2llbnRTdGFydEhhbmRsZXIpO1xuICB0aGlzLl9jdXJyZW50X3BvcHVwLmFkZEV2ZW50TGlzdGVuZXIoJ2V4aXQnLCB0aGlzLnRyYW5zaWVudEV4aXRIYW5kbGVyKTtcbn07XG5cblBvcHVwSGFuZGxlci5wcm90b3R5cGUuZXJyb3JIYW5kbGVyID0gZnVuY3Rpb24oZXZlbnQsIGNiKSB7XG4gIGlmICghdGhpcy5fY3VycmVudF9wb3B1cCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuX2N1cnJlbnRfcG9wdXAua2lsbCh0cnVlKTtcblxuICBjYih7IGVycm9yOiAnd2luZG93X2Vycm9yJywgZXJyb3JEZXNjcmlwdGlvbjogZXZlbnQubWVzc2FnZSB9KTtcbn07XG5cblBvcHVwSGFuZGxlci5wcm90b3R5cGUudW5ob29rID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2N1cnJlbnRfcG9wdXAucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAnbG9hZGVycm9yJyxcbiAgICB0aGlzLnRyYW5zaWVudEVycm9ySGFuZGxlclxuICApO1xuICB0aGlzLl9jdXJyZW50X3BvcHVwLnJlbW92ZUV2ZW50TGlzdGVuZXIoXG4gICAgJ2xvYWRzdGFydCcsXG4gICAgdGhpcy50cmFuc2llbnRTdGFydEhhbmRsZXJcbiAgKTtcbiAgdGhpcy5fY3VycmVudF9wb3B1cC5yZW1vdmVFdmVudExpc3RlbmVyKCdleGl0JywgdGhpcy50cmFuc2llbnRFeGl0SGFuZGxlcik7XG59O1xuXG5Qb3B1cEhhbmRsZXIucHJvdG90eXBlLmV4aXRIYW5kbGVyID0gZnVuY3Rpb24oY2IpIHtcbiAgaWYgKCF0aGlzLl9jdXJyZW50X3BvcHVwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gd2hlbiB0aGUgbW9kYWwgaXMgY2xvc2VkLCB0aGlzIGV2ZW50IGlzIGNhbGxlZCB3aGljaCBlbmRzIHVwIHJlbW92aW5nIHRoZVxuICAvLyBldmVudCBsaXN0ZW5lcnMuIElmIHlvdSBtb3ZlIHRoaXMgYmVmb3JlIGNsb3NpbmcgdGhlIG1vZGFsLCBpdCB3aWxsIGFkZCB+MSBzZWNcbiAgLy8gZGVsYXkgYmV0d2VlbiB0aGUgdXNlciBiZWluZyByZWRpcmVjdGVkIHRvIHRoZSBjYWxsYmFjayBhbmQgdGhlIHBvcHVwIGdldHMgY2xvc2VkLlxuICB0aGlzLnVuaG9vaygpO1xuXG4gIGlmICghdGhpcy5fY3VycmVudF9wb3B1cC5zdWNjZXNzKSB7XG4gICAgY2IoeyBlcnJvcjogJ3dpbmRvd19jbG9zZWQnLCBlcnJvckRlc2NyaXB0aW9uOiAnQnJvd3NlciB3aW5kb3cgY2xvc2VkJyB9KTtcbiAgfVxufTtcblxuUG9wdXBIYW5kbGVyLnByb3RvdHlwZS5zdGFydEhhbmRsZXIgPSBmdW5jdGlvbihldmVudCwgY2IpIHtcbiAgdmFyIF90aGlzID0gdGhpcztcblxuICBpZiAoIXRoaXMuX2N1cnJlbnRfcG9wdXApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgY2FsbGJhY2tVcmwgPSB1cmxqb2luKFxuICAgICdodHRwczonLFxuICAgIHRoaXMud2ViQXV0aC5iYXNlT3B0aW9ucy5kb21haW4sXG4gICAgJy9tb2JpbGUnXG4gICk7XG5cbiAgaWYgKGV2ZW50LnVybCAmJiAhKGV2ZW50LnVybC5pbmRleE9mKGNhbGxiYWNrVXJsICsgJyMnKSA9PT0gMCkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgcGFydHMgPSBldmVudC51cmwuc3BsaXQoJyMnKTtcblxuICBpZiAocGFydHMubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIG9wdHMgPSB7IGhhc2g6IHBhcnRzLnBvcCgpIH07XG5cbiAgaWYgKHRoaXMub3B0aW9ucy5ub25jZSkge1xuICAgIG9wdHMubm9uY2UgPSB0aGlzLm9wdGlvbnMubm9uY2U7XG4gIH1cblxuICB0aGlzLndlYkF1dGgucGFyc2VIYXNoKG9wdHMsIGZ1bmN0aW9uKGVycm9yLCByZXN1bHQpIHtcbiAgICBpZiAoZXJyb3IgfHwgcmVzdWx0KSB7XG4gICAgICBfdGhpcy5fY3VycmVudF9wb3B1cC5raWxsKHRydWUpO1xuICAgICAgY2IoZXJyb3IsIHJlc3VsdCk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBvcHVwSGFuZGxlcjtcbiIsImltcG9ydCB1cmxqb2luIGZyb20gJ3VybC1qb2luJztcbmltcG9ydCBQb3B1cEhhbmRsZXIgZnJvbSAnLi9wb3B1cC1oYW5kbGVyJztcblxuZnVuY3Rpb24gUGx1Z2luSGFuZGxlcih3ZWJBdXRoKSB7XG4gIHRoaXMud2ViQXV0aCA9IHdlYkF1dGg7XG59XG5cblBsdWdpbkhhbmRsZXIucHJvdG90eXBlLnByb2Nlc3NQYXJhbXMgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgcGFyYW1zLnJlZGlyZWN0VXJpID0gdXJsam9pbignaHR0cHM6Ly8nICsgcGFyYW1zLmRvbWFpbiwgJ21vYmlsZScpO1xuICBkZWxldGUgcGFyYW1zLm93cDtcbiAgcmV0dXJuIHBhcmFtcztcbn07XG5cblBsdWdpbkhhbmRsZXIucHJvdG90eXBlLmdldFBvcHVwSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFBvcHVwSGFuZGxlcih0aGlzLndlYkF1dGgpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGx1Z2luSGFuZGxlcjtcbiIsImltcG9ydCB2ZXJzaW9uIGZyb20gJy4uLy4uL3NyYy92ZXJzaW9uJztcbmltcG9ydCB3aW5kb3dIYW5kbGVyIGZyb20gJy4uLy4uL3NyYy9oZWxwZXIvd2luZG93JztcbmltcG9ydCBQbHVnaW5IYW5kbGVyIGZyb20gJy4vcGx1Z2luLWhhbmRsZXInO1xuXG5mdW5jdGlvbiBDb3Jkb3ZhUGx1Z2luKCkge1xuICB0aGlzLndlYkF1dGggPSBudWxsO1xuICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uLnJhdztcbiAgdGhpcy5leHRlbnNpYmlsaXR5UG9pbnRzID0gWydwb3B1cC5hdXRob3JpemUnLCAncG9wdXAuZ2V0UG9wdXBIYW5kbGVyJ107XG59XG5cbkNvcmRvdmFQbHVnaW4ucHJvdG90eXBlLnNldFdlYkF1dGggPSBmdW5jdGlvbih3ZWJBdXRoKSB7XG4gIHRoaXMud2ViQXV0aCA9IHdlYkF1dGg7XG59O1xuXG5Db3Jkb3ZhUGx1Z2luLnByb3RvdHlwZS5zdXBwb3J0cyA9IGZ1bmN0aW9uKGV4dGVuc2liaWxpdHlQb2ludCkge1xuICB2YXIgX3dpbmRvdyA9IHdpbmRvd0hhbmRsZXIuZ2V0V2luZG93KCk7XG4gIHJldHVybiAoXG4gICAgKCEhX3dpbmRvdy5jb3Jkb3ZhIHx8ICEhX3dpbmRvdy5lbGVjdHJvbikgJiZcbiAgICB0aGlzLmV4dGVuc2liaWxpdHlQb2ludHMuaW5kZXhPZihleHRlbnNpYmlsaXR5UG9pbnQpID4gLTFcbiAgKTtcbn07XG5cbkNvcmRvdmFQbHVnaW4ucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBQbHVnaW5IYW5kbGVyKHRoaXMud2ViQXV0aCk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb3Jkb3ZhUGx1Z2luO1xuIl0sIm5hbWVzIjpbInRoaXMiLCJpc0FycmF5IiwibWVyZ2UiLCJ1dGlsIiwiaGFzIiwiZGVmYXVsdHMiLCJzdHJpbmdpZnkiLCJxcyIsInVybGpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7RUFBQSxXQUFjLEdBQUcsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFOztFQ0FsQyxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztBQUN6QztFQUNBLFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtFQUN4QyxFQUFFLElBQUksR0FBRyxJQUFJLEtBQUssT0FBTyxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUM7RUFDNUMsRUFBRSxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7RUFDcEMsSUFBSSxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQzFCLEdBQUc7RUFDSCxDQUFDO0FBQ0Q7RUFDQSxTQUFTLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtFQUNqQyxFQUFFLElBQUksT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFO0VBQ3pCLElBQUksTUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUMxQixHQUFHO0VBQ0gsQ0FBQztBQUNEO0VBQ0EsU0FBUyxLQUFLLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7RUFDaEMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7RUFDaEMsSUFBSSxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQzFCLEdBQUc7RUFDSCxDQUFDO0FBQ0Q7RUFDQSxTQUFTLEtBQUssQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRTtFQUN0QyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLENBQUMsRUFBRTtFQUM3QixJQUFJLFFBQVEsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7RUFDN0MsR0FBRztFQUNILEVBQUUsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxVQUFVLEVBQUU7RUFDOUMsSUFBSSxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3ZDO0VBQ0EsSUFBSSxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtFQUN0RCxNQUFNLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUMxQixNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtFQUMzQyxRQUFRLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FB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TUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQyxZQUFZLFNBQVM7RUFDckIsU0FBUztBQUNUO0VBQ0EsUUFBUSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUU7RUFDdEIsWUFBWSxHQUFHLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQyxZQUFZLFNBQVM7RUFDckIsU0FBUztBQUNUO0VBQ0EsUUFBUSxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUU7RUFDdkIsWUFBWSxHQUFHLEdBQUcsR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xGLFlBQVksU0FBUztFQUNyQixTQUFTO0FBQ1Q7RUFDQSxRQUFRLElBQUksQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksTUFBTSxFQUFFO0VBQ3ZDLFlBQVksR0FBRyxHQUFHLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3hILFlBQVksU0FBUztFQUNyQixTQUFTO0FBQ1Q7RUFDQSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDZixRQUFRLENBQUMsR0FBRyxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEtBQUssRUFBRSxLQUFLLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztFQUM3RSxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FB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
