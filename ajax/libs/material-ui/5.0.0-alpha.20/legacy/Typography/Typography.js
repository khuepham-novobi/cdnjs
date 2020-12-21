import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';
import typographyClasses, { getTypographyUtilityClass } from './typographyClasses';

var getTextColor = function getTextColor(color, palette) {
  if (color.indexOf('text') === 0) {
    return palette.text[color.split('text').pop().toLowerCase()];
  }

  if (color === 'inherit' || color === 'initial') {
    return color;
  }

  return palette[color].main;
};

var overridesResolver = function overridesResolver(props, styles) {
  var _props$styleProps = props.styleProps,
      styleProps = _props$styleProps === void 0 ? {} : _props$styleProps;

  var styleOverrides = _extends({}, styles.root, styleProps.variant && styles[styleProps.variant], styleProps.color && styles["color".concat(capitalize(styleProps.color))], styleProps.align && styles["align".concat(capitalize(styleProps.align))], styleProps.display && styles["display".concat(capitalize(styleProps.display))], styleProps.noWrap && styles.noWrap, styleProps.gutterBottom && styles.gutterBottom, styleProps.paragraph && styles.paragraph);

  return styleOverrides;
};

export var TypographyRoot = experimentalStyled('span', {}, {
  name: 'Typography',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (props) {
  return _extends({
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
  });
});
var defaultVariantMapping = {
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

var useTypographyClasses = function useTypographyClasses(props) {
  var align = props.align,
      color = props.color,
      display = props.display,
      gutterBottom = props.gutterBottom,
      noWrap = props.noWrap,
      paragraph = props.paragraph,
      variant = props.variant,
      _props$classes = props.classes,
      classes = _props$classes === void 0 ? {} : _props$classes;
  var utilityClasses = {
    root: clsx(typographyClasses['root'], classes['root'], getTypographyUtilityClass("color".concat(capitalize(color))), classes["color".concat(capitalize(color))], typographyClasses["align".concat(capitalize(align))], classes["align".concat(capitalize(align))], typographyClasses["display".concat(capitalize(display))], classes["display".concat(capitalize(display))], getTypographyUtilityClass(variant), classes[variant], gutterBottom && [typographyClasses['gutterBottom'], classes['gutterBottom']], noWrap && [typographyClasses['noWrap'], classes['noWrap']], paragraph && [typographyClasses['paragraph'], classes['paragraph']])
  };
  return utilityClasses;
};

var Typography = /*#__PURE__*/React.forwardRef(function Typography(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiTypography'
  });

  var _props$align = props.align,
      align = _props$align === void 0 ? 'inherit' : _props$align,
      className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'initial' : _props$color,
      component = props.component,
      _props$display = props.display,
      display = _props$display === void 0 ? 'initial' : _props$display,
      _props$gutterBottom = props.gutterBottom,
      gutterBottom = _props$gutterBottom === void 0 ? false : _props$gutterBottom,
      _props$noWrap = props.noWrap,
      noWrap = _props$noWrap === void 0 ? false : _props$noWrap,
      _props$paragraph = props.paragraph,
      paragraph = _props$paragraph === void 0 ? false : _props$paragraph,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'body1' : _props$variant,
      _props$variantMapping = props.variantMapping,
      variantMapping = _props$variantMapping === void 0 ? defaultVariantMapping : _props$variantMapping,
      other = _objectWithoutProperties(props, ["align", "className", "color", "component", "display", "gutterBottom", "noWrap", "paragraph", "variant", "variantMapping"]);

  var stateAndProps = _extends({}, props, {
    align: align,
    className: className,
    color: color,
    component: component,
    display: display,
    gutterBottom: gutterBottom,
    noWrap: noWrap,
    paragraph: paragraph,
    variant: variant,
    variantMapping: variantMapping
  });

  var Component = component || (paragraph ? 'p' : variantMapping[variant] || defaultVariantMapping[variant]) || 'span';
  var classes = useTypographyClasses(stateAndProps);
  return /*#__PURE__*/React.createElement(TypographyRoot, _extends({
    as: Component,
    ref: ref,
    styleProps: stateAndProps,
    className: clsx(classes.root, className)
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
  align: PropTypes.oneOf(['center', 'inherit', 'justify', 'left', 'right']),

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'initial'
   */
  color: PropTypes.oneOf(['error', 'inherit', 'initial', 'primary', 'secondary', 'textPrimary', 'textSecondary']),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * Controls the display type
   * @default 'initial'
   */
  display: PropTypes.oneOf(['block', 'initial', 'inline']),

  /**
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  gutterBottom: PropTypes.bool,

  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   * @default false
   */
  noWrap: PropTypes.bool,

  /**
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  paragraph: PropTypes.bool,

  /**
   * Applies the theme typography styles.
   * @default 'body1'
   */
  variant: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['body1', 'body2', 'button', 'caption', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'inherit', 'overline', 'subtitle1', 'subtitle2']), PropTypes.string]),

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
  variantMapping: PropTypes
  /* @typescript-to-proptypes-ignore */
  .object
} : void 0;
export default Typography;