"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "sliderClasses", {
  enumerable: true,
  get: function () {
    return _unstyled.sliderClasses;
  }
});
exports.default = exports.SliderMarkLabel = exports.SliderMark = exports.SliderValueLabel = exports.SliderThumb = exports.SliderTrack = exports.SliderRail = exports.SliderRoot = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("@material-ui/utils");

var _unstyled = require("@material-ui/unstyled");

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

var _colorManipulator = require("../styles/colorManipulator");

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

const overridesResolver = (props, styles) => {
  const {
    color = 'primary',
    marks: marksProp = false,
    max = 100,
    min = 0,
    orientation = 'horizontal',
    step = 1,
    track = 'normal'
  } = props;
  const marks = marksProp === true && step !== null ? [...Array(Math.floor((max - min) / step) + 1)].map((_, index) => ({
    value: min + step * index
  })) : marksProp || [];
  const marked = marks.length > 0 && marks.some(mark => mark.label);
  const styleOverrides = (0, _extends2.default)({}, styles.root, styles[`color${(0, _capitalize.default)(color)}`], {
    [`&.${_unstyled.sliderClasses.disabled}`]: styles.disabled
  }, marked && styles.marked, orientation === 'vertical' && styles.vertical, track === 'inverted' && styles.trackInverted, track === false && styles.trackFalse, {
    [`& .${_unstyled.sliderClasses.rail}`]: styles.rail,
    [`& .${_unstyled.sliderClasses.track}`]: styles.track,
    [`& .${_unstyled.sliderClasses.mark}`]: styles.mark,
    [`& .${_unstyled.sliderClasses.markLabel}`]: styles.markLabel,
    [`& .${_unstyled.sliderClasses.valueLabel}`]: styles.valueLabel,
    [`& .${_unstyled.sliderClasses.thumb}`]: (0, _extends2.default)({}, styles.thumb, styles[`thumbColor${(0, _capitalize.default)(color)}`], {
      [`&.${_unstyled.sliderClasses.disabled}`]: styles.disabled
    })
  });
  return styleOverrides;
};

