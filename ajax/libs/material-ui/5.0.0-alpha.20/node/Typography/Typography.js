"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TypographyRoot = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _typographyClasses = _interopRequireWildcard(require("./typographyClasses"));

const getTextColor = (color, palette) => {
  if (color.indexOf('text') === 0) {
    return palette.text[color.split('text').pop().toLowerCase()];
  }

  if (color === 'inherit' || color === 'initial') {
    return color;
  }

  return palette[color].main;
};

const overridesResolver = (props, styles) => {
  const {
    styleProps = {}
  } = props;
  const styleOverrides = (0, _extends2.default)({}, styles.root, styleProps.variant && styles[styleProps.variant], styleProps.color && styles[`color${(0, _capitalize.default)(styleProps.color)}`], styleProps.align && styles[`align${(0, _capitalize.default)(styleProps.align)}`], styleProps.display && styles[`display${(0, _capitalize.default)(styleProps.display)}`], styleProps.noWrap && styles.noWrap, styleProps.gutterBottom && styles.gutterBottom, styleProps.paragraph && styles.paragraph);
  return styleOverrides;
};

const TypographyRoot = (0, _experimentalStyled.default)('span', {}, {
  name: 'Typography',
  slot: 'Root',
  overridesResolver
})(props => (0, _extends2.default)({
  margin: 0
}, props.styleProps.variant && props.theme.typography[props.styleProps.variant], props.styleProps.align !== 'inherit' && {
  textAlign: props.styleProps.align
}, props.styleProps.noWrap && {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}, props.styleProps.gutterBottom && {
  marginBottom: '0.35em'
}, props.styleProps.paragraph && {
  marginBottom: 16
}, props.styleProps.color && props.styleProps.color !== 'initial' && {
  color: getTextColor(props.styleProps.color, props.theme.palette)
}, props.styleProps.display !== 'initial' && {
  display: props.styleProps.display
}));
exports.TypographyRoot = TypographyRoot;
const defaultVariantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  inherit: 'p'
};

const useTypographyClasses = props => {
  const {
    align,
    color,
    display,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    classes = {}
  } = props;
  const utilityClasses = {
    root: (0, _clsx.default)(_typographyClasses.default['root'], classes['root'], (0, _typographyClasses.getTypographyUtilityClass)(`color${(0, _capitalize.default)(color)}`), classes[`color${(0, _capitalize.default)(color)}`], _typographyClasses.default[`align${(0, _capitalize.default)(align)}`], classes[`align${(0, _capitalize.default)(align)}`], _typographyClasses.default[`display${(0, _capitalize.default)(display)}`], classes[`display${(0, _capitalize.default)(display)}`], (0, _typographyClasses.getTypographyUtilityClass)(variant), classes[variant], gutterBottom && [_typographyClasses.default['gutterBottom'], classes['gutterBottom']], noWrap && [_typographyClasses.default['noWrap'], classes['noWrap']], paragraph && [_typographyClasses.default['paragraph'], classes['paragraph']])
  };
  return utilityClasses;
};

const Typography = /*#__PURE__*/React.forwardRef(function Typography(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiTypography'
  });
  const {
    align = 'inherit',
    className,
    color = 'initial',
    component,
    display = 'initial',
    gutterBottom = false,
    noWrap = false,
    paragraph = false,
    variant = 'body1',
    variantMapping = defaultVariantMapping
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["align", "className", "color", "component", "display", "gutterBottom", "noWrap", "paragraph", "variant", "variantMapping"]);
  const stateAndProps = (0, _extends2.default)({}, props, {
    align,
    className,
    color,
    component,
    display,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    variantMapping
  });
  const Component = component || (paragraph ? 'p' : variantMapping[variant] || defaultVariantMapping[variant]) || 'span';
  const classes = useTypographyClasses(stateAndProps);
  return /*#__PURE__*/React.createElement(TypographyRoot, (0, _extends2.default)({
    as: Component,
    ref: ref,
    styleProps: stateAndProps,
    className: (0, _clsx.default)(classes.root, className)
  }, other));
});
process.env.NODE_ENV !== "production" ? Typography.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Set the text-align on the component.
   * @default 'inherit'
   */
  align: _propTypes.default.oneOf(['center', 'inherit', 'justify', 'left', 'right']),

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
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'initial'
   */
  color: _propTypes.default.oneOf(['error', 'inherit', 'initial', 'primary', 'secondary', 'textPrimary', 'textSecondary']),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * Controls the display type
   * @default 'initial'
   */
  display: _propTypes.default.oneOf(['block', 'initial', 'inline']),

  /**
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  gutterBottom: _propTypes.default.bool,

  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   * @default false
   */
  noWrap: _propTypes.default.bool,

  /**
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  paragraph: _propTypes.default.bool,

  /**
   * Applies the theme typography styles.
   * @default 'body1'
   */
  variant: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['body1', 'body2', 'button', 'caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'inherit', 'overline', 'subtitle1', 'subtitle2']), _propTypes.default.string]),

  /**
   * The component maps the variant prop to a range of different HTML element types.
   * For instance, subtitle1 to `<h6>`.
   * If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` prop.
   * @default {
   *   h1: 'h1',
   *   h2: 'h2',
   *   h3: 'h3',
   *   h4: 'h4',
   *   h5: 'h5',
   *   h6: 'h6',
   *   subtitle1: 'h6',
   *   subtitle2: 'h6',
   *   body1: 'p',
   *   body2: 'p',
   *   inherit: 'p',
   * }
   */
  variantMapping: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .object
} : void 0;
var _default = Typography;
exports.default = _default;