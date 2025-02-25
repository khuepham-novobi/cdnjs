"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/utils");

var _unstyled = require("@material-ui/unstyled");

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _useIsFocusVisible = _interopRequireDefault(require("../utils/useIsFocusVisible"));

var _useForkRef = _interopRequireDefault(require("../utils/useForkRef"));

var _Typography = _interopRequireDefault(require("../Typography"));

var _linkClasses = _interopRequireWildcard(require("./linkClasses"));

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return (0, _utils.deepmerge)(styles.root || {}, (0, _extends2.default)({}, styles[`underline${(0, _capitalize.default)(styleProps.underline)}`], styleProps.component === 'button' && styles.button));
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    component,
    focusVisible,
    underline
  } = styleProps;
  const slots = {
    root: ['root', `underline${(0, _capitalize.default)(underline)}`, component === 'button' && 'button', focusVisible && 'focusVisible']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _linkClasses.getLinkUtilityClass, classes);
};

const LinkRoot = (0, _experimentalStyled.default)(_Typography.default, {}, {
  name: 'MuiLink',
  slot: 'Root',
  overridesResolver
})(({
  styleProps
}) => {
  return (0, _extends2.default)({}, styleProps.underline === 'none' && {
    textDecoration: 'none'
  }, styleProps.underline === 'hover' && {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  }, styleProps.underline === 'always' && {
    textDecoration: 'underline'
  }, styleProps.component === 'button' && {
    position: 'relative',
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent',
    // Reset default value
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
    border: 0,
    margin: 0,
    // Remove the margin in Safari
    borderRadius: 0,
    padding: 0,
    // Remove the padding in Firefox
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    '-moz-appearance': 'none',
    // Reset
    '-webkit-appearance': 'none',
    // Reset
    '&::-moz-focus-inner': {
      borderStyle: 'none' // Remove Firefox dotted outline.

    },
    [`&.${_linkClasses.default.focusVisible}`]: {
      outline: 'auto'
    }
  });
});
const Link = /*#__PURE__*/React.forwardRef(function Link(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiLink'
  });
  const {
    className,
    color = 'primary',
    component = 'a',
    onBlur,
    onFocus,
    TypographyClasses,
    underline = 'hover',
    variant = 'inherit'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["className", "color", "component", "onBlur", "onFocus", "TypographyClasses", "underline", "variant"]);
  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = (0, _useIsFocusVisible.default)();
  const [focusVisible, setFocusVisible] = React.useState(false);
  const handlerRef = (0, _useForkRef.default)(ref, focusVisibleRef);

  const handleBlur = event => {
    handleBlurVisible(event);

    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }

    if (onBlur) {
      onBlur(event);
    }
  };

  const handleFocus = event => {
    handleFocusVisible(event);

    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
    }

    if (onFocus) {
      onFocus(event);
    }
  };

  const styleProps = (0, _extends2.default)({}, props, {
    color,
    component,
    focusVisible,
    underline,
    variant
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/React.createElement(LinkRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    classes: TypographyClasses,
    color: color,
    component: component,
    onBlur: handleBlur,
    onFocus: handleFocus,
    ref: handlerRef,
    styleProps: styleProps,
    variant: variant
  }, other));
});
process.env.NODE_ENV !== "production" ? Link.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
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
   * The color of the link.
   * @default 'primary'
   */
  color: _propTypes.default.oneOf(['error', 'inherit', 'initial', 'primary', 'secondary', 'textPrimary', 'textSecondary']),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _utils.elementTypeAcceptingRef,

  /**
   * @ignore
   */
  onBlur: _propTypes.default.func,

  /**
   * @ignore
   */
  onFocus: _propTypes.default.func,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * `classes` prop applied to the [`Typography`](/api/typography/) element.
   */
  TypographyClasses: _propTypes.default.object,

  /**
   * Controls when the link should have an underline.
   * @default 'hover'
   */
  underline: _propTypes.default.oneOf(['always', 'hover', 'none']),

  /**
   * Applies the theme typography styles.
   * @default 'inherit'
   */
  variant: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['body1', 'body2', 'button', 'caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'inherit', 'overline', 'subtitle1', 'subtitle2']), _propTypes.default.string])
} : void 0;
var _default = Link;
exports.default = _default;