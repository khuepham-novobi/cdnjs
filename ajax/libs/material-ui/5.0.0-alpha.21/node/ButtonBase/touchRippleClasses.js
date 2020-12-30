"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTouchRippleUtilityClass = getTouchRippleUtilityClass;
exports.default = void 0;

function getTouchRippleUtilityClass(name) {
  return `MuiTouchRipple-${name}`;
}

const touchRippleClasses = {
  root: getTouchRippleUtilityClass('root'),
  ripple: getTouchRippleUtilityClass('ripple'),
  rippleVisible: getTouchRippleUtilityClass('rippleVisible'),
  ripplePulsate: getTouchRippleUtilityClass('ripplePulsate'),
  child: getTouchRippleUtilityClass('child'),
  childLeaving: getTouchRippleUtilityClass('childLeaving'),
  childPulsate: getTouchRippleUtilityClass('childPulsate')
};
var _default = touchRippleClasses;
exports.default = _default;