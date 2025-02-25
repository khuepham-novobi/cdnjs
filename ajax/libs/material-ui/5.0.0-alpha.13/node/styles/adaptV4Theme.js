"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = adaptV4Theme;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _createBreakpoints = _interopRequireDefault(require("./createBreakpoints"));

var _createV4Spacing = _interopRequireDefault(require("./createV4Spacing"));

function adaptV4Theme(inputTheme) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(['Material-UI: adaptV4Theme() is deprecated.', 'Follow the upgrade guide on http://next.material-ui.com/guides/migration-v4/#theme'].join('\n'));
  }

  const {
    defaultProps = {},
    mixins = {},
    overrides = {},
    palette = {},
    props = {},
    styleOverrides = {}
  } = inputTheme,
        other = (0, _objectWithoutPropertiesLoose2.default)(inputTheme, ["defaultProps", "mixins", "overrides", "palette", "props", "styleOverrides"]);
  const theme = (0, _extends2.default)({}, other, {
    components: {}
  }); // default props

  Object.keys(defaultProps).forEach(component => {
    const componentValue = theme.components[component] || {};
    componentValue.defaultProps = defaultProps[component];
    theme.components[component] = componentValue;
  });
  Object.keys(props).forEach(component => {
    const componentValue = theme.components[component] || {};
    componentValue.defaultProps = props[component];
    theme.components[component] = componentValue;
  }); // css overrides

  Object.keys(styleOverrides).forEach(component => {
    const componentValue = theme.components[component] || {};
    componentValue.styleOverrides = styleOverrides[component];
    theme.components[component] = componentValue;
  });
  Object.keys(overrides).forEach(component => {
    const componentValue = theme.components[component] || {};
    componentValue.styleOverrides = overrides[component];
    theme.components[component] = componentValue;
  }); // theme.spacing

  theme.spacing = (0, _createV4Spacing.default)(inputTheme.spacing); // theme.mixins.gutters

  const breakpoints = (0, _createBreakpoints.default)(inputTheme.breakpoints || {});
  const spacing = theme.spacing;
  theme.mixins = (0, _extends2.default)({
    gutters: (styles = {}) => {
      return (0, _extends2.default)({
        paddingLeft: spacing(2),
        paddingRight: spacing(2)
      }, styles, {
        [breakpoints.up('sm')]: (0, _extends2.default)({
          paddingLeft: spacing(3),
          paddingRight: spacing(3)
        }, styles[breakpoints.up('sm')])
      });
    }
  }, mixins);
  const {
    type: typeInput,
    mode: modeInput
  } = palette,
        paletteRest = (0, _objectWithoutPropertiesLoose2.default)(palette, ["type", "mode"]);
  const finalMode = modeInput || typeInput || 'light';
  theme.palette = (0, _extends2.default)({
    // theme.palette.text.hint
    text: {
      hint: finalMode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.38)'
    },
    mode: finalMode,
    type: finalMode
  }, paletteRest);
  return theme;
}