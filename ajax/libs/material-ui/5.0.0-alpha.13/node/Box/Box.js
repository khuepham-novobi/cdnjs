"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styleFunction = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _system = require("@material-ui/system");

var _clsx = _interopRequireDefault(require("clsx"));

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

const styleFunction = (0, _system.css)((0, _system.compose)(_system.borders, _system.display, _system.flexbox, _system.grid, _system.positions, _system.palette, _system.shadows, _system.sizing, _system.spacing, _system.typography));
exports.styleFunction = styleFunction;

function omit(input, fields) {
  const output = {};
  Object.keys(input).forEach(prop => {
    if (fields.indexOf(prop) === -1) {
      output[prop] = input[prop];
    }
  });
  return output;
}
/**
 * @ignore - do not document.
 */


const BoxRoot = /*#__PURE__*/React.forwardRef(function StyledComponent(props, ref) {
  const {
    children,
    clone,
    className,
    component: Component = 'div'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["children", "clone", "className", "component"]);
  const spread = omit(other, styleFunction.filterProps);

  if (clone) {
    return /*#__PURE__*/React.cloneElement(children, (0, _extends2.default)({
      className: (0, _clsx.default)(children.props.className, className)
    }, spread));
  }

  if (typeof children === 'function') {
    return children((0, _extends2.default)({
      className
    }, spread));
  }

  return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({
    ref: ref,
    className: className
  }, spread), children);
});
process.env.NODE_ENV !== "production" ? BoxRoot.propTypes = {
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  clone: _propTypes.default.bool,
  component: _propTypes.default.elementType
} : void 0;

const shouldForwardProp = prop => styleFunction.filterProps.indexOf(prop) === -1;
/**
 * @ignore - do not document.
 */


const Box = (0, _experimentalStyled.default)(BoxRoot, {
  shouldForwardProp
}, {
  muiName: 'MuiBox'
})(styleFunction);
var _default = Box;
exports.default = _default;