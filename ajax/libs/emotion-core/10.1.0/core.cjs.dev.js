'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _inheritsLoose = require('@babel/runtime/helpers/inheritsLoose');
var React = require('react');
require('@emotion/cache');
var emotionElement = require('./emotion-element-49eeaaac.cjs.dev.js');
var utils = require('@emotion/utils');
var serialize = require('@emotion/serialize');
var sheet = require('@emotion/sheet');
var css = require('@emotion/css');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var _inheritsLoose__default = /*#__PURE__*/_interopDefault(_inheritsLoose);
var css__default = /*#__PURE__*/_interopDefault(css);

var jsx = function jsx(type, props) {
  var args = arguments;

  if (props == null || !emotionElement.hasOwnProperty.call(props, 'css')) {
    // $FlowFixMe
    return React.createElement.apply(undefined, args);
  }

  var emotionProps = emotionElement.createEmotionProps(type, props); // https://github.com/facebook/react/blob/fd61f7ea53989a59bc427603798bb111c852816a/packages/react/src/ReactElement.js#L386-L400

  var childrenLength = args.length - 2;

  if (childrenLength === 1) {
    emotionProps.children = args[2];
  } else if (childrenLength > 1) {
    var childArray = new Array(childrenLength);

    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = args[i + 2];
    }

    emotionProps.children = childArray;
  } // $FlowFixMe


  return /*#__PURE__*/React.createElement(emotionElement.Emotion, emotionProps);
};

var warnedAboutCssPropForGlobal = false;
var Global = /* #__PURE__ */emotionElement.withEmotionCache(function (props, cache) {
  if (process.env.NODE_ENV !== 'production' && !warnedAboutCssPropForGlobal && ( // check for className as well since the user is
  // probably using the custom createElement which
  // means it will be turned into a className prop
  // $FlowFixMe I don't really want to add it to the type since it shouldn't be used
  props.className || props.css)) {
    console.error("It looks like you're using the css prop on Global, did you mean to use the styles prop instead?");
    warnedAboutCssPropForGlobal = true;
  }

  var styles = props.styles;

  if (typeof styles === 'function') {
    return /*#__PURE__*/React.createElement(emotionElement.ThemeContext.Consumer, null, function (theme) {
      var serialized = serialize.serializeStyles([styles(theme)]);
      return /*#__PURE__*/React.createElement(InnerGlobal, {
        serialized: serialized,
        cache: cache
      });
    });
  }

  var serialized = serialize.serializeStyles([styles]);
  return /*#__PURE__*/React.createElement(InnerGlobal, {
    serialized: serialized,
    cache: cache
  });
});

// maintain place over rerenders.
// initial render from browser, insertBefore context.sheet.tags[0] or if a style hasn't been inserted there yet, appendChild
// initial client-side render from SSR, use place of hydrating tag
var InnerGlobal = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose__default['default'](InnerGlobal, _React$Component);

  function InnerGlobal(props, context, updater) {
    return _React$Component.call(this, props, context, updater) || this;
  }

  var _proto = InnerGlobal.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.sheet = new sheet.StyleSheet({
      key: this.props.cache.key + "-global",
      nonce: this.props.cache.sheet.nonce,
      container: this.props.cache.sheet.container
    }); // $FlowFixMe

    var node = document.querySelector("style[data-emotion-" + this.props.cache.key + "=\"" + this.props.serialized.name + "\"]");

    if (node !== null) {
      this.sheet.tags.push(node);
    }

    if (this.props.cache.sheet.tags.length) {
      this.sheet.before = this.props.cache.sheet.tags[0];
    }

    this.insertStyles();
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (prevProps.serialized.name !== this.props.serialized.name) {
      this.insertStyles();
    }
  };

  _proto.insertStyles = function insertStyles() {
    if (this.props.serialized.next !== undefined) {
      // insert keyframes
      utils.insertStyles(this.props.cache, this.props.serialized.next, true);
    }

    if (this.sheet.tags.length) {
      // if this doesn't exist then it will be null so the style element will be appended
      var element = this.sheet.tags[this.sheet.tags.length - 1].nextElementSibling;
      this.sheet.before = element;
      this.sheet.flush();
    }

    this.props.cache.insert("", this.props.serialized, this.sheet, false);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    this.sheet.flush();
  };

  _proto.render = function render() {
    if (!emotionElement.isBrowser) {
      var serialized = this.props.serialized;
      var serializedNames = serialized.name;
      var serializedStyles = serialized.styles;
      var next = serialized.next;

      while (next !== undefined) {
        serializedNames += ' ' + next.name;
        serializedStyles += next.styles;
        next = next.next;
      }

      var shouldCache = this.props.cache.compat === true;
      var rules = this.props.cache.insert("", {
        name: serializedNames,
        styles: serializedStyles
      }, this.sheet, shouldCache);

      if (!shouldCache) {
        var _ref;

        return /*#__PURE__*/React.createElement("style", (_ref = {}, _ref["data-emotion-" + this.props.cache.key] = serializedNames, _ref.dangerouslySetInnerHTML = {
          __html: rules
        }, _ref.nonce = this.props.cache.sheet.nonce, _ref));
      }
    }

    return null;
  };

  return InnerGlobal;
}(React.Component);

