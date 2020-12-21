import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { usePreviousProps, deepmerge } from '@material-ui/utils';
import { BadgeUnstyled, badgeUnstyledClasses, getBadgeUtilityClass, isHostComponent } from '@material-ui/unstyled';
import styled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';

var badgeClasses = _extends({}, badgeUnstyledClasses, {
  colorError: getBadgeUtilityClass('colorError'),
  colorPrimary: getBadgeUtilityClass('colorPrimary'),
  colorSecondary: getBadgeUtilityClass('colorSecondary')
});

export { badgeClasses };
var RADIUS_STANDARD = 10;
var RADIUS_DOT = 4;

var overridesResolver = function overridesResolver(props, styles) {
  var _props$color = props.color,
      color = _props$color === void 0 ? 'default' : _props$color,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'standard' : _props$variant,
      _props$anchorOrigin = props.anchorOrigin,
      anchorOrigin = _props$anchorOrigin === void 0 ? {
    vertical: 'top',
    horizontal: 'right'
  } : _props$anchorOrigin,
      invisible = props.invisible,
      _props$overlap = props.overlap,
      overlap = _props$overlap === void 0 ? 'rectangular' : _props$overlap;
  var styleOverrides = deepmerge(styles.root, _defineProperty({}, "& .".concat(badgeClasses.badge), _extends({}, styles.badge, styles[variant], styles["anchorOrigin".concat(capitalize(anchorOrigin.vertical)).concat(capitalize(anchorOrigin.horizontal)).concat(capitalize(overlap))], color !== 'default' && styles["color".concat(capitalize(color))], invisible && styles.invisible)));
  return styleOverrides;
};

