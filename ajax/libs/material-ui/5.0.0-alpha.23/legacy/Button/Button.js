import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import { alpha } from '../styles/colorManipulator';
import ButtonBase from '../ButtonBase';
import capitalize from '../utils/capitalize';
import buttonClasses, { getButtonUtilityClass } from './buttonClasses';

var overridesResolver = function overridesResolver(props, styles) {
  var _extends2;

  var styleProps = props.styleProps;
  return deepmerge(styles.root || {}, _extends({}, styles[styleProps.variant], styles["".concat(styleProps.variant).concat(capitalize(styleProps.color))], styles["size".concat(capitalize(styleProps.size))], styles["".concat(styleProps.variant, "Size").concat(capitalize(styleProps.size))], styleProps.color === 'inherit' && styles.colorInherit, styleProps.disableElevation && styles.disableElevation, styleProps.fullWidth && styles.fullWidth, (_extends2 = {}, _defineProperty(_extends2, "& .".concat(buttonClasses.label), styles.label), _defineProperty(_extends2, "& .".concat(buttonClasses.startIcon), _extends({}, styles.startIcon, styles["iconSize".concat(capitalize(styleProps.size))])), _defineProperty(_extends2, "& .".concat(buttonClasses.endIcon), _extends({}, styles.endIcon, styles["iconSize".concat(capitalize(styleProps.size))])), _extends2)));
};

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var color = styleProps.color,
      disableElevation = styleProps.disableElevation,
      fullWidth = styleProps.fullWidth,
      size = styleProps.size,
      variant = styleProps.variant,
      _styleProps$classes = styleProps.classes,
      classes = _styleProps$classes === void 0 ? {} : _styleProps$classes;
  var slots = {
    root: ['root', variant, "".concat(variant).concat(capitalize(color)), "size".concat(capitalize(size)), "".concat(variant, "Size").concat(capitalize(size)), color === 'inherit' && 'colorInherit', disableElevation && 'disableElevation', fullWidth && 'fullWidth'],
    label: ['label'],
    startIcon: ['startIcon', "iconSize".concat(capitalize(size))],
    endIcon: ['endIcon', "iconSize".concat(capitalize(size))]
  };
  return composeClasses({
    slots: slots,
    classes: classes,
    getUtilityClass: getButtonUtilityClass
  });
};

var commonIconStyles = function commonIconStyles(styleProps) {
  return _extends({}, styleProps.size === 'small' && {
    '& > *:nth-of-type(1)': {
      fontSize: 18
    }
  }, styleProps.size === 'medium' && {
    '& > *:nth-of-type(1)': {
      fontSize: 20
    }
  }, styleProps.size === 'large' && {
    '& > *:nth-of-type(1)': {
      fontSize: 22
    }
  });
};

