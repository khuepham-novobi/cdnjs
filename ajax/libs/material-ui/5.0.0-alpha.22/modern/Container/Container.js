import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import useThemeProps from '../styles/useThemeProps';
import experimentalStyled from '../styles/experimentalStyled';
import containerClasses, { getContainerUtilityClass } from './containerClasses';
import capitalize from '../utils/capitalize';

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return deepmerge(styles.root || {}, _extends({}, styles[`maxWidth${capitalize(String(styleProps.maxWidth))}`], styleProps.fixed && styles.fixed, styleProps.disableGutters && styles.disableGutters));
};

const useUtilityClasses = styleProps => {
  const {
    classes = {},
    fixed,
    disableGutters,
    maxWidth
  } = styleProps;
  return {
    root: clsx(containerClasses.root, classes.root, getContainerUtilityClass(`maxWidth${capitalize(String(maxWidth))}`), classes[`maxWidth${capitalize(String(maxWidth))}`], fixed && [containerClasses.fixed, classes.fixed], disableGutters && [containerClasses.disableGutters, classes.disableGutters])
  };
};

const ContainerRoot = experimentalStyled('div', {}, {
  name: 'MuiContainer',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  styleProps
}) => _extends({
  width: '100%',
  marginLeft: 'auto',
  boxSizing: 'border-box',
  marginRight: 'auto',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  display: 'block',
  // Fix IE11 layout when used with main.
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  }
}, styleProps.disableGutters && {
  paddingLeft: 0,
  paddingRight: 0
}), ({
  theme,
  styleProps
}) => styleProps.fixed && Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
  const value = theme.breakpoints.values[breakpoint];

  if (value !== 0) {
    acc[theme.breakpoints.up(breakpoint)] = {
      maxWidth: `${value}${theme.breakpoints.unit}`
    };
  }

  return acc;
}, {}), ({
  theme,
  styleProps
}) => _extends({}, styleProps.maxWidth === 'xs' && {
  [theme.breakpoints.up('xs')]: {
    maxWidth: Math.max(theme.breakpoints.values.xs, 444)
  }
}, styleProps.maxWidth !== 'xs' && {
  [theme.breakpoints.up(styleProps.maxWidth)]: {
    maxWidth: `${theme.breakpoints.values[styleProps.maxWidth]}${theme.breakpoints.unit}`
  }
}));
const Container = /*#__PURE__*/React.forwardRef(function Container(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiContainer'
  });

  const {
    className,
    component: Component = 'div',
    disableGutters = false,
    fixed = false,
    maxWidth = 'lg'
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["className", "component", "disableGutters", "fixed", "maxWidth"]);

  const styleProps = _extends({}, props, {
    disableGutters,
    fixed,
    maxWidth
  });

  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/React.createElement(ContainerRoot, _extends({
    as: Component,
    styleProps: styleProps,
    className: clsx(classes.root, className),
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? Container.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * @ignore
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
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: PropTypes.bool,

  /**
   * Set the max-width to match the min-width of the current breakpoint.
   * This is useful if you'd prefer to design for a fixed set of sizes
   * instead of trying to accommodate a fully fluid viewport.
   * It's fluid by default.
   * @default false
   */
  fixed: PropTypes.bool,

  /**
   * Determine the max-width of the container.
   * The container width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   * @default 'lg'
   */
  maxWidth: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs', false]),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default Container;