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

var _unstyled = require("@material-ui/unstyled");

var _utils = require("@material-ui/utils");

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

var _svgIconClasses = require("./svgIconClasses");

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return (0, _utils.deepmerge)(styles.root || {}, (0, _extends2.default)({}, styleProps.color !== 'inherit' && styles[`color${(0, _capitalize.default)(styleProps.color)}`], styles[`fontSize${(0, _capitalize.default)(styleProps.fontSize)}`]));
};

const useUtilityClasses = styleProps => {
  const {
    color,
    fontSize,
    classes
  } = styleProps;
  const slots = {
    root: ['root', color !== 'inherit' && `color${(0, _capitalize.default)(color)}`, `fontSize${(0, _capitalize.default)(fontSize)}`]
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _svgIconClasses.getSvgIconUtilityClass, classes);
};

const SvgIconRoot = (0, _experimentalStyled.default)('svg', {}, {
  name: 'MuiSvgIcon',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  styleProps
}) => ({
  /* Styles applied to the root element. */
  userSelect: 'none',
  width: '1em',
  height: '1em',
  display: 'inline-block',
  fill: 'currentColor',
  flexShrink: 0,
  transition: theme.transitions.create('fill', {
    duration: theme.transitions.duration.shorter
  }),
  fontSize: {
    inherit: 'inherit',
    small: theme.typography.pxToRem(20),
    medium: theme.typography.pxToRem(24),
    large: theme.typography.pxToRem(35)
  }[styleProps.fontSize],
  // TODO v5 deprecate, v6 remove for sx
  color: {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    action: theme.palette.action.active,
    error: theme.palette.error.main,
    disabled: theme.palette.action.disabled,
    inherit: undefined
  }[styleProps.color]
}));
const SvgIcon = /*#__PURE__*/React.forwardRef(function SvgIcon(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiSvgIcon'
  });
  const {
    children,
    className,
    color = 'inherit',
    component = 'svg',
    fontSize = 'medium',
    htmlColor,
    titleAccess,
    viewBox = '0 0 24 24'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["children", "className", "color", "component", "fontSize", "htmlColor", "titleAccess", "viewBox"]);
  const styleProps = (0, _extends2.default)({}, props, {
    color,
    component,
    fontSize,
    viewBox
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/React.createElement(SvgIconRoot, (0, _extends2.default)({
    as: component,
    className: (0, _clsx.default)(classes.root, className),
    styleProps: styleProps,
    focusable: "false",
    viewBox: viewBox,
    color: htmlColor,
    "aria-hidden": titleAccess ? undefined : true,
    role: titleAccess ? 'img' : undefined,
    ref: ref
  }, other), children, titleAccess ? /*#__PURE__*/React.createElement("title", null, titleAccess) : null);
});
process.env.NODE_ENV !== "production" ? SvgIcon.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Node passed into the SVG element.
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
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
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
  fontSize: _propTypes.default.oneOf(['inherit', 'large', 'medium', 'small']),

  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: _propTypes.default.string,

  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: _propTypes.default.string,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: _propTypes.default.string,

  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: _propTypes.default.string
} : void 0;
SvgIcon.muiName = 'SvgIcon';
var _default = SvgIcon;
exports.default = _default;