var ButtonRoot = experimentalStyled(ButtonBase, {}, {
  name: 'MuiButton',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({}, theme.typography.button, {
    minWidth: 64,
    padding: '6px 16px',
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color', 'color'], {
      duration: theme.transitions.duration.short
    }),
    '&:hover': _extends({
      textDecoration: 'none',
      backgroundColor: alpha(theme.palette.text.primary, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }, styleProps.variant === 'text' && styleProps.color !== 'inherit' && {
      backgroundColor: alpha(theme.palette[styleProps.color].main, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }, styleProps.variant === 'outlined' && styleProps.color !== 'inherit' && {
      border: "1px solid ".concat(theme.palette[styleProps.color].main),
      backgroundColor: alpha(theme.palette[styleProps.color].main, theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }, styleProps.variant === 'contained' && {
      backgroundColor: theme.palette.grey.A100,
      boxShadow: theme.shadows[4],
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: theme.shadows[2],
        backgroundColor: theme.palette.grey[300]
      }
    }, styleProps.variant === 'contained' && styleProps.color !== 'inherit' && {
      backgroundColor: theme.palette[styleProps.color].dark,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.palette[styleProps.color].main
      }
    }),
    '&:active': _extends({}, styleProps.variant === 'contained' && {
      boxShadow: theme.shadows[8]
    }),
    '&.Mui-focusVisible': _extends({}, styleProps.variant === 'contained' && {
      boxShadow: theme.shadows[6]
    }),
    '&.Mui-disabled': _extends({
      color: theme.palette.action.disabled
    }, styleProps.variant === 'outlined' && {
      border: "1px solid ".concat(theme.palette.action.disabledBackground)
    }, styleProps.variant === 'outlined' && styleProps.color === 'secondary' && {
      border: "1px solid ".concat(theme.palette.action.disabled)
    }, styleProps.variant === 'contained' && {
      color: theme.palette.action.disabled,
      boxShadow: theme.shadows[0],
      backgroundColor: theme.palette.action.disabledBackground
    })
  }, styleProps.variant === 'text' && {
    padding: '6px 8px'
  }, styleProps.variant === 'text' && styleProps.color !== 'inherit' && {
    color: theme.palette[styleProps.color].main
  }, styleProps.variant === 'outlined' && {
    padding: '5px 15px',
    border: "1px solid ".concat(theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)')
  }, styleProps.variant === 'outlined' && styleProps.color !== 'inherit' && {
    color: theme.palette[styleProps.color].main,
    border: "1px solid ".concat(alpha(theme.palette[styleProps.color].main, 0.5))
  }, styleProps.variant === 'contained' && {
    color: theme.palette.getContrastText(theme.palette.grey[300]),
    backgroundColor: theme.palette.grey[300],
    boxShadow: theme.shadows[2]
  }, styleProps.variant === 'contained' && styleProps.color !== 'inherit' && {
    color: theme.palette[styleProps.color].contrastText,
    backgroundColor: theme.palette[styleProps.color].main
  }, styleProps.color === 'inherit' && {
    color: 'inherit',
    borderColor: 'currentColor'
  }, styleProps.size === 'small' && styleProps.variant === 'text' && {
    padding: '4px 5px',
    fontSize: theme.typography.pxToRem(13)
  }, styleProps.size === 'large' && styleProps.variant === 'text' && {
    padding: '8px 11px',
    fontSize: theme.typography.pxToRem(15)
  }, styleProps.size === 'small' && styleProps.variant === 'outlined' && {
    padding: '3px 9px',
    fontSize: theme.typography.pxToRem(13)
  }, styleProps.size === 'large' && styleProps.variant === 'outlined' && {
    padding: '7px 21px',
    fontSize: theme.typography.pxToRem(15)
  }, styleProps.size === 'small' && styleProps.variant === 'contained' && {
    padding: '4px 10px',
    fontSize: theme.typography.pxToRem(13)
  }, styleProps.size === 'large' && styleProps.variant === 'contained' && {
    padding: '8px 22px',
    fontSize: theme.typography.pxToRem(15)
  }, styleProps.fullWidth && {
    width: '100%'
  });
}, function (_ref2) {
  var styleProps = _ref2.styleProps;
  return styleProps.disableElevation && {
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none'
    },
    '&.Mui-focusVisible': {
      boxShadow: 'none'
    },
    '&:active': {
      boxShadow: 'none'
    },
    '&.Mui-disabled': {
      boxShadow: 'none'
    }
  };
});
var ButtonLabel = experimentalStyled('span', {}, {
  name: 'MuiButton',
  slot: 'Label'
})({
  width: '100%',
  // Ensure the correct width for iOS Safari
  display: 'inherit',
  alignItems: 'inherit',
  justifyContent: 'inherit'
});
var ButtonStartIcon = experimentalStyled('span', {}, {
  name: 'MuiButton',
  slot: 'StartIcon'
})(function (_ref3) {
  var styleProps = _ref3.styleProps;
  return _extends({
    display: 'inherit',
    marginRight: 8,
    marginLeft: -4
  }, styleProps.size === 'small' && {
    marginLeft: -2
  }, commonIconStyles(styleProps));
});
var ButtonEndIcon = experimentalStyled('span', {}, {
  name: 'MuiButton',
  slot: 'EndIcon'
})(function (_ref4) {
  var styleProps = _ref4.styleProps;
  return _extends({
    display: 'inherit',
    marginRight: -4,
    marginLeft: 8
  }, styleProps.size === 'small' && {
    marginRight: -2
  }, commonIconStyles(styleProps));
});
var Button = /*#__PURE__*/React.forwardRef(function Button(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiButton'
  });

  var children = props.children,
      className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'primary' : _props$color,
      _props$component = props.component,
      component = _props$component === void 0 ? 'button' : _props$component,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$disableElevati = props.disableElevation,
      disableElevation = _props$disableElevati === void 0 ? false : _props$disableElevati,
      _props$disableFocusRi = props.disableFocusRipple,
      disableFocusRipple = _props$disableFocusRi === void 0 ? false : _props$disableFocusRi,
      endIconProp = props.endIcon,
      focusVisibleClassName = props.focusVisibleClassName,
      _props$fullWidth = props.fullWidth,
      fullWidth = _props$fullWidth === void 0 ? false : _props$fullWidth,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      startIconProp = props.startIcon,
      type = props.type,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'text' : _props$variant,
      other = _objectWithoutProperties(props, ["children", "className", "color", "component", "disabled", "disableElevation", "disableFocusRipple", "endIcon", "focusVisibleClassName", "fullWidth", "size", "startIcon", "type", "variant"]);

  var styleProps = _extends({}, props, {
    color: color,
    component: component,
    disabled: disabled,
    disableElevation: disableElevation,
    disableFocusRipple: disableFocusRipple,
    fullWidth: fullWidth,
    size: size,
    type: type,
    variant: variant
  });

  var classes = useUtilityClasses(styleProps);
  var startIcon = startIconProp && /*#__PURE__*/React.createElement(ButtonStartIcon, {
    className: classes.startIcon,
    styleProps: styleProps
  }, startIconProp);
  var endIcon = endIconProp && /*#__PURE__*/React.createElement(ButtonEndIcon, {
    className: classes.endIcon,
    styleProps: styleProps
  }, endIconProp);
  return /*#__PURE__*/React.createElement(ButtonRoot, _extends({
    className: clsx(classes.root, className),
    styleProps: styleProps,
    component: component,
    disabled: disabled,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
    ref: ref,
    type: type
  }, other), /*#__PURE__*/React.createElement(ButtonLabel, {
    className: classes.label
  }, startIcon, children, endIcon));
});
process.env.NODE_ENV !== "production" ? Button.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

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
   * @default 'primary'
   */
  color: PropTypes.oneOf(['inherit', 'primary', 'secondary']),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: PropTypes.bool,

  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,

  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusedVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,

  /**
   * Element placed after the children.
   */
  endIcon: PropTypes.node,

  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,

  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,

  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: PropTypes.string,

  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['large', 'medium', 'small']),

  /**
   * Element placed before the children.
   */
  startIcon: PropTypes.node,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * @ignore
   */
  type: PropTypes.oneOfType([PropTypes.oneOf(['button', 'reset', 'submit']), PropTypes.string]),

  /**
   * The variant to use.
   * @default 'text'
   */
  variant: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['contained', 'outlined', 'text']), PropTypes.string])
} : void 0;
export default Button;