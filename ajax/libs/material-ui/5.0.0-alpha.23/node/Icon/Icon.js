"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    userSelect: 'none',
    fontSize: theme.typography.pxToRem(24),
    width: '1em',
    height: '1em',
    // Chrome fix for https://bugs.chromium.org/p/chromium/issues/detail?id=820541
    // To remove at some point.
    overflow: 'hidden',
    display: 'inline-block',
    // allow overflow hidden to take action
    textAlign: 'center',
    // support non-square icon
    flexShrink: 0
  },

  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    color: theme.palette.primary.main
  },

  /* Styles applied to the root element if `color="secondary"`. */
  colorSecondary: {
    color: theme.palette.secondary.main
  },

  /* Styles applied to the root element if `color="action"`. */
  colorAction: {
    color: theme.palette.action.active
  },

  /* Styles applied to the root element if `color="error"`. */
  colorError: {
    color: theme.palette.error.main
  },

  /* Styles applied to the root element if `color="disabled"`. */
  colorDisabled: {
    color: theme.palette.action.disabled
  },

  /* Styles applied to the root element if `fontSize="inherit"`. */
  fontSizeInherit: {
    fontSize: 'inherit'
  },

  /* Styles applied to the root element if `fontSize="small"`. */
  fontSizeSmall: {
    fontSize: theme.typography.pxToRem(20)
  },

  /* Styles applied to the root element if `fontSize="large"`. */
  fontSizeLarge: {
    fontSize: theme.typography.pxToRem(36)
  }
});

exports.styles = styles;
const Icon = /*#__PURE__*/React.forwardRef(function Icon(props, ref) {
  const {
    baseClassName = 'material-icons',
    classes,
    className,
    color = 'inherit',
    component: Component = 'span',
    fontSize = 'medium'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["baseClassName", "classes", "className", "color", "component", "fontSize"]);
  return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({
    className: (0, _clsx.default)(baseClassName, // Prevent the translation of the text content.
    // The font relies on the exact text content to render the icon.
    'notranslate', classes.root, className, color !== 'inherit' && classes[`color${(0, _capitalize.default)(color)}`], fontSize !== 'medium' && classes[`fontSize${(0, _capitalize.default)(fontSize)}`]),
    "aria-hidden": true,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? Icon.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The base class applied to the icon. Defaults to 'material-icons', but can be changed to any
   * other base class that suits the icon font you're using (e.g. material-icons-rounded, fas, etc).
   * @default 'material-icons'
   */
  baseClassName: _propTypes.default.string,

  /**
   * The name of the icon font ligature.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'inherit'
   */
  color: _propTypes.default.oneOf(['action', 'disabled', 'error', 'inherit', 'primary', 'secondary']),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: _propTypes.default.oneOf(['inherit', 'large', 'medium', 'small'])
} : void 0;
Icon.muiName = 'Icon';

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiIcon'
})(Icon);

exports.default = _default;