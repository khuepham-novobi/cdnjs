import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import * as React from 'react';
import PropTypes from 'prop-types';
import { chainPropTypes } from '@material-ui/utils';
import { SliderUnstyled, SliderValueLabelUnstyled, sliderClasses } from '@material-ui/unstyled';
import useThemeProps from '../styles/useThemeProps';
import experimentalStyled from '../styles/experimentalStyled';
import { alpha, lighten, darken } from '../styles/colorManipulator';
import capitalize from '../utils/capitalize';
export { sliderClasses };

var overridesResolver = function overridesResolver(props, styles) {
  var _extends4;

  var _props$color = props.color,
      color = _props$color === void 0 ? 'primary' : _props$color,
      _props$marks = props.marks,
      marksProp = _props$marks === void 0 ? false : _props$marks,
      _props$max = props.max,
      max = _props$max === void 0 ? 100 : _props$max,
      _props$min = props.min,
      min = _props$min === void 0 ? 0 : _props$min,
      _props$orientation = props.orientation,
      orientation = _props$orientation === void 0 ? 'horizontal' : _props$orientation,
      _props$step = props.step,
      step = _props$step === void 0 ? 1 : _props$step,
      _props$track = props.track,
      track = _props$track === void 0 ? 'normal' : _props$track;
  var marks = marksProp === true && step !== null ? _toConsumableArray(Array(Math.floor((max - min) / step) + 1)).map(function (_, index) {
    return {
      value: min + step * index
    };
  }) : marksProp || [];
  var marked = marks.length > 0 && marks.some(function (mark) {
    return mark.label;
  });

  var styleOverrides = _extends({}, styles.root, styles["color".concat(capitalize(color))], _defineProperty({}, "&.".concat(sliderClasses.disabled), styles.disabled), marked && styles.marked, orientation === 'vertical' && styles.vertical, track === 'inverted' && styles.trackInverted, track === false && styles.trackFalse, (_extends4 = {}, _defineProperty(_extends4, "& .".concat(sliderClasses.rail), styles.rail), _defineProperty(_extends4, "& .".concat(sliderClasses.track), styles.track), _defineProperty(_extends4, "& .".concat(sliderClasses.mark), styles.mark), _defineProperty(_extends4, "& .".concat(sliderClasses.markLabel), styles.markLabel), _defineProperty(_extends4, "& .".concat(sliderClasses.valueLabel), styles.valueLabel), _defineProperty(_extends4, "& .".concat(sliderClasses.thumb), _extends({}, styles.thumb, styles["thumbColor".concat(capitalize(color))], _defineProperty({}, "&.".concat(sliderClasses.disabled), styles.disabled))), _extends4));

  return styleOverrides;
};

