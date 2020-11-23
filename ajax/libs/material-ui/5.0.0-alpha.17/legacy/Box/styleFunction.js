import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import { borders, display, flexbox, grid, positions, palette, shadows, sizing, spacing, typography, mergeBreakpointsInOrder, unstable_styleFunctionSx as styleFunctionSx, unstable_getThemeValue as getThemeValue } from '@material-ui/system';
import { deepmerge } from '@material-ui/utils';
var filterProps = [].concat(_toConsumableArray(borders.filterProps), _toConsumableArray(display.filterProps), _toConsumableArray(flexbox.filterProps), _toConsumableArray(grid.filterProps), _toConsumableArray(positions.filterProps), _toConsumableArray(palette.filterProps), _toConsumableArray(shadows.filterProps), _toConsumableArray(sizing.filterProps), _toConsumableArray(spacing.filterProps), _toConsumableArray(typography.filterProps), _toConsumableArray(styleFunctionSx.filterProps));

var styleFunction = function styleFunction(props) {
  var result = {};
  Object.keys(props).forEach(function (prop) {
    if (filterProps.indexOf(prop) !== -1 && prop !== 'sx') {
      result = deepmerge(result, getThemeValue(prop, props[prop], props.theme));
    }
  });
  return mergeBreakpointsInOrder(props.theme.breakpoints, result);
};

styleFunction.filterProps = filterProps;
export default styleFunction;