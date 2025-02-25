import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import ListContext from '../List/ListContext';
import { getListItemSecondaryActionClassesUtilityClass } from './listItemSecondaryActionClasses';

var overridesResolver = function overridesResolver(props, styles) {
  var styleProps = props.styleProps;
  return deepmerge(styles.root || {}, _extends({}, styleProps.disableGutters && styles.disableGutters));
};

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var disableGutters = styleProps.disableGutters,
      classes = styleProps.classes;
  var slots = {
    root: ['root', disableGutters && 'disableGutters']
  };
  return composeClasses(slots, getListItemSecondaryActionClassesUtilityClass, classes);
};

var ListItemSecondaryActionRoot = experimentalStyled('div', {}, {
  name: 'MuiListItemSecondaryAction',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref) {
  var styleProps = _ref.styleProps;
  return _extends({
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: 'translateY(-50%)'
  }, styleProps.disableGutters && {
    right: 0
  });
});
/**
 * Must be used as the last child of ListItem to function properly.
 */

var ListItemSecondaryAction = /*#__PURE__*/React.forwardRef(function ListItemSecondaryAction(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiListItemSecondaryAction'
  });

  var className = props.className,
      other = _objectWithoutProperties(props, ["className"]);

  var context = React.useContext(ListContext);

  var styleProps = _extends({}, props, {
    disableGutters: context.disableGutters
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/React.createElement(ListItemSecondaryActionRoot, _extends({
    className: clsx(classes.root, className),
    styleProps: styleProps,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? ListItemSecondaryAction.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component, normally an `IconButton` or selection control.
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
ListItemSecondaryAction.muiName = 'ListItemSecondaryAction';
export default ListItemSecondaryAction;