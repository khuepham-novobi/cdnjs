"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _system = require("@material-ui/system");

var _utils = require("@material-ui/utils");

const filterProps = [..._system.borders.filterProps, ..._system.display.filterProps, ..._system.flexbox.filterProps, ..._system.grid.filterProps, ..._system.positions.filterProps, ..._system.palette.filterProps, ..._system.shadows.filterProps, ..._system.sizing.filterProps, ..._system.spacing.filterProps, ..._system.typography.filterProps, ..._system.unstable_styleFunctionSx.filterProps];

const styleFunction = props => {
  let result = {};
  Object.keys(props).forEach(prop => {
    if (filterProps.indexOf(prop) !== -1 && prop !== 'sx') {
      result = (0, _utils.deepmerge)(result, (0, _system.unstable_getThemeValue)(prop, props[prop], props.theme));
    }
  });
  return (0, _system.mergeBreakpointsInOrder)(props.theme.breakpoints, result);
};

styleFunction.filterProps = filterProps;
var _default = styleFunction;
exports.default = _default;