"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAlertUtilityClass = getAlertUtilityClass;
exports.default = void 0;

var _unstyled = require("@material-ui/unstyled");

function getAlertUtilityClass(slot) {
  return (0, _unstyled.generateUtilityClass)('MuiAlert', slot);
}

const alertClasses = (0, _unstyled.generateUtilityClasses)('MuiAlert', ['root', 'action', 'icon', 'message', 'filledSuccess', 'filledInfo', 'filledWarning', 'filledError', 'outlinedSuccess', 'outlinedInfo', 'outlinedWarning', 'outlinedError', 'standardSuccess', 'standardInfo', 'standardWarning', 'standardError']);
var _default = alertClasses;
exports.default = _default;