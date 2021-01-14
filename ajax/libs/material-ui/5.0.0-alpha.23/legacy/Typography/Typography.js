import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';
import { getTypographyUtilityClass } from './typographyClasses';

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
  var styleProps = props.styleProps;
  return deepmerge(styles.root || {}, _extends({}, styleProps.variant && styles[styleProps.variant], styleProps.color && styles["color".concat(capitalize(styleProps.color))], styleProps.align && styles["align".concat(capitalize(styleProps.align))], styleProps.display && styles["display".concat(capitalize(styleProps.display))], styleProps.noWrap && styles.noWrap, styleProps.gutterBottom && styles.gutterBottom, styleProps.paragraph && styles.paragraph));
};

export var TypographyRoot = experimentalStyled('span', {}, {
  name: 'MuiTypography',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({
    margin: 0
  }, styleProps.variant && theme.typography[styleProps.variant], styleProps.align !== 'inherit' && {
    textAlign: styleProps.align
  }, styleProps.noWrap && {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }, styleProps.gutterBottom && {
    marginBottom: '0.35em'
  }, styleProps.paragraph && {
    marginBottom: 16
  }, styleProps.color && styleProps.color !== 'initial' && {
    color: getTextColor(styleProps.color, theme.palette)
  }, styleProps.display !== 'initial' && {
    display: styleProps.display
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

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var align = styleProps.align,
      color = styleProps.color,
      display = styleProps.display,
      gutterBottom = styleProps.gutterBottom,
      noWrap = styleProps.noWrap,
      paragraph = styleProps.paragraph,
      variant = styleProps.variant,
      classes = styleProps.classes;
  var slots = {
    root: ['root', variant, "color".concat(capitalize(color)), "align".concat(capitalize(align)), "display".concat(capitalize(display)), gutterBottom && 'gutterBottom', noWrap && 'noWrap', paragraph && 'paragraph']
  };
  return composeClasses({
    slots: slots,
    classes: classes,
    getUtilityClass: getTypographyUtilityClass
  });
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

  var styleProps = _extends({}, props, {
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
  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/React.createElement(TypographyRoot, _extends({
    as: Component,
    ref: ref,
    styleProps: styleProps,
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

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