export var SliderRoot = experimentalStyled('span', {}, {
  muiName: 'MuiSlider',
  overridesResolver: overridesResolver
})(function (props) {
  var _extends6;

  return _extends({
    height: 2,
    width: '100%',
    boxSizing: 'content-box',
    padding: '13px 0',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    touchAction: 'none',
    color: props.theme.palette.primary.main,
    WebkitTapHighlightColor: 'transparent'
  }, props.styleProps.color === 'secondary' && {
    color: props.theme.palette.secondary.main
  }, _defineProperty({}, "&.".concat(sliderClasses.disabled), {
    pointerEvents: 'none',
    cursor: 'default',
    color: props.theme.palette.grey[400]
  }), props.styleProps.orientation === 'vertical' && {
    width: 2,
    height: '100%',
    padding: '0 13px'
  }, {
    // The primary input mechanism of the device includes a pointing device of limited accuracy.
    '@media (pointer: coarse)': _extends({
      // Reach 42px touch target, about ~8mm on screen.
      padding: '20px 0'
    }, props.styleProps.orientation === 'vertical' && {
      padding: '0 20px'
    }),
    '@media print': {
      colorAdjust: 'exact'
    }
  }, props.styleProps.marked && _extends({
    marginBottom: 20
  }, props.styleProps.orientation === 'vertical' && {
    marginBottom: 'auto',
    marginRight: 20
  }), (_extends6 = {}, _defineProperty(_extends6, "& .".concat(sliderClasses.valueLabelCircle), {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: 'currentColor',
    transform: 'rotate(-45deg)'
  }), _defineProperty(_extends6, "& .".concat(sliderClasses.valueLabelLabel), {
    color: props.theme.palette.primary.contrastText,
    transform: 'rotate(45deg)',
    textAlign: 'center'
  }), _extends6));
});
export var SliderRail = experimentalStyled('span', {}, {
  muiName: 'MuiSlider-rail'
})(function (props) {
  return _extends({
    display: 'block',
    position: 'absolute',
    width: '100%',
    height: 2,
    borderRadius: 1,
    backgroundColor: 'currentColor',
    opacity: 0.38
  }, props.styleProps.orientation === 'vertical' && {
    height: '100%',
    width: 2
  }, props.styleProps.track === 'inverted' && {
    opacity: 1
  });
});
export var SliderTrack = experimentalStyled('span', {}, {
  muiName: 'MuiSlider-track'
})(function (props) {
  return _extends({
    display: 'block',
    position: 'absolute',
    height: 2,
    borderRadius: 1,
    backgroundColor: 'currentColor'
  }, props.styleProps.orientation === 'vertical' && {
    width: 2
  }, props.styleProps.track === false && {
    display: 'none'
  }, props.styleProps.track === 'inverted' && {
    backgroundColor: // Same logic as the LinearProgress track color
    props.theme.palette.mode === 'light' ? lighten(props.theme.palette.primary.main, 0.62) : darken(props.theme.palette.primary.main, 0.5)
  });
});
export var SliderThumb = experimentalStyled('span', {}, {
  muiName: 'MuiSlider-thumb'
})(function (props) {
  var _extends7, _ref;

  return _extends((_extends7 = {
    position: 'absolute',
    width: 12,
    height: 12,
    marginLeft: -6,
    marginTop: -5,
    boxSizing: 'border-box',
    borderRadius: '50%',
    outline: 0,
    backgroundColor: 'currentColor',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: props.theme.transitions.create(['box-shadow'], {
      duration: props.theme.transitions.duration.shortest
    }),
    '&::after': {
      position: 'absolute',
      content: '""',
      borderRadius: '50%',
      // reach 42px hit target (2 * 15 + thumb diameter)
      left: -15,
      top: -15,
      right: -15,
      bottom: -15
    }
  }, _defineProperty(_extends7, "&:hover, &.".concat(sliderClasses.focusVisible), {
    boxShadow: "0px 0px 0px 8px ".concat(alpha(props.theme.palette.primary.main, 0.16)),
    '@media (hover: none)': {
      boxShadow: 'none'
    }
  }), _defineProperty(_extends7, "&.".concat(sliderClasses.active), {
    boxShadow: "0px 0px 0px 14px ".concat(alpha(props.theme.palette.primary.main, 0.16))
  }), _defineProperty(_extends7, "&.".concat(sliderClasses.disabled), {
    width: 8,
    height: 8,
    marginLeft: -4,
    marginTop: -3,
    '&:hover': {
      boxShadow: 'none'
    }
  }), _defineProperty(_extends7, "&.".concat(sliderClasses.vertical), {
    marginLeft: -5,
    marginBottom: -6
  }), _defineProperty(_extends7, "&.".concat(sliderClasses.vertical, "&.").concat(sliderClasses.disabled), {
    marginLeft: -3,
    marginBottom: -4
  }), _extends7), props.styleProps.color === 'secondary' && (_ref = {}, _defineProperty(_ref, "&:hover, &.".concat(sliderClasses.focusVisible), {
    boxShadow: "0px 0px 0px 8px ".concat(alpha(props.theme.palette.secondary.main, 0.16))
  }), _defineProperty(_ref, "&.".concat(sliderClasses.active), {
    boxShadow: "0px 0px 0px 14px ".concat(alpha(props.theme.palette.secondary.main, 0.16))
  }), _ref));
});
export var SliderValueLabel = experimentalStyled(SliderValueLabelUnstyled)(function (props) {
  var _extends8;

  return _extends((_extends8 = {
    // IE 11 centering bug, to remove from the customization demos once no longer supported
    left: 'calc(-50% - 4px)'
  }, _defineProperty(_extends8, "&.".concat(sliderClasses.valueLabelOpen), {
    transform: 'scale(1) translateY(-10px)'
  }), _defineProperty(_extends8, "zIndex", 1), _extends8), props.theme.typography.body2, {
    fontSize: props.theme.typography.pxToRem(12),
    lineHeight: 1.2,
    transition: props.theme.transitions.create(['transform'], {
      duration: props.theme.transitions.duration.shortest
    }),
    top: -34,
    transformOrigin: 'bottom center',
    transform: 'scale(0)',
    position: 'absolute'
  });
});
export var SliderMark = experimentalStyled('span', {}, {
  muiName: 'MuiSlider-mark'
})(function (props) {
  return _defineProperty({
    position: 'absolute',
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'currentColor'
  }, "&.".concat(sliderClasses.markActive), {
    backgroundColor: props.theme.palette.background.paper,
    opacity: 0.8
  });
});
export var SliderMarkLabel = experimentalStyled('span', {}, {
  muiName: 'MuiSlider-markLabel'
})(function (props) {
  return _extends({}, props.theme.typography.body2, {
    color: props.theme.palette.text.secondary,
    position: 'absolute',
    top: 26,
    transform: 'translateX(-50%)',
    whiteSpace: 'nowrap'
  }, props.styleProps.orientation === 'vertical' && {
    top: 'auto',
    left: 26,
    transform: 'translateY(50%)'
  }, _defineProperty({
    '@media (pointer: coarse)': _extends({
      top: 40
    }, props.styleProps.orientation === 'vertical' && {
      left: 31
    })
  }, "&.".concat(sliderClasses.markLabelActive), {
    color: props.theme.palette.text.primary
  }));
});
SliderRoot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * @ignore
   */
  children: PropTypes.node,

  /**
   * @ignore
   */
  styleProps: PropTypes.shape({
    'aria-label': PropTypes.string,
    'aria-labelledby': PropTypes.string,
    'aria-valuetext': PropTypes.string,
    classes: PropTypes.object,
    color: PropTypes.oneOf(['primary', 'secondary']),
    defaultValue: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    disabled: PropTypes.bool,
    getAriaLabel: PropTypes.func,
    getAriaValueText: PropTypes.func,
    isRtl: PropTypes.bool,
    marks: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.node,
      value: PropTypes.number.isRequired
    })), PropTypes.bool]),
    max: PropTypes.number,
    min: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onChangeCommitted: PropTypes.func,
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    scale: PropTypes.func,
    step: PropTypes.number,
    track: PropTypes.oneOf(['inverted', 'normal', false]),
    value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    valueLabelDisplay: PropTypes.oneOf(['auto', 'off', 'on']),
    valueLabelFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  })
};
var Slider = /*#__PURE__*/React.forwardRef(function Slider(inputProps, ref) {
  var props = useThemeProps({
    props: inputProps,
    name: 'MuiSlider'
  });

  var _props$components = props.components,
      components = _props$components === void 0 ? {} : _props$components,
      other = _objectWithoutProperties(props, ["components"]);

  return /*#__PURE__*/React.createElement(SliderUnstyled, _extends({}, other, {
    components: _extends({
      Root: SliderRoot,
      Rail: SliderRail,
      Track: SliderTrack,
      Thumb: SliderThumb,
      ValueLabel: SliderValueLabel,
      Mark: SliderMark,
      MarkLabel: SliderMarkLabel
    }, components),
    ref: ref
  }));
});
process.env.NODE_ENV !== "production" ? Slider.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The label of the slider.
   */
  'aria-label': chainPropTypes(PropTypes.string, function (props) {
    var range = Array.isArray(props.value || props.defaultValue);

    if (range && props['aria-label'] != null) {
      return new Error('Material-UI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.');
    }

    return null;
  }),

  /**
   * The id of the element containing a label for the slider.
   */
  'aria-labelledby': PropTypes.string,

  /**
   * A string value that provides a user-friendly name for the current value of the slider.
   */
  'aria-valuetext': chainPropTypes(PropTypes.string, function (props) {
    var range = Array.isArray(props.value || props.defaultValue);

    if (range && props['aria-valuetext'] != null) {
      return new Error('Material-UI: You need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range slider.');
    }

    return null;
  }),

  /**
   * @ignore
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes.oneOf(['primary', 'secondary']),

  /**
   * The components used for each slot inside the Slider.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Mark: PropTypes.elementType,
    MarkLabel: PropTypes.elementType,
    Rail: PropTypes.elementType,
    Root: PropTypes.elementType,
    Thumb: PropTypes.elementType,
    Track: PropTypes.elementType,
    ValueLabel: PropTypes.elementType
  }),

  /**
   * The props used for each slot inside the Slider.
   * @default {}
   */
  componentsProps: PropTypes.object,

  /**
   * The default element value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),

  /**
   * If `true`, the slider is disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.
   *
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaLabel: PropTypes.func,

  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.
   *
   * @param {number} value The thumb label's value to format.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaValueText: PropTypes.func,

  /**
   * Indicates whether the theme context has rtl direction. It is set automatically.
   * @default false
   */
  isRtl: PropTypes.bool,

  /**
   * Marks indicate predetermined values to which the user can move the slider.
   * If `true` the marks are spaced according the value of the `step` prop.
   * If an array, it should contain objects with `value` and an optional `label` keys.
   * @default false
   */
  marks: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.node,
    value: PropTypes.number.isRequired
  })), PropTypes.bool]),

  /**
   * The maximum allowed value of the slider.
   * Should not be equal to min.
   * @default 100
   */
  max: PropTypes.number,

  /**
   * The minimum allowed value of the slider.
   * Should not be equal to max.
   * @default 0
   */
  min: PropTypes.number,

  /**
   * Name attribute of the hidden `input` element.
   */
  name: PropTypes.string,

  /**
   * Callback function that is fired when the slider's value changed.
   *
   * @param {object} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   */
  onChange: PropTypes.func,

  /**
   * Callback function that is fired when the `mouseup` is triggered.
   *
   * @param {object} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   */
  onChangeCommitted: PropTypes.func,

  /**
   * The slider orientation.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),

  /**
   * A transformation function, to change the scale of the slider.
   * @default (x) => x
   */
  scale: PropTypes.func,

  /**
   * The granularity with which the slider can step through values. (A "discrete" slider.)
   * The `min` prop serves as the origin for the valid values.
   * We recommend (max - min) to be evenly divisible by the step.
   *
   * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
   * @default 1
   */
  step: PropTypes.number,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The track presentation:
   *
   * - `normal` the track will render a bar representing the slider value.
   * - `inverted` the track will render a bar representing the remaining slider value.
   * - `false` the track will render without a bar.
   * @default 'normal'
   */
  track: PropTypes.oneOf(['inverted', 'normal', false]),

  /**
   * The value of the slider.
   * For ranged sliders, provide an array with two values.
   */
  value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),

  /**
   * Controls when the value label is displayed:
   *
   * - `auto` the value label will display when the thumb is hovered or focused.
   * - `on` will display persistently.
   * - `off` will never display.
   * @default 'off'
   */
  valueLabelDisplay: PropTypes.oneOf(['auto', 'off', 'on']),

  /**
   * The format function the value label's value.
   *
   * When a function is provided, it should have the following signature:
   *
   * - {number} value The value label's value to format
   * - {number} index The value label's index to format
   * @default (x) => x
   */
  valueLabelFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
} : void 0;
export default Slider;