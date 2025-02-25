"use strict";

exports.__esModule = true;
exports.atomic = atomic;
exports.classic = classic;
exports.inline = inline;
exports.stringifyValueWithProperty = stringifyValueWithProperty;

var _createReactDOMStyle = _interopRequireDefault(require("./createReactDOMStyle"));

var _hash = _interopRequireDefault(require("../../vendor/hash"));

var _hyphenateStyleName = _interopRequireDefault(require("hyphenate-style-name"));

var _normalizeValueWithProperty = _interopRequireDefault(require("./normalizeValueWithProperty"));

var _prefixStyles = _interopRequireWildcard(require("../../modules/prefixStyles"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var cache = {
  get: function get(property, value) {
    if (cache[property] != null && cache[property].hasOwnProperty(value) && cache[property][value] != null) {
      return cache[property][value];
    }
  },
  set: function set(property, value, object) {
    if (cache[property] == null) {
      cache[property] = {};
    }

    return cache[property][value] = object;
  }
};
/**
 * Compile style to atomic CSS rules.
 */

function atomic(style) {
  return Object.keys(style).sort().reduce(function (acc, property) {
    var value = style[property];

    if (value != null) {
      var valueString = stringifyValueWithProperty(value, property);
      var cachedResult = cache.get(property, valueString);

      if (cachedResult != null) {
        var identifier = cachedResult.identifier;
        acc[identifier] = cachedResult;
      } else {
        var _identifier = createIdentifier('r', property, value);

        var rules = createAtomicRules(_identifier, property, value);

        var _cachedResult = cache.set(property, valueString, {
          property: property,
          value: stringifyValueWithProperty(value, property),
          identifier: _identifier,
          rules: rules
        });

        acc[_identifier] = _cachedResult;
      }
    }

    return acc;
  }, {});
}
/**
 * Compile simple style object to classic CSS rules.
 * No support for 'placeholderTextColor', 'scrollbarWidth', or 'pointerEvents'.
 */


function classic(style, name) {
  var _ref;

  var identifier = createIdentifier('css', name, style);

  var animationKeyframes = style.animationKeyframes,
      rest = _objectWithoutPropertiesLoose(style, ["animationKeyframes"]);

  var rules = [];
  var selector = "." + identifier;
  var animationName;

  if (animationKeyframes != null) {
    var _processKeyframesValu = processKeyframesValue(animationKeyframes),
        animationNames = _processKeyframesValu.animationNames,
        keyframesRules = _processKeyframesValu.rules;

    animationName = animationNames.join(',');
    rules.push.apply(rules, keyframesRules);
  }

  var block = createDeclarationBlock(_objectSpread({}, rest, {
    animationName: animationName
  }));
  rules.push("" + selector + block);
  return _ref = {}, _ref[identifier] = {
    identifier: identifier,
    rules: rules
  }, _ref;
}
/**
 * Compile simple style object to inline DOM styles.
 * No support for 'animationKeyframes', 'placeholderTextColor', 'scrollbarWidth', or 'pointerEvents'.
 */


function inline(style) {
  return (0, _prefixStyles.prefixInlineStyles)((0, _createReactDOMStyle.default)(style));
}
/**
 * Create a value string that normalizes different input values with a common
 * output.
 */


function stringifyValueWithProperty(value, property) {
  // e.g., 0 => '0px', 'black' => 'rgba(0,0,0,1)'
  var normalizedValue = (0, _normalizeValueWithProperty.default)(value, property);
  return typeof normalizedValue !== 'string' ? JSON.stringify(normalizedValue || '') : normalizedValue;
}
/**
 * Create the Atomic CSS rules needed for a given StyleSheet rule.
 * Translates StyleSheet declarations to CSS.
 */


function createAtomicRules(identifier, property, value) {
  var rules = [];
  var selector = "." + identifier; // Handle non-standard properties and object values that require multiple
  // CSS rules to be created.

  switch (property) {
    case 'animationKeyframes':
      {
        var _processKeyframesValu2 = processKeyframesValue(value),
            animationNames = _processKeyframesValu2.animationNames,
            keyframesRules = _processKeyframesValu2.rules;

        var block = createDeclarationBlock({
          animationName: animationNames.join(',')
        });
        rules.push.apply(rules, ["" + selector + block].concat(keyframesRules));
        break;
      }

    case 'placeholderTextColor':
      {
        var _block = createDeclarationBlock({
          color: value,
          opacity: 1
        });

        rules.push(selector + "::-webkit-input-placeholder" + _block, selector + "::-moz-placeholder" + _block, selector + ":-ms-input-placeholder" + _block, selector + "::placeholder" + _block);
        break;
      }
    // Polyfill for draft spec
    // https://drafts.csswg.org/css-scrollbars-1/

    case 'scrollbarWidth':
      {
        if (value === 'none') {
          rules.push(selector + "::-webkit-scrollbar{display:none}", selector + "{overflow:-moz-scrollbars-none;-ms-overflow-style:none;scrollbar-width:none;}");
        }

        break;
      }
    // See #513

    case 'pointerEvents':
      {
        var _createDeclarationBlo3;

        var finalValue = value;

        if (value === 'auto' || value === 'box-only') {
          finalValue = 'auto!important';

          if (value === 'box-only') {
            var _createDeclarationBlo;

            var _block3 = createDeclarationBlock((_createDeclarationBlo = {}, _createDeclarationBlo[property] = 'none', _createDeclarationBlo));

            rules.push(selector + ">*" + _block3);
          }
        } else if (value === 'none' || value === 'box-none') {
          finalValue = 'none!important';

          if (value === 'box-none') {
            var _createDeclarationBlo2;

            var _block4 = createDeclarationBlock((_createDeclarationBlo2 = {}, _createDeclarationBlo2[property] = 'auto', _createDeclarationBlo2));

            rules.push(selector + ">*" + _block4);
          }
        }

        var _block2 = createDeclarationBlock((_createDeclarationBlo3 = {}, _createDeclarationBlo3[property] = finalValue, _createDeclarationBlo3));

        rules.push("" + selector + _block2);
        break;
      }

    default:
      {
        var _createDeclarationBlo4;

        var _block5 = createDeclarationBlock((_createDeclarationBlo4 = {}, _createDeclarationBlo4[property] = value, _createDeclarationBlo4));

        rules.push("" + selector + _block5);
        break;
      }
  }

  return rules;
}
/**
 * Creates a CSS declaration block from a StyleSheet object.
 */


function createDeclarationBlock(style) {
  var domStyle = (0, _prefixStyles.default)((0, _createReactDOMStyle.default)(style));
  var declarationsString = Object.keys(domStyle).map(function (property) {
    var value = domStyle[property];
    var prop = (0, _hyphenateStyleName.default)(property); // The prefixer may return an array of values:
    // { display: [ '-webkit-flex', 'flex' ] }
    // to represent "fallback" declarations
    // { display: -webkit-flex; display: flex; }

    if (Array.isArray(value)) {
      return value.map(function (v) {
        return prop + ":" + v;
      }).join(';');
    } else {
      return prop + ":" + value;
    }
  }) // Once properties are hyphenated, this will put the vendor
  // prefixed and short-form properties first in the list.
  .sort().join(';');
  return "{" + declarationsString + ";}";
}
/**
 * An identifier is associated with a unique set of styles.
 */


function createIdentifier(prefix, name, value) {
  var hashedString = (0, _hash.default)(name + stringifyValueWithProperty(value, name));
  return process.env.NODE_ENV !== 'production' ? prefix + "-" + name + "-" + hashedString : prefix + "-" + hashedString;
}
/**
 * Create individual CSS keyframes rules.
 */


function createKeyframes(keyframes) {
  var prefixes = ['-webkit-', ''];
  var identifier = createIdentifier('r', 'animation', keyframes);
  var steps = '{' + Object.keys(keyframes).map(function (stepName) {
    var rule = keyframes[stepName];
    var block = createDeclarationBlock(rule);
    return "" + stepName + block;
  }).join('') + '}';
  var rules = prefixes.map(function (prefix) {
    return "@" + prefix + "keyframes " + identifier + steps;
  });
  return {
    identifier: identifier,
    rules: rules
  };
}
/**
 * Create CSS keyframes rules and names from a StyleSheet keyframes object.
 */


function processKeyframesValue(keyframesValue) {
  if (typeof keyframesValue === 'number') {
    throw new Error('Invalid CSS keyframes type');
  }

  var animationNames = [];
  var rules = [];
  var value = Array.isArray(keyframesValue) ? keyframesValue : [keyframesValue];
  value.forEach(function (keyframes) {
    if (typeof keyframes === 'string') {
      // Support external animation libraries (identifiers only)
      animationNames.push(keyframes);
    } else {
      // Create rules for each of the keyframes
      var _createKeyframes = createKeyframes(keyframes),
          identifier = _createKeyframes.identifier,
          keyframesRules = _createKeyframes.rules;

      animationNames.push(identifier);
      rules.push.apply(rules, keyframesRules);
    }
  });
  return {
    animationNames: animationNames,
    rules: rules
  };
}