import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import useTheme from '../styles/useTheme';
import { getPaperUtilityClass } from './paperClasses';

var overridesResolver = function overridesResolver(props, styles) {
  var styleProps = props.styleProps;
  return deepmerge(styles.root || {}, _extends({}, styles[styleProps.variant], !styleProps.square && styles.rounded, styleProps.variant === 'elevation' && styles["elevation".concat(styleProps.elevation)]));
};

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var square = styleProps.square,
      elevation = styleProps.elevation,
      variant = styleProps.variant,
      classes = styleProps.classes;
  var slots = {
    root: ['root', variant, !square && 'rounded', variant === 'elevation' && "elevation".concat(elevation)]
  };
  return composeClasses({
    slots: slots,
    classes: classes,
    getUtilityClass: getPaperUtilityClass
  });
};

var PaperRoot = experimentalStyled('div', {}, {
  name: 'MuiPaper',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({
    /* Styles applied to the root element. */
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    transition: theme.transitions.create('box-shadow')
  }, !styleProps.square && {
    borderRadius: theme.shape.borderRadius
  }, styleProps.variant === 'outlined' && {
    border: "1px solid ".concat(theme.palette.divider)
  }, styleProps.variant === 'elevation' && {
    boxShadow: theme.shadows[styleProps.elevation]
  });
});
var Paper = /*#__PURE__*/React.forwardRef(function Paper(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiPaper'
  });

  var className = props.className,
      _props$component = props.component,
      Component = _props$component === void 0 ? 'div' : _props$component,
      _props$square = props.square,
      square = _props$square === void 0 ? false : _props$square,
      _props$elevation = props.elevation,
      elevation = _props$elevation === void 0 ? 1 : _props$elevation,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'elevation' : _props$variant,
      other = _objectWithoutProperties(props, ["className", "component", "square", "elevation", "variant"]);

  var styleProps = _extends({}, props, {
    variant: variant,
    elevation: elevation,
    square: square
  });

  var classes = useUtilityClasses(styleProps);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    var theme = useTheme();

    if (theme.shadows[elevation] === undefined) {
      console.error(["Material-UI: The elevation provided <Paper elevation={".concat(elevation, "}> is not available in the theme."), "Please make sure that `theme.shadows[".concat(elevation, "]` is defined.")].join('\n'));
    }
  }

  return /*#__PURE__*/React.createElement(PaperRoot, _extends({
    as: Component,
    styleProps: styleProps,
    className: clsx(classes.root, className),
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? Paper.propTypes = {
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: PropTypes.number,

  /**
   * If `true`, rounded corners are disabled.
   * @default false
   */
  square: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([PropTypes.oneOf(['elevation', 'outlined']), PropTypes.string])
} : void 0;
export default Paper;