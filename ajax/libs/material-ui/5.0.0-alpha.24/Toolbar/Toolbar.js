import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import useThemeProps from '../styles/useThemeProps';
import experimentalStyled from '../styles/experimentalStyled';
import { getToolbarUtilityClass } from './toolbarClasses';

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return deepmerge(styles.root || {}, _extends({}, !styleProps.disableGutters && styles.gutters, styles[styleProps.variant]));
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    disableGutters,
    variant
  } = styleProps;
  const slots = {
    root: ['root', !disableGutters && 'gutters', variant]
  };
  return composeClasses(slots, getToolbarUtilityClass, classes);
};

const ToolbarRoot = experimentalStyled('div', {}, {
  name: 'MuiToolbar',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  styleProps
}) => _extends({
  /* Styles applied to the root element. */
  position: 'relative',
  display: 'flex',
  alignItems: 'center'
}, !styleProps.disableGutters && {
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  }
}, styleProps.variant === 'dense' && {
  minHeight: 48
}),
/* Styles applied to the root element if `variant="regular"`. */
({
  theme,
  styleProps
}) => styleProps.variant === 'regular' && theme.mixins.toolbar);
const Toolbar = /*#__PURE__*/React.forwardRef(function Toolbar(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiToolbar'
  });

  const {
    className,
    component = 'div',
    disableGutters = false,
    variant = 'regular'
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["className", "component", "disableGutters", "variant"]);

  const styleProps = _extends({}, props, {
    component,
    disableGutters,
    variant
  });

  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/React.createElement(ToolbarRoot, _extends({
    as: component,
    className: clsx(classes.root, className),
    ref: ref,
    styleProps: styleProps
  }, other));
});
process.env.NODE_ENV !== "production" ? Toolbar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The Toolbar children, usually a mixture of `IconButton`, `Button` and `Typography`.
   * The Toolbar is a flex container, allowing flex item properites to be used to lay out the children.
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * If `true`, disables gutter padding.
   * @default false
   */
  disableGutters: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The variant to use.
   * @default 'regular'
   */
  variant: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['dense', 'regular']), PropTypes.string])
} : void 0;
export default Toolbar;