var keyframes = function keyframes() {
  var insertable = css__default['default'].apply(void 0, arguments);
  var name = "animation-" + insertable.name; // $FlowFixMe

  return {
    name: name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};

var classnames = function classnames(args) {
  var len = args.length;
  var i = 0;
  var cls = '';

  for (; i < len; i++) {
    var arg = args[i];
    if (arg == null) continue;
    var toAdd = void 0;

    switch (typeof arg) {
      case 'boolean':
        break;

      case 'object':
        {
          if (Array.isArray(arg)) {
            toAdd = classnames(arg);
          } else {
            toAdd = '';

            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += ' ');
                toAdd += k;
              }
            }
          }

          break;
        }

      default:
        {
          toAdd = arg;
        }
    }

    if (toAdd) {
      cls && (cls += ' ');
      cls += toAdd;
    }
  }

  return cls;
};

function merge(registered, css, className) {
  var registeredStyles = [];
  var rawClassName = utils.getRegisteredStyles(registered, registeredStyles, className);

  if (registeredStyles.length < 2) {
    return className;
  }

  return rawClassName + css(registeredStyles);
}

var ClassNames = emotionElement.withEmotionCache(function (props, context) {
  return /*#__PURE__*/React.createElement(emotionElement.ThemeContext.Consumer, null, function (theme) {
    var rules = '';
    var serializedHashes = '';
    var hasRendered = false;

    var css = function css() {
      if (hasRendered && process.env.NODE_ENV !== 'production') {
        throw new Error('css can only be used during render');
      }

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var serialized = serialize.serializeStyles(args, context.registered);

      if (emotionElement.isBrowser) {
        utils.insertStyles(context, serialized, false);
      } else {
        var res = utils.insertStyles(context, serialized, false);

        if (res !== undefined) {
          rules += res;
        }
      }

      if (!emotionElement.isBrowser) {
        serializedHashes += " " + serialized.name;
      }

      return context.key + "-" + serialized.name;
    };

    var cx = function cx() {
      if (hasRendered && process.env.NODE_ENV !== 'production') {
        throw new Error('cx can only be used during render');
      }

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return merge(context.registered, css, classnames(args));
    };

    var content = {
      css: css,
      cx: cx,
      theme: theme
    };
    var ele = props.children(content);
    hasRendered = true;

    if (!emotionElement.isBrowser && rules.length !== 0) {
      var _ref;

      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", (_ref = {}, _ref["data-emotion-" + context.key] = serializedHashes.substring(1), _ref.dangerouslySetInnerHTML = {
        __html: rules
      }, _ref.nonce = context.sheet.nonce, _ref)), ele);
    }

    return ele;
  });
});

exports.CacheProvider = emotionElement.CacheProvider;
exports.ThemeContext = emotionElement.ThemeContext;
Object.defineProperty(exports, 'withEmotionCache', {
  enumerable: true,
  get: function () {
    return emotionElement.withEmotionCache;
  }
});
Object.defineProperty(exports, 'css', {
  enumerable: true,
  get: function () {
    return css__default['default'];
  }
});
exports.ClassNames = ClassNames;
exports.Global = Global;
exports.createElement = jsx;
exports.jsx = jsx;
exports.keyframes = keyframes;
