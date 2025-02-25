import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import { getDialogActionsUtilityClass } from './dialogActionsClasses';

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return deepmerge(styles.root || {}, _extends({}, !styleProps.disableSpacing && styles.spacing));
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    disableSpacing
  } = styleProps;
  const slots = {
    root: ['root', !disableSpacing && 'spacing']
  };
  return composeClasses(slots, getDialogActionsUtilityClass, classes);
};

const DialogActionsRoot = experimentalStyled('div', {}, {
  name: 'MuiDialogActions',
  slot: 'Root',
  overridesResolver
})(({
  styleProps
}) => _extends({
  /* Styles applied to the root element. */
  display: 'flex',
  alignItems: 'center',
  padding: 8,
  justifyContent: 'flex-end',
  flex: '0 0 auto'
}, !styleProps.disableSpacing && {
  '& > :not(:first-of-type)': {
    marginLeft: 8
  }
}));
const DialogActions = /*#__PURE__*/React.forwardRef(function DialogActions(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiDialogActions'
  });

  const {
    className,
    disableSpacing = false
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["className", "disableSpacing"]);

  const styleProps = _extends({}, props, {
    disableSpacing
  });

  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/React.createElement(DialogActionsRoot, _extends({
    className: clsx(classes.root, className),
    styleProps: styleProps,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? DialogActions.propTypes = {
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
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default DialogActions;