import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import { alpha } from '../styles/colorManipulator';
import ButtonBase from '../ButtonBase';
import capitalize from '../utils/capitalize';
import buttonClasses, { getButtonUtilityClass } from './buttonClasses';

const overridesResolver = (props, styles) => {
  const {
    color = 'primary',
    disableElevation = false,
    fullWidth = false,
    size = 'medium',
    variant = 'text'
  } = props;
  return deepmerge(styles.root || {}, _extends({}, styles[variant], styles[`${variant}${capitalize(color)}`], styles[`size${capitalize(size)}`], styles[`${variant}Size${capitalize(size)}`], color === 'inherit' && styles.colorInherit, disableElevation && styles.disableElevation, fullWidth && styles.fullWidth, {
    [`& .${buttonClasses.label}`]: styles.label,
    [`& .${buttonClasses.startIcon}`]: _extends({}, styles.startIcon, styles[`iconSize${capitalize(size)}`]),
    [`& .${buttonClasses.endIcon}`]: _extends({}, styles.endIcon, styles[`iconSize${capitalize(size)}`])
  }));
};

const useUtilityClasses = styleProps => {
  const {
    color,
    disableElevation,
    fullWidth,
    size,
    variant,
    classes = {}
  } = styleProps;
  return {
    root: clsx(buttonClasses.root, classes.root, getButtonUtilityClass(variant), classes[variant], getButtonUtilityClass(`${variant}${capitalize(color)}`), classes[`${variant}${capitalize(color)}`], getButtonUtilityClass(`size${capitalize(size)}`), classes[`size${capitalize(size)}`], getButtonUtilityClass(`${variant}Size${capitalize(size)}`), classes[`${variant}Size${capitalize(size)}`], disableElevation && [buttonClasses.disableElevation, classes.disableElevation], fullWidth && [buttonClasses.fullWidth, classes.fullWidth], color === 'inherit' && [buttonClasses.colorInherit, classes.colorInherit]),
    label: clsx(buttonClasses.label, classes.label),
    startIcon: clsx(buttonClasses.startIcon, classes.startIcon, getButtonUtilityClass(`iconSize${capitalize(size)}`)),
    endIcon: clsx(buttonClasses.endIcon, classes.endIcon, getButtonUtilityClass(`iconSize${capitalize(size)}`))
  };
};

const commonIconStyles = styleProps => _extends({}, styleProps.size === 'small' && {
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

const ButtonStartIcon = experimentalStyled('span', {}, {
  name: 'MuiButton',
  slot: 'StartIcon'
})(({
  styleProps
}) => _extends({
  display: 'inherit',
  marginRight: 8,
  marginLeft: -4
}, styleProps.size === 'small' && {
  marginLeft: -2
}, commonIconStyles(styleProps)));
const ButtonEndIcon = experimentalStyled('span', {}, {
  name: 'MuiButton',
  slot: 'EndIcon'
})(({
  styleProps
}) => _extends({
  display: 'inherit',
  marginRight: -4,
  marginLeft: 8
}, styleProps.size === 'small' && {
  marginRight: -2
}, commonIconStyles(styleProps)));
const ButtonLabel = experimentalStyled('span', {}, {
  name: 'MuiButton',
  slot: 'Label'
})({
  width: '100%',
  // Ensure the correct width for iOS Safari
  display: 'inherit',
  alignItems: 'inherit',
  justifyContent: 'inherit'
});
const ButtonRoot = experimentalStyled(ButtonBase, {}, {
  name: 'MuiButton',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  styleProps
}) => _extends({}, theme.typography.button, {
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
    border: `1px solid ${theme.palette[styleProps.color].main}`,
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
  }, styleProps.disableElevation && {
    boxShadow: 'none'
  }),
  '&:active': _extends({}, styleProps.variant === 'contained' && {
    boxShadow: theme.shadows[8]
  }, styleProps.disableElevation && {
    boxShadow: 'none'
  }),
  '&.Mui-focusVisible': _extends({}, styleProps.variant === 'contained' && {
    boxShadow: theme.shadows[6]
  }, styleProps.disableElevation && {
    boxShadow: 'none'
  }),
  '&.Mui-disabled': _extends({
    color: theme.palette.action.disabled
  }, styleProps.variant === 'outlined' && {
    border: `1px solid ${theme.palette.action.disabledBackground}`
  }, styleProps.variant === 'outlined' && styleProps.color === 'secondary' && {
    border: `1px solid ${theme.palette.action.disabled}`
  }, styleProps.variant === 'contained' && {
    color: theme.palette.action.disabled,
    boxShadow: theme.shadows[0],
    backgroundColor: theme.palette.action.disabledBackground
  }, styleProps.disableElevation && {
    boxShadow: 'none'
  })
}, styleProps.variant === 'text' && {
  padding: '6px 8px'
}, styleProps.variant === 'text' && styleProps.color !== 'inherit' && {
  color: theme.palette[styleProps.color].main
}, styleProps.variant === 'outlined' && {
  padding: '5px 15px',
  border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'}`
}, styleProps.variant === 'outlined' && styleProps.color !== 'inherit' && {
  color: theme.palette[styleProps.color].main,
  border: `1px solid ${alpha(theme.palette[styleProps.color].main, 0.5)}`
}, styleProps.variant === 'contained' && {
  color: theme.palette.getContrastText(theme.palette.grey[300]),
  backgroundColor: theme.palette.grey[300],
  boxShadow: theme.shadows[2]
}, styleProps.variant === 'contained' && styleProps.color !== 'inherit' && {
  color: theme.palette[styleProps.color].contrastText,
  backgroundColor: theme.palette[styleProps.color].main
}, styleProps.disableElevation && {
  boxShadow: 'none'
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
}));
const Button = /*#__PURE__*/React.forwardRef(function Button(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiButton'
  });

  const {
    children,
    className,
    color = 'primary',
    component = 'button',
    disabled = false,
    disableElevation = false,
    disableFocusRipple = false,
    endIcon: endIconProp,
    focusVisibleClassName,
    fullWidth = false,
    size = 'medium',
    startIcon: startIconProp,
    type,
    variant = 'text'
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["children", "className", "color", "component", "disabled", "disableElevation", "disableFocusRipple", "endIcon", "focusVisibleClassName", "fullWidth", "size", "startIcon", "type", "variant"]);

  const styleProps = _extends({}, props, {
    color,
    component,
    disabled,
    disableElevation,
    disableFocusRipple,
    fullWidth,
    size,
    type,
    variant
  });

  const classes = useUtilityClasses(styleProps);
  const startIcon = startIconProp && /*#__PURE__*/React.createElement(ButtonStartIcon, {
    className: classes.startIcon,
    styleProps: styleProps
  }, startIconProp);
  const endIcon = endIconProp && /*#__PURE__*/React.createElement(ButtonEndIcon, {
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
   * The content of the button.
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
   * If `true`, the button is disabled.
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
   * to highlight the element by applying separate styles with the `focusVisibleClassName`.
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
   * The size of the button.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['large', 'medium', 'small']),

  /**
   * Element placed before the children.
   */
  startIcon: PropTypes.node,

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