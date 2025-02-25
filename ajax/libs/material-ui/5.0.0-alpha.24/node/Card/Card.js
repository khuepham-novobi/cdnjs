"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _unstyled = require("@material-ui/unstyled");

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _Paper = _interopRequireDefault(require("../Paper"));

var _cardClasses = require("./cardClasses");

const overridesResolver = (props, styles) => styles.root || {};

const useUtilityClasses = styleProps => {
  const {
    classes
  } = styleProps;
  const slots = {
    root: ['root']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _cardClasses.getCardUtilityClass, classes);
};

const CardRoot = (0, _experimentalStyled.default)(_Paper.default, {}, {
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
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiCard'
  });
  const {
    className,
    raised = false
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["className", "raised"]);
  const styleProps = (0, _extends2.default)({}, props, {
    raised
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/React.createElement(CardRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
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
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * If `true`, the card will use raised styling.
   * @default false
   */
  raised: _propTypes.default.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = Card;
exports.default = _default;