import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import Typography from '../Typography';
import ListContext from '../List/ListContext';
import useThemeProps from '../styles/useThemeProps';
import experimentalStyled from '../styles/experimentalStyled';
import listItemTextClasses, { getListItemTextUtilityClass } from './listItemTextClasses';

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return deepmerge(styles.root || {}, _extends({}, styleProps.inset && styles.inset, styleProps.primary && styleProps.secondary && styles.multiline, styleProps.dense && styles.dense, {
    [`& .${listItemTextClasses.primary}`]: styles.primary,
    [`& .${listItemTextClasses.secondary}`]: styles.secondary
  }));
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    inset,
    primary,
    secondary,
    dense
  } = styleProps;
  const slots = {
    root: ['root', inset && 'inset', dense && 'dense', primary && secondary && 'multiline'],
    primary: ['primary'],
    secondary: ['secondary']
  };
  return composeClasses(slots, getListItemTextUtilityClass, classes);
};

const ListItemTextRoot = experimentalStyled('div', {}, {
  name: 'MuiListItemText',
  slot: 'Root',
  overridesResolver
})(({
  styleProps
}) => _extends({
  /* Styles applied to the root element. */
  flex: '1 1 auto',
  minWidth: 0,
  marginTop: 4,
  marginBottom: 4
}, styleProps.primary && styleProps.secondary && {
  marginTop: 6,
  marginBottom: 6
}, styleProps.inset && {
  paddingLeft: 56
}));
const ListItemText = /*#__PURE__*/React.forwardRef(function ListItemText(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiListItemText'
  });

  const {
    children,
    className,
    disableTypography = false,
    inset = false,
    primary: primaryProp,
    primaryTypographyProps,
    secondary: secondaryProp,
    secondaryTypographyProps
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["children", "className", "disableTypography", "inset", "primary", "primaryTypographyProps", "secondary", "secondaryTypographyProps"]);

  const {
    dense
  } = React.useContext(ListContext);
  let primary = primaryProp != null ? primaryProp : children;
  let secondary = secondaryProp;

  const styleProps = _extends({}, props, {
    disableTypography,
    inset,
    primary: !!primary,
    secondary: !!secondary,
    dense
  });

  const classes = useUtilityClasses(styleProps);

  if (primary != null && primary.type !== Typography && !disableTypography) {
    primary = /*#__PURE__*/React.createElement(Typography, _extends({
      variant: dense ? 'body2' : 'body1',
      className: classes.primary,
      component: "span",
      display: "block"
    }, primaryTypographyProps), primary);
  }

  if (secondary != null && secondary.type !== Typography && !disableTypography) {
    secondary = /*#__PURE__*/React.createElement(Typography, _extends({
      variant: "body2",
      className: classes.secondary,
      color: "textSecondary",
      display: "block"
    }, secondaryTypographyProps), secondary);
  }

  return /*#__PURE__*/React.createElement(ListItemTextRoot, _extends({
    className: clsx(classes.root, className),
    styleProps: styleProps,
    ref: ref
  }, other), primary, secondary);
});
process.env.NODE_ENV !== "production" ? ListItemText.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Alias for the `primary` prop.
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
   * If `true`, the children won't be wrapped by a Typography component.
   * This can be useful to render an alternative Typography variant by wrapping
   * the `children` (or `primary`) text, and optional `secondary` text
   * with the Typography component.
   * @default false
   */
  disableTypography: PropTypes.bool,

  /**
   * If `true`, the children are indented.
   * This should be used if there is no left avatar or left icon.
   * @default false
   */
  inset: PropTypes.bool,

  /**
   * The main content element.
   */
  primary: PropTypes.node,

  /**
   * These props will be forwarded to the primary typography component
   * (as long as disableTypography is not `true`).
   */
  primaryTypographyProps: PropTypes.object,

  /**
   * The secondary content element.
   */
  secondary: PropTypes.node,

  /**
   * These props will be forwarded to the secondary typography component
   * (as long as disableTypography is not `true`).
   */
  secondaryTypographyProps: PropTypes.object,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default ListItemText;