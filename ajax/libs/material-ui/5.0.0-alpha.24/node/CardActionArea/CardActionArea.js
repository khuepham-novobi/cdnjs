"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'block',
    textAlign: 'inherit',
    width: '100%',
    '&:hover $focusHighlight': {
      opacity: theme.palette.action.hoverOpacity,
      '@media (hover: none)': {
        opacity: 0
      }
    },
    '&$focusVisible $focusHighlight': {
      opacity: theme.palette.action.focusOpacity
    }
  },

  /* Pseudo-class applied to the ButtonBase root element if the action area is keyboard focused. */
  focusVisible: {},

  /* Styles applied to the overlay that covers the action area when it is keyboard focused. */
  focusHighlight: {
    overflow: 'hidden',
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 'inherit',
    opacity: 0,
    backgroundColor: 'currentcolor',
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.short
    })
  }
});

exports.styles = styles;
const CardActionArea = /*#__PURE__*/React.forwardRef(function CardActionArea(props, ref) {
  const {
    children,
    classes,
    className,
    focusVisibleClassName
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["children", "classes", "className", "focusVisibleClassName"]);
  return /*#__PURE__*/React.createElement(_ButtonBase.default, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    focusVisibleClassName: (0, _clsx.default)(focusVisibleClassName, classes.focusVisible),
    ref: ref
  }, other), children, /*#__PURE__*/React.createElement("span", {
    className: classes.focusHighlight
  }));
});
process.env.NODE_ENV !== "production" ? CardActionArea.propTypes = {
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
   * @ignore
   */
  focusVisibleClassName: _propTypes.default.string
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiCardActionArea'
})(CardActionArea);

exports.default = _default;