const SliderRoot = (0, _experimentalStyled.default)('span', {}, {
  muiName: 'MuiSlider',
  overridesResolver
})(props => (0, _extends2.default)({
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
}, {
  [`&.${_unstyled.sliderClasses.disabled}`]: {
    pointerEvents: 'none',
    cursor: 'default',
    color: props.theme.palette.grey[400]
  }
}, props.styleProps.orientation === 'vertical' && {
  width: 2,
  height: '100%',
  padding: '0 13px'
}, {
  // The primary input mechanism of the device includes a pointing device of limited accuracy.
  '@media (pointer: coarse)': (0, _extends2.default)({
    // Reach 42px touch target, about ~8mm on screen.
    padding: '20px 0'
  }, props.styleProps.orientation === 'vertical' && {
    padding: '0 20px'
  }),
  '@media print': {
    colorAdjust: 'exact'
  }
}, props.styleProps.marked && (0, _extends2.default)({
  marginBottom: 20
}, props.styleProps.orientation === 'vertical' && {
  marginBottom: 'auto',
  marginRight: 20
}), {
  [`& .${_unstyled.sliderClasses.valueLabelCircle}`]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: 'currentColor',
    transform: 'rotate(-45deg)'
  },
  [`& .${_unstyled.sliderClasses.valueLabelLabel}`]: {
    color: props.theme.palette.primary.contrastText,
    transform: 'rotate(45deg)',
    textAlign: 'center'
  }
}));
exports.SliderRoot = SliderRoot;
const SliderRail = (0, _experimentalStyled.default)('span', {}, {
  muiName: 'MuiSlider-rail'
})(props => (0, _extends2.default)({
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
}));
exports.SliderRail = SliderRail;
const SliderTrack = (0, _experimentalStyled.default)('span', {}, {
  muiName: 'MuiSlider-track'
})(props => (0, _extends2.default)({
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
  props.theme.palette.mode === 'light' ? (0, _colorManipulator.lighten)(props.theme.palette.primary.main, 0.62) : (0, _colorManipulator.darken)(props.theme.palette.primary.main, 0.5)
}));
exports.SliderTrack = SliderTrack;
const SliderThumb = (0, _experimentalStyled.default)('span', {}, {
  muiName: 'MuiSlider-thumb'
})(props => (0, _extends2.default)({
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
  },
  [`&:hover, &.${_unstyled.sliderClasses.focusVisible}`]: {
    boxShadow: `0px 0px 0px 8px ${(0, _colorManipulator.alpha)(props.theme.palette.primary.main, 0.16)}`,
    '@media (hover: none)': {
      boxShadow: 'none'
    }
  },
  [`&.${_unstyled.sliderClasses.active}`]: {
    boxShadow: `0px 0px 0px 14px ${(0, _colorManipulator.alpha)(props.theme.palette.primary.main, 0.16)}`
  },
  [`&.${_unstyled.sliderClasses.disabled}`]: {
    width: 8,
    height: 8,
    marginLeft: -4,
    marginTop: -3,
    '&:hover': {
      boxShadow: 'none'
    }
  },
  [`&.${_unstyled.sliderClasses.vertical}`]: {
    marginLeft: -5,
    marginBottom: -6
  },
  [`&.${_unstyled.sliderClasses.vertical}&.${_unstyled.sliderClasses.disabled}`]: {
    marginLeft: -3,
    marginBottom: -4
  }
}, props.styleProps.color === 'secondary' && {
  [`&:hover, &.${_unstyled.sliderClasses.focusVisible}`]: {
    boxShadow: `0px 0px 0px 8px ${(0, _colorManipulator.alpha)(props.theme.palette.secondary.main, 0.16)}`
  },
  [`&.${_unstyled.sliderClasses.active}`]: {
    boxShadow: `0px 0px 0px 14px ${(0, _colorManipulator.alpha)(props.theme.palette.secondary.main, 0.16)}`
  }
}));
exports.SliderThumb = SliderThumb;
const SliderValueLabel = (0, _experimentalStyled.default)(_unstyled.SliderValueLabelUnstyled)(props => (0, _extends2.default)({
  // IE 11 centering bug, to remove from the customization demos once no longer supported
  left: 'calc(-50% - 4px)',
  [`&.${_unstyled.sliderClasses.valueLabelOpen}`]: {
    transform: 'scale(1) translateY(-10px)'
  },
  zIndex: 1
}, props.theme.typography.body2, {
  fontSize: props.theme.typography.pxToRem(12),
  lineHeight: 1.2,
  transition: props.theme.transitions.create(['transform'], {
    duration: props.theme.transitions.duration.shortest
  }),
  top: -34,
  transformOrigin: 'bottom center',
  transform: 'scale(0)',
  position: 'absolute'
}));
exports.SliderValueLabel = SliderValueLabel;
const SliderMark = (0, _experimentalStyled.default)('span', {}, {
  muiName: 'MuiSlider-mark'
})(props => ({
  position: 'absolute',
  width: 2,
  height: 2,
  borderRadius: 1,
  backgroundColor: 'currentColor',
  [`&.${_unstyled.sliderClasses.markActive}`]: {
    backgroundColor: props.theme.palette.background.paper,
    opacity: 0.8
  }
}));
exports.SliderMark = SliderMark;
const SliderMarkLabel = (0, _experimentalStyled.default)('span', {}, {
  muiName: 'MuiSlider-markLabel'
})(props => (0, _extends2.default)({}, props.theme.typography.body2, {
  color: props.theme.palette.text.secondary,
  position: 'absolute',
  top: 26,
  transform: 'translateX(-50%)',
  whiteSpace: 'nowrap'
}, props.styleProps.orientation === 'vertical' && {
  top: 'auto',
  left: 26,
  transform: 'translateY(50%)'
}, {
  '@media (pointer: coarse)': (0, _extends2.default)({
    top: 40
  }, props.styleProps.orientation === 'vertical' && {
    left: 31
  }),
  [`&.${_unstyled.sliderClasses.markLabelActive}`]: {
    color: props.theme.palette.text.primary
  }
}));
exports.SliderMarkLabel = SliderMarkLabel;
SliderRoot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * @ignore
   */
  children: _propTypes.default.node,

  /**
   * @ignore
   */
  styleProps: _propTypes.default.shape({
    'aria-label': _propTypes.default.string,
    'aria-labelledby': _propTypes.default.string,
    'aria-valuetext': _propTypes.default.string,
    classes: _propTypes.default.object,
    color: _propTypes.default.oneOf(['primary', 'secondary']),
    defaultValue: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.number), _propTypes.default.number]),
    disabled: _propTypes.default.bool,
    getAriaLabel: _propTypes.default.func,
    getAriaValueText: _propTypes.default.func,
    isRtl: _propTypes.default.bool,
    marks: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.shape({
      label: _propTypes.default.node,
      value: _propTypes.default.number.isRequired
    })), _propTypes.default.bool]),
    max: _propTypes.default.number,
    min: _propTypes.default.number,
    name: _propTypes.default.string,
    onChange: _propTypes.default.func,
    onChangeCommitted: _propTypes.default.func,
    orientation: _propTypes.default.oneOf(['horizontal', 'vertical']),
    scale: _propTypes.default.func,
    step: _propTypes.default.number,
    track: _propTypes.default.oneOf(['inverted', 'normal', false]),
    value: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.number), _propTypes.default.number]),
    valueLabelDisplay: _propTypes.default.oneOf(['auto', 'off', 'on']),
    valueLabelFormat: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.string])
  })
};
const Slider = /*#__PURE__*/React.forwardRef(function Slider(inputProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inputProps,
    name: 'MuiSlider'
  });
  const {
    components = {}
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["components"]);
  return /*#__PURE__*/React.createElement(_unstyled.SliderUnstyled, (0, _extends2.default)({}, other, {
    components: (0, _extends2.default)({
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
  'aria-label': (0, _utils.chainPropTypes)(_propTypes.default.string, props => {
    const range = Array.isArray(props.value || props.defaultValue);

    if (range && props['aria-label'] != null) {
      return new Error('Material-UI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.');
    }

    return null;
  }),

  /**
   * The id of the element containing a label for the slider.
   */
  'aria-labelledby': _propTypes.default.string,

  /**
   * A string value that provides a user-friendly name for the current value of the slider.
   */
  'aria-valuetext': (0, _utils.chainPropTypes)(_propTypes.default.string, props => {
    const range = Array.isArray(props.value || props.defaultValue);

    if (range && props['aria-valuetext'] != null) {
      return new Error('Material-UI: You need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range slider.');
    }

    return null;
  }),

  /**
   * @ignore
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: _propTypes.default.oneOf(['primary', 'secondary']),

  /**
   * The components used for each slot inside the Slider.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: _propTypes.default.shape({
    Mark: _propTypes.default.elementType,
    MarkLabel: _propTypes.default.elementType,
    Rail: _propTypes.default.elementType,
    Root: _propTypes.default.elementType,
    Thumb: _propTypes.default.elementType,
    Track: _propTypes.default.elementType,
    ValueLabel: _propTypes.default.elementType
  }),

  /**
   * The props used for each slot inside the Slider.
   * @default {}
   */
  componentsProps: _propTypes.default.object,

  /**
   * The default element value. Use when the component is not controlled.
   */
  defaultValue: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.number), _propTypes.default.number]),

  /**
   * If `true`, the slider is disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,

  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.
   *
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaLabel: _propTypes.default.func,

  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.
   *
   * @param {number} value The thumb label's value to format.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaValueText: _propTypes.default.func,

  /**
   * Indicates whether the theme context has rtl direction. It is set automatically.
   * @default false
   */
  isRtl: _propTypes.default.bool,

  /**
   * Marks indicate predetermined values to which the user can move the slider.
   * If `true` the marks are spaced according the value of the `step` prop.
   * If an array, it should contain objects with `value` and an optional `label` keys.
   * @default false
   */
  marks: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.shape({
    label: _propTypes.default.node,
    value: _propTypes.default.number.isRequired
  })), _propTypes.default.bool]),

  /**
   * The maximum allowed value of the slider.
   * Should not be equal to min.
   * @default 100
   */
  max: _propTypes.default.number,

  /**
   * The minimum allowed value of the slider.
   * Should not be equal to max.
   * @default 0
   */
  min: _propTypes.default.number,

  /**
   * Name attribute of the hidden `input` element.
   */
  name: _propTypes.default.string,

  /**
   * Callback function that is fired when the slider's value changed.
   *
   * @param {object} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   */
  onChange: _propTypes.default.func,

  /**
   * Callback function that is fired when the `mouseup` is triggered.
   *
   * @param {object} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   */
  onChangeCommitted: _propTypes.default.func,

  /**
   * The slider orientation.
   * @default 'horizontal'
   */
  orientation: _propTypes.default.oneOf(['horizontal', 'vertical']),

  /**
   * A transformation function, to change the scale of the slider.
   * @default (x) => x
   */
  scale: _propTypes.default.func,

  /**
   * The granularity with which the slider can step through values. (A "discrete" slider.)
   * The `min` prop serves as the origin for the valid values.
   * We recommend (max - min) to be evenly divisible by the step.
   *
   * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
   * @default 1
   */
  step: _propTypes.default.number,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The track presentation:
   *
   * - `normal` the track will render a bar representing the slider value.
   * - `inverted` the track will render a bar representing the remaining slider value.
   * - `false` the track will render without a bar.
   * @default 'normal'
   */
  track: _propTypes.default.oneOf(['inverted', 'normal', false]),

  /**
   * The value of the slider.
   * For ranged sliders, provide an array with two values.
   */
  value: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.number), _propTypes.default.number]),

  /**
   * Controls when the value label is displayed:
   *
   * - `auto` the value label will display when the thumb is hovered or focused.
   * - `on` will display persistently.
   * - `off` will never display.
   * @default 'off'
   */
  valueLabelDisplay: _propTypes.default.oneOf(['auto', 'off', 'on']),

  /**
   * The format function the value label's value.
   *
   * When a function is provided, it should have the following signature:
   *
   * - {number} value The value label's value to format
   * - {number} index The value label's index to format
   * @default (x) => x
   */
  valueLabelFormat: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.string])
} : void 0;
var _default = Slider;
exports.default = _default;