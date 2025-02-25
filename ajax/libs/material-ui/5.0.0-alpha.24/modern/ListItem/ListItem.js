import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { deepmerge, chainPropTypes, elementTypeAcceptingRef } from '@material-ui/utils';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import { alpha } from '../styles/colorManipulator';
import ButtonBase from '../ButtonBase';
import isMuiElement from '../utils/isMuiElement';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import useForkRef from '../utils/useForkRef';
import ListContext from '../List/ListContext';
import listItemClasses, { getListItemUtilityClass } from './listItemClasses';

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return deepmerge(styles.root || {}, _extends({}, styleProps.dense && styles.dense, styleProps.alignItems === 'flex-start' && styles.alignItemsFlexStart, styleProps.divider && styles.divider, !styleProps.disableGutters && styles.gutters, styleProps.button && styles.button, styleProps.hasSecondaryAction && styles.secondaryAction));
};

const useUtilityClasses = styleProps => {
  const {
    dense,
    alignItems,
    divider,
    disableGutters,
    hasSecondaryAction,
    selected,
    disabled,
    button,
    classes
  } = styleProps;
  const slots = {
    root: ['root', dense && 'dense', !disableGutters && 'gutters', divider && 'divider', disabled && 'disabled', button && 'button', alignItems === 'flex-start' && 'alignItemsFlexStart', hasSecondaryAction && 'secondaryAction', selected && 'selected'],
    container: ['container']
  };
  return composeClasses(slots, getListItemUtilityClass, classes);
};

const ListItemRoot = experimentalStyled('div', {}, {
  name: 'MuiListItem',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  styleProps
}) => _extends({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
  textDecoration: 'none',
  width: '100%',
  boxSizing: 'border-box',
  textAlign: 'left',
  paddingTop: 8,
  paddingBottom: 8,
  [`&.${listItemClasses.focusVisible}`]: {
    backgroundColor: theme.palette.action.focus
  },
  [`&.${listItemClasses.selected}`]: {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    [`&.${listItemClasses.focusVisible}`]: {
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
    }
  },
  [`&.${listItemClasses.disabled}`]: {
    opacity: theme.palette.action.disabledOpacity
  }
}, styleProps.dense && {
  paddingTop: 4,
  paddingBottom: 4
}, styleProps.alignItems === 'flex-start' && {
  alignItems: 'flex-start'
}, styleProps.divider && {
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundClip: 'padding-box'
}, !styleProps.disableGutters && {
  paddingLeft: 16,
  paddingRight: 16
}, styleProps.button && {
  transition: theme.transitions.create('background-color', {
    duration: theme.transitions.duration.shortest
  }),
  '&:hover': {
    textDecoration: 'none',
    backgroundColor: theme.palette.action.hover,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  },
  [`&.${listItemClasses.selected}:hover`]: {
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
    }
  }
}, styleProps.hasSecondaryAction && {
  // Add some space to avoid collision as `ListItemSecondaryAction`
  // is absolutely positioned.
  paddingRight: 48
}));
const ListItemContainer = experimentalStyled('li', {}, {
  name: 'MuiListItem',
  slot: 'Container',
  overridesResolver
})({
  position: 'relative'
});
/**
 * Uses an additional container component if `ListItemSecondaryAction` is the last child.
 */

