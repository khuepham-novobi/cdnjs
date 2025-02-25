import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes, deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import { alpha } from '../styles/colorManipulator';
import ButtonBase from '../ButtonBase';
import capitalize from '../utils/capitalize';
import iconButtonClasses, { getIconButtonUtilityClass } from './iconButtonClasses';

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return deepmerge(styles.root || {}, _extends({}, styleProps.color !== 'default' && styles[`color${capitalize(styleProps.color)}`], styleProps.edge && styles[`edge${capitalize(styleProps.edge)}`], styles[`size${capitalize(styleProps.size)}`], {
    [`& .${iconButtonClasses.label}`]: styles.label
  }));
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    disabled,
    color,
    edge,
    size
  } = styleProps;
  const slots = {
    root: ['root', disabled && 'disabled', color !== 'default' && `color${capitalize(color)}`, edge && `edge${capitalize(edge)}`, `size${capitalize(size)}`],
    label: ['label']
  };
  return composeClasses(slots, getIconButtonUtilityClass, classes);
};

const IconButtonRoot = experimentalStyled(ButtonBase, {}, {
  name: 'MuiIconButton',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  styleProps
}) => _extends({
  /* Styles applied to the root element. */
  textAlign: 'center',
  flex: '0 0 auto',
  fontSize: theme.typography.pxToRem(24),
  padding: 12,
  borderRadius: '50%',
  overflow: 'visible',
  // Explicitly set the default value to solve a bug on IE11.
  color: theme.palette.action.active,
  transition: theme.transitions.create('background-color', {
    duration: theme.transitions.duration.shortest
  }),
  '&:hover': {
    backgroundColor: alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }
}, styleProps.edge === 'start' && {
  marginLeft: styleProps.size === 'small' ? -3 : -12
}, styleProps.edge === 'end' && {
  marginRight: styleProps.size === 'small' ? -3 : -12
}), ({
  theme,
  styleProps
}) => _extends({}, styleProps.color === 'inherit' && {
  color: 'inherit'
}, styleProps.color === 'primary' && {
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }
}, styleProps.color === 'secondary' && {
  color: theme.palette.secondary.main,
  '&:hover': {
    backgroundColor: alpha(theme.palette.secondary.main, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }
}, styleProps.size === 'small' && {
  padding: 3,
  fontSize: theme.typography.pxToRem(18)
}, {
  /* Styles applied to the root element if `disabled={true}`. */
  [`&.${iconButtonClasses.disabled}`]: {
    backgroundColor: 'transparent',
    color: theme.palette.action.disabled
  }
}));
const IconButtonLabel = experimentalStyled('span', {}, {
  name: 'MuiIconButton',
  slot: 'Label'
})({
  /* Styles applied to the children container element. */
  width: '100%',
  display: 'flex',
  alignItems: 'inherit',
  justifyContent: 'inherit'
});
/**
 * Refer to the [Icons](/components/icons/) section of the documentation
 * regarding the available icon options.
 */

const IconButton = /*#__PURE__*/React.forwardRef(function IconButton(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiIconButton'
  });

  const {
    edge = false,
    children,
    className,
    color = 'default',
    disabled = false,
    disableFocusRipple = false,
    size = 'medium'
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["edge", "children", "className", "color", "disabled", "disableFocusRipple", "size"]);

  const styleProps = _extends({}, props, {
    edge,
    color,
    disabled,
    disableFocusRipple,
    size
  });

  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/React.createElement(IconButtonRoot, _extends({
    className: clsx(classes.root, className),
    centerRipple: true,
    focusRipple: !disableFocusRipple,
    disabled: disabled,
    ref: ref,
    styleProps: styleProps
  }, other), /*#__PURE__*/React.createElement(IconButtonLabel, {
    className: classes.label,
    styleProps: styleProps
  }, children));
});
process.env.NODE_ENV !== "production" ? IconButton.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The icon to display.
   */
  children: chainPropTypes(PropTypes.node, props => {
    const found = React.Children.toArray(props.children).some(child => /*#__PURE__*/React.isValidElement(child) && child.props.onClick);

    if (found) {
      return new Error(['Material-UI: You are providing an onClick event listener to a child of a button element.', 'Prefer applying it to the IconButton directly.', 'This guarantees that the whole <button> will be responsive to click events.'].join('\n'));
    }

    return null;
  }),

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
   * @default 'default'
   */
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,

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
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: PropTypes.oneOf(['end', 'start', false]),

  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['medium', 'small']),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default IconButton;