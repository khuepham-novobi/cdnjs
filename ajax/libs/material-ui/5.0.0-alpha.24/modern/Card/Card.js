import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import Paper from '../Paper';
import { getCardUtilityClass } from './cardClasses';

const overridesResolver = (props, styles) => styles.root || {};

const useUtilityClasses = styleProps => {
  const {
    classes
  } = styleProps;
  const slots = {
    root: ['root']
  };
  return composeClasses(slots, getCardUtilityClass, classes);
};

const CardRoot = experimentalStyled(Paper, {}, {
  name: 'MuiCard',
  slot: 'Root',
  overridesResolver
})(() => {
  /* Styles applied to the root element. */
  return {
    overflow: 'hidden'
  };
});
const Card = /*#__PURE__*/React.forwardRef(function Card(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiCard'
  });

  const {
    className,
    raised = false
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["className", "raised"]);

  const styleProps = _extends({}, props, {
    raised
  });

  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/React.createElement(CardRoot, _extends({
    className: clsx(classes.root, className),
    elevation: raised ? 8 : 1,
    ref: ref,
    styleProps: styleProps
  }, other));
});
process.env.NODE_ENV !== "production" ? Card.propTypes = {
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
   * If `true`, the card will use raised styling.
   * @default false
   */
  raised: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default Card;