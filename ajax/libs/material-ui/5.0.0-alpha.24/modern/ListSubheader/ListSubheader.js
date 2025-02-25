import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';
import { getListSubheaderUtilityClass } from './listSubheaderClasses';

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return deepmerge(styles.root || {}, _extends({}, styleProps.color !== 'default' && styles[`color${capitalize(styleProps.color)}`], !styleProps.disableGutters && styles.gutters, styleProps.inset && styles.inset, !styleProps.disableSticky && styles.sticky));
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    color,
    disableGutters,
    inset,
    disableSticky
  } = styleProps;
  const slots = {
    root: ['root', color !== 'default' && `color${capitalize(color)}`, !disableGutters && 'gutters', inset && 'inset', !disableSticky && 'sticky']
  };
  return composeClasses(slots, getListSubheaderUtilityClass, classes);
};

const ListSubheaderRoot = experimentalStyled('li', {}, {
  name: 'MuiListSubheader',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  styleProps
}) => _extends({
  /* Styles applied to the root element. */
  boxSizing: 'border-box',
  lineHeight: '48px',
  listStyle: 'none',
  color: theme.palette.text.secondary,
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.pxToRem(14)
}, styleProps.color === 'primary' && {
  color: theme.palette.primary.main
}, styleProps.color === 'inherit' && {
  color: 'inherit'
}, !styleProps.disableGutters && {
  paddingLeft: 16,
  paddingRight: 16
}, styleProps.inset && {
  paddingLeft: 72
}, !styleProps.disableSticky && {
  position: 'sticky',
  top: 0,
  zIndex: 1,
  backgroundColor: 'inherit'
}));
const ListSubheader = /*#__PURE__*/React.forwardRef(function ListSubheader(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiListSubheader'
  });

  const {
    className,
    color = 'default',
    component = 'li',
    disableGutters = false,
    disableSticky = false,
    inset = false
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["className", "color", "component", "disableGutters", "disableSticky", "inset"]);

  const styleProps = _extends({}, props, {
    color,
    component,
    disableGutters,
    disableSticky,
    inset
  });

  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/React.createElement(ListSubheaderRoot, _extends({
    as: component,
    className: clsx(classes.root, className),
    ref: ref,
    styleProps: styleProps
  }, other));
});
process.env.NODE_ENV !== "production" ? ListSubheader.propTypes = {
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
   * @default 'default'
   */
  color: PropTypes.oneOf(['default', 'inherit', 'primary']),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * If `true`, the List Subheader will not have gutters.
   * @default false
   */
  disableGutters: PropTypes.bool,

  /**
   * If `true`, the List Subheader will not stick to the top during scroll.
   * @default false
   */
  disableSticky: PropTypes.bool,

  /**
   * If `true`, the List Subheader is indented.
   * @default false
   */
  inset: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default ListSubheader;