var BadgeRoot = styled('span', {}, {
  name: 'Badge',
  slot: 'Root',
  overridesResolver: overridesResolver
})({
  position: 'relative',
  display: 'inline-flex',
  // For correct alignment with the text.
  verticalAlign: 'middle',
  flexShrink: 0
});
var BadgeBadge = styled('span', {}, {
  name: 'Badge',
  slot: 'Badge',
  overridesResolver: overridesResolver
})(function (props) {
  return _extends({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    boxSizing: 'border-box',
    fontFamily: props.theme.typography.fontFamily,
    fontWeight: props.theme.typography.fontWeightMedium,
    fontSize: props.theme.typography.pxToRem(12),
    minWidth: RADIUS_STANDARD * 2,
    lineHeight: 1,
    padding: '0 6px',
    height: RADIUS_STANDARD * 2,
    borderRadius: RADIUS_STANDARD,
    zIndex: 1,
    // Render the badge on top of potential ripples.
    transition: props.theme.transitions.create('transform', {
      easing: props.theme.transitions.easing.easeInOut,
      duration: props.theme.transitions.duration.enteringScreen
    })
  }, props.styleProps.color !== 'default' && {
    backgroundColor: props.theme.palette[props.styleProps.color].main,
    color: props.theme.palette[props.styleProps.color].contrastText
  }, props.styleProps.variant === 'dot' && {
    borderRadius: RADIUS_DOT,
    height: RADIUS_DOT * 2,
    minWidth: RADIUS_DOT * 2,
    padding: 0
  }, props.styleProps.anchorOrigin.vertical === 'top' && props.styleProps.anchorOrigin.horizontal === 'right' && props.styleProps.overlap === 'rectangular' && _defineProperty({
    top: 0,
    right: 0,
    transform: 'scale(1) translate(50%, -50%)',
    transformOrigin: '100% 0%'
  }, "&.".concat(badgeClasses.invisible), {
    transform: 'scale(0) translate(50%, -50%)'
  }), props.styleProps.anchorOrigin.vertical === 'bottom' && props.styleProps.anchorOrigin.horizontal === 'right' && props.styleProps.overlap === 'rectangular' && _defineProperty({
    bottom: 0,
    right: 0,
    transform: 'scale(1) translate(50%, 50%)',
    transformOrigin: '100% 100%'
  }, "&.".concat(badgeClasses.invisible), {
    transform: 'scale(0) translate(50%, 50%)'
  }), props.styleProps.anchorOrigin.vertical === 'top' && props.styleProps.anchorOrigin.horizontal === 'left' && props.styleProps.overlap === 'rectangular' && _defineProperty({
    top: 0,
    left: 0,
    transform: 'scale(1) translate(-50%, -50%)',
    transformOrigin: '0% 0%'
  }, "&.".concat(badgeClasses.invisible), {
    transform: 'scale(0) translate(-50%, -50%)'
  }), props.styleProps.anchorOrigin.vertical === 'bottom' && props.styleProps.anchorOrigin.horizontal === 'left' && props.styleProps.overlap === 'rectangular' && _defineProperty({
    bottom: 0,
    left: 0,
    transform: 'scale(1) translate(-50%, 50%)',
    transformOrigin: '0% 100%'
  }, "&.".concat(badgeClasses.invisible), {
    transform: 'scale(0) translate(-50%, 50%)'
  }), props.styleProps.anchorOrigin.vertical === 'top' && props.styleProps.anchorOrigin.horizontal === 'right' && props.styleProps.overlap === 'circular' && _defineProperty({
    top: '14%',
    right: '14%',
    transform: 'scale(1) translate(50%, -50%)',
    transformOrigin: '100% 0%'
  }, "&.".concat(badgeClasses.invisible), {
    transform: 'scale(0) translate(50%, -50%)'
  }), props.styleProps.anchorOrigin.vertical === 'bottom' && props.styleProps.anchorOrigin.horizontal === 'right' && props.styleProps.overlap === 'circular' && _defineProperty({
    bottom: '14%',
    right: '14%',
    transform: 'scale(1) translate(50%, 50%)',
    transformOrigin: '100% 100%'
  }, "&.".concat(badgeClasses.invisible), {
    transform: 'scale(0) translate(50%, 50%)'
  }), props.styleProps.anchorOrigin.vertical === 'top' && props.styleProps.anchorOrigin.horizontal === 'left' && props.styleProps.overlap === 'circular' && _defineProperty({
    top: '14%',
    left: '14%',
    transform: 'scale(1) translate(-50%, -50%)',
    transformOrigin: '0% 0%'
  }, "&.".concat(badgeClasses.invisible), {
    transform: 'scale(0) translate(-50%, -50%)'
  }), props.styleProps.anchorOrigin.vertical === 'bottom' && props.styleProps.anchorOrigin.horizontal === 'left' && props.styleProps.overlap === 'circular' && _defineProperty({
    bottom: '14%',
    left: '14%',
    transform: 'scale(1) translate(-50%, 50%)',
    transformOrigin: '0% 100%'
  }, "&.".concat(badgeClasses.invisible), {
    transform: 'scale(0) translate(-50%, 50%)'
  }), props.styleProps.invisible && {
    transition: props.theme.transitions.create('transform', {
      easing: props.theme.transitions.easing.easeInOut,
      duration: props.theme.transitions.duration.leavingScreen
    })
  });
});

var extendBadgeClasses = function extendBadgeClasses(props) {
  var color = props.color,
      _props$classes = props.classes,
      classes = _props$classes === void 0 ? {} : _props$classes;
  return _extends({}, classes, {
    badge: clsx(classes.badge, color !== 'default' && [getBadgeUtilityClass("color".concat(capitalize(color))), classes["color".concat(capitalize(color))]])
  });
};