const ListItem = /*#__PURE__*/React.forwardRef(function ListItem(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiListItem'
  });

  const {
    alignItems = 'center',
    autoFocus = false,
    button = false,
    children: childrenProp,
    className,
    component: componentProp,
    ContainerComponent = 'li',
    ContainerProps: {
      className: ContainerClassName
    } = {},
    dense = false,
    disabled = false,
    disableGutters = false,
    divider = false,
    focusVisibleClassName,
    selected = false
  } = props,
        ContainerProps = _objectWithoutPropertiesLoose(props.ContainerProps, ["className"]),
        other = _objectWithoutPropertiesLoose(props, ["alignItems", "autoFocus", "button", "children", "className", "component", "ContainerComponent", "ContainerProps", "dense", "disabled", "disableGutters", "divider", "focusVisibleClassName", "selected"]);

  const context = React.useContext(ListContext);
  const childContext = {
    dense: dense || context.dense || false,
    alignItems,
    disableGutters
  };
  const listItemRef = React.useRef(null);
  useEnhancedEffect(() => {
    if (autoFocus) {
      if (listItemRef.current) {
        listItemRef.current.focus();
      } else if (process.env.NODE_ENV !== 'production') {
        console.error('Material-UI: Unable to set focus to a ListItem whose component has not been rendered.');
      }
    }
  }, [autoFocus]);
  const children = React.Children.toArray(childrenProp);
  const hasSecondaryAction = children.length && isMuiElement(children[children.length - 1], ['ListItemSecondaryAction']);

  const styleProps = _extends({}, props, {
    alignItems,
    autoFocus,
    button,
    dense: childContext.dense,
    disabled,
    disableGutters,
    divider,
    hasSecondaryAction,
    selected
  });

  const classes = useUtilityClasses(styleProps);
  const handleRef = useForkRef(listItemRef, ref);

  const componentProps = _extends({
    className: clsx(classes.root, className),
    disabled
  }, other);

  let Component = componentProp || 'li';

  if (button) {
    componentProps.component = componentProp || 'div';
    componentProps.focusVisibleClassName = clsx(listItemClasses.focusVisible, focusVisibleClassName);
    Component = ButtonBase;
  }

  if (hasSecondaryAction) {
    // Use div by default.
    Component = !componentProps.component && !componentProp ? 'div' : Component; // Avoid nesting of li > li.

    if (ContainerComponent === 'li') {
      if (Component === 'li') {
        Component = 'div';
      } else if (componentProps.component === 'li') {
        componentProps.component = 'div';
      }
    }

    return /*#__PURE__*/React.createElement(ListContext.Provider, {
      value: childContext
    }, /*#__PURE__*/React.createElement(ListItemContainer, _extends({
      as: ContainerComponent,
      className: clsx(classes.container, ContainerClassName),
      ref: handleRef
    }, ContainerProps), /*#__PURE__*/React.createElement(ListItemRoot, _extends({
      as: Component,
      styleProps: styleProps
    }, componentProps), children), children.pop()));
  }

  return /*#__PURE__*/React.createElement(ListContext.Provider, {
    value: childContext
  }, /*#__PURE__*/React.createElement(ListItemRoot, _extends({
    as: Component,
    ref: handleRef,
    styleProps: styleProps
  }, componentProps), children));
});
process.env.NODE_ENV !== "production" ? ListItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Defines the `align-items` style property.
   * @default 'center'
   */
  alignItems: PropTypes.oneOf(['center', 'flex-start']),

  /**
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   */
  autoFocus: PropTypes.bool,

  /**
   * If `true`, the list item is a button (using `ButtonBase`). Props intended
   * for `ButtonBase` can then be applied to `ListItem`.
   * @default false
   */
  button: PropTypes.bool,

  /**
   * The content of the component if a `ListItemSecondaryAction` is used it must
   * be the last child.
   */
  children: chainPropTypes(PropTypes.node, props => {
    const children = React.Children.toArray(props.children); // React.Children.toArray(props.children).findLastIndex(isListItemSecondaryAction)

    let secondaryActionIndex = -1;

    for (let i = children.length - 1; i >= 0; i -= 1) {
      const child = children[i];

      if (isMuiElement(child, ['ListItemSecondaryAction'])) {
        secondaryActionIndex = i;
        break;
      }
    } //  is ListItemSecondaryAction the last child of ListItem


    if (secondaryActionIndex !== -1 && secondaryActionIndex !== children.length - 1) {
      return new Error('Material-UI: You used an element after ListItemSecondaryAction. ' + 'For ListItem to detect that it has a secondary action ' + 'you must pass it as the last child to ListItem.');
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * The container component used when a `ListItemSecondaryAction` is the last child.
   * @default 'li'
   */
  ContainerComponent: elementTypeAcceptingRef,

  /**
   * Props applied to the container component if used.
   * @default {}
   */
  ContainerProps: PropTypes.object,

  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent List component.
   * @default false
   */
  dense: PropTypes.bool,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: PropTypes.bool,

  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   * @default false
   */
  divider: PropTypes.bool,

  /**
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,

  /**
   * Use to apply selected styling.
   * @default false
   */
  selected: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default ListItem;