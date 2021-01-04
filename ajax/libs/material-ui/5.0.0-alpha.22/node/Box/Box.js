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

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

/**
 * @ignore - do not document.
 */
const Box = /*#__PURE__*/React.forwardRef(function Box(props, ref) {
  const {
    children,
    clone,
    className,
    component: Component = 'div'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["children", "clone", "className", "component", "sx"]);

  if (clone) {
    return /*#__PURE__*/React.cloneElement(children, (0, _extends2.default)({
      className: (0, _clsx.default)(children.props.className, className)
    }, other));
  }

  if (typeof children === 'function') {
    return children((0, _extends2.default)({
      className
    }, other));
  }

  return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({
    ref: ref,
    className: className
  }, other), children);
});
process.env.NODE_ENV !== "production" ? Box.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * @ignore
   */
  children: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.node, _propTypes.default.func]),

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * @ignore
   */
  clone: _propTypes.default.bool,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * @ignore
   */
  sx: _propTypes.default.object
} : void 0;

var _default = (0, _experimentalStyled.default)(Box, {}, {
  muiName: 'MuiBox',
  skipVariantsResolver: true
})``;

exports.default = _default;