var Badge = /*#__PURE__*/React.forwardRef(function Badge(inputProps, ref) {
  var _componentsProps$root, _componentsProps$badg;

  var _useThemeProps = useThemeProps({
    props: inputProps,
    name: 'MuiBadge'
  }),
      isRtl = _useThemeProps.isRtl,
      props = _objectWithoutProperties(_useThemeProps, ["isRtl"]);

  var _props$components = props.components,
      components = _props$components === void 0 ? {} : _props$components,
      _props$componentsProp = props.componentsProps,
      componentsProps = _props$componentsProp === void 0 ? {} : _props$componentsProp,
      _props$color2 = props.color,
      colorProp = _props$color2 === void 0 ? 'default' : _props$color2,
      invisibleProp = props.invisible,
      badgeContentProp = props.badgeContent,
      _props$showZero = props.showZero,
      showZero = _props$showZero === void 0 ? false : _props$showZero,
      _props$variant2 = props.variant,
      variantProp = _props$variant2 === void 0 ? 'standard' : _props$variant2,
      other = _objectWithoutProperties(props, ["components", "componentsProps", "color", "invisible", "badgeContent", "showZero", "variant"]);

  var prevProps = usePreviousProps({
    color: colorProp
  });
  var invisible = invisibleProp;

  if (invisibleProp == null && (badgeContentProp === 0 && !showZero || badgeContentProp == null && variantProp !== 'dot')) {
    invisible = true;
  }

  var _ref9 = invisible ? prevProps : props,
      _ref9$color = _ref9.color,
      color = _ref9$color === void 0 ? colorProp : _ref9$color;

  var classes = extendBadgeClasses(_extends({}, props, {
    invisible: invisible,
    color: color
  }));
  return /*#__PURE__*/React.createElement(BadgeUnstyled, _extends({
    invisible: invisibleProp,
    badgeContent: badgeContentProp,
    showZero: showZero,
    variant: variantProp
  }, other, {
    components: _extends({
      Root: BadgeRoot,
      Badge: BadgeBadge
    }, components),
    componentsProps: {
      root: _extends({}, componentsProps.root, (!components.Root || !isHostComponent(components.Root)) && {
        styleProps: _extends({}, (_componentsProps$root = componentsProps.root) === null || _componentsProps$root === void 0 ? void 0 : _componentsProps$root.styleProps, {
          color: color
        })
      }),
      badge: _extends({}, componentsProps.badge, (!components.Thumb || !isHostComponent(components.Thumb)) && {
        styleProps: _extends({}, (_componentsProps$badg = componentsProps.badge) === null || _componentsProps$badg === void 0 ? void 0 : _componentsProps$badg.styleProps, {
          color: color
        })
      })
    },
    classes: classes,
    ref: ref
  }));
});
process.env.NODE_ENV !== "production" ? Badge.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The anchor of the badge.
   * @default {
   *   vertical: 'top',
   *   horizontal: 'right',
   * }
   */
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOf(['left', 'right']).isRequired,
    vertical: PropTypes.oneOf(['bottom', 'top']).isRequired
  }),

  /**
   * The content rendered within the badge.
   */
  badgeContent: PropTypes.node,

  /**
   * The badge will be added relative to this node.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   * @default {}
   */
  classes: PropTypes.object,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'default'
   */
  color: PropTypes.oneOf(['default', 'error', 'primary', 'secondary']),

  /**
   * The components used for each slot inside the Badge.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Badge: PropTypes.elementType,
    Root: PropTypes.elementType
  }),

  /**
   * The props used for each slot inside the Badge.
   * @default {}
   */
  componentsProps: PropTypes.object,

  /**
   * If `true`, the badge is invisible.
   */
  invisible: PropTypes.bool,

  /**
   * Max count to show.
   * @default 99
   */
  max: PropTypes.number,

  /**
   * Wrapped shape the badge should overlap.
   * @default 'rectangular'
   */
  overlap: PropTypes.oneOf(['circular', 'rectangular']),

  /**
   * Controls whether the badge is hidden when `badgeContent` is zero.
   * @default false
   */
  showZero: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The variant to use.
   * @default 'standard'
   */
  variant: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['dot', 'standard']), PropTypes.string])
} : void 0;
export default Badge;