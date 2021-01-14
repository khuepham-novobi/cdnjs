"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = exports.body = exports.html = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("@material-ui/utils");

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _GlobalStyles = _interopRequireDefault(require("../GlobalStyles"));

const html = {
  WebkitFontSmoothing: 'antialiased',
  // Antialiasing.
  MozOsxFontSmoothing: 'grayscale',
  // Antialiasing.
  // Change from `box-sizing: content-box` so that `width`
  // is not affected by `padding` or `border`.
  boxSizing: 'border-box',
  // Fix font resize problem in iOS
  WebkitTextSizeAdjust: '100%'
}; // track, thumb and active are derieved from macOS 10.15.7

exports.html = html;
const scrollBar = {
  track: '#2b2b2b',
  thumb: '#6b6b6b',
  active: '#959595'
};

const body = theme => (0, _extends2.default)({
  color: theme.palette.text.primary
}, theme.typography.body1, {
  backgroundColor: theme.palette.background.default,
  '@media print': {
    // Save printer ink.
    backgroundColor: theme.palette.common.white
  }
}, theme.palette.mode === 'dark' ? {
  scrollbarColor: `${scrollBar.thumb} ${scrollBar.track}`,
  '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
    backgroundColor: scrollBar.track
  },
  '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
    borderRadius: 8,
    backgroundColor: scrollBar.thumb,
    minHeight: 24,
    border: `3px solid ${scrollBar.track}`
  },
  '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
    backgroundColor: scrollBar.active
  },
  '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
    backgroundColor: scrollBar.active
  },
  '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
    backgroundColor: scrollBar.active
  },
  '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
    backgroundColor: scrollBar.track
  }
} : {});

exports.body = body;

const styles = theme => {
  var _theme$components, _theme$components$Mui;

  const defaultStyles = {
    html,
    '*, *::before, *::after': {
      boxSizing: 'inherit'
    },
    'strong, b': {
      fontWeight: theme.typography.fontWeightBold
    },
    body: (0, _extends2.default)({
      margin: 0
    }, body(theme), {
      // Add support for document.body.requestFullScreen().
      // Other elements, if background transparent, are not supported.
      '&::backdrop': {
        backgroundColor: theme.palette.background.default
      }
    })
  };
  const themeOverrides = (_theme$components = theme.components) === null || _theme$components === void 0 ? void 0 : (_theme$components$Mui = _theme$components.MuiCssBaseline) === null || _theme$components$Mui === void 0 ? void 0 : _theme$components$Mui.styleOverrides;

  if (themeOverrides) {
    return (0, _utils.deepmerge)(defaultStyles, themeOverrides);
  }

  return defaultStyles;
};
/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */


exports.styles = styles;

var _ref = /*#__PURE__*/React.createElement(_GlobalStyles.default, {
  styles: styles
});

function CssBaseline(inProps) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiCssBaseline'
  });
  const {
    children
  } = props;
  return /*#__PURE__*/React.createElement(React.Fragment, null, _ref, children);
}

process.env.NODE_ENV !== "production" ? CssBaseline.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * You can wrap a node.
   */
  children: _propTypes.default.node
} : void 0;
var _default = CssBaseline;
exports.default = _default;