"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/utils");

var _unstyled = require("@material-ui/unstyled");

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _colorManipulator = require("../styles/colorManipulator");

var _dividerClasses = _interopRequireWildcard(require("./dividerClasses"));

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return (0, _utils.deepmerge)(styles.root || {}, (0, _extends2.default)({}, styleProps.absolute && styles.absolute, styles[styleProps.variant], styleProps.light && styles.light, styleProps.orientation === 'vertical' && styles.vertical, styleProps.flexItem && styles.flexItem, styleProps.children && styles.withChildren, styleProps.children && styleProps.orientation === 'vertical' && styles.withChildrenVertical, styleProps.textAlign === 'right' && styleProps.orientation !== 'vertical' && styles.textAlignRight, styleProps.textAlign === 'left' && styleProps.orientation !== 'vertical' && styles.textAlignLeft, {
    [`& .${_dividerClasses.default.wrapper}`]: (0, _extends2.default)({}, styles.wrapper, styleProps.orientation === 'vertical' && styles.wrapperVertical)
  }));
};

const useUtilityClasses = styleProps => {
  const {
    absolute,
    children,
    classes,
    flexItem,
    light,
    orientation,
    textAlign,
    variant
  } = styleProps;
  const slots = {
    root: ['root', absolute && 'absolute', variant, light && 'light', orientation === 'vertical' && 'vertical', flexItem && 'flexItem', children && 'withChildren', children && orientation === 'vertical' && 'withChildrenVertical', textAlign === 'right' && orientation !== 'vertical' && 'textAlignRight', textAlign === 'left' && orientation !== 'vertical' && 'textAlignLeft'],
    wrapper: ['wrapper', orientation === 'vertical' && 'wrapperVertical']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _dividerClasses.getDividerUtilityClass, classes);
};

const DividerRoot = (0, _experimentalStyled.default)('div', {}, {
  name: 'MuiDivider',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  /* Styles applied to the root element. */
  margin: 0,
  // Reset browser default style.
  flexShrink: 0,
  borderWidth: 0,
  borderStyle: 'solid',
  borderColor: theme.palette.divider,
  borderBottomWidth: 'thin'
}, styleProps.absolute && {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%'
}, styleProps.light && {
  borderColor: (0, _colorManipulator.alpha)(theme.palette.divider, 0.08)
}, styleProps.variant === 'inset' && {
  marginLeft: 72
}, styleProps.variant === 'middle' && {
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2)
}, styleProps.orientation === 'vertical' && {
  height: '100%',
  borderBottomWidth: 0,
  borderRightWidth: 'thin'
}, styleProps.flexItem && {
  alignSelf: 'stretch',
  height: 'auto'
}), ({
  theme,
  styleProps
}) => (0, _extends2.default)({}, styleProps.children && {
  display: 'flex',
  whiteSpace: 'nowrap',
  textAlign: 'center',
  border: 0,
  '&::before, &::after': {
    position: 'relative',
    width: '100%',
    borderTop: `thin solid ${theme.palette.divider}`,
    top: '50%',
    content: '""',
    transform: 'translateY(50%)'
  }
}), ({
  theme,
  styleProps
}) => (0, _extends2.default)({}, styleProps.children && styleProps.orientation === 'vertical' && {
  flexDirection: 'column',
  '&::before, &::after': {
    height: '100%',
    top: '0%',
    left: '50%',
    borderTop: 0,
    borderLeft: `thin solid ${theme.palette.divider}`,
    transform: 'translateX(0%)'
  }
}), ({
  styleProps
}) => (0, _extends2.default)({}, styleProps.textAlign === 'right' && styleProps.orientation !== 'vertical' && {
  '&::before': {
    width: '90%'
  },
  '&::after': {
    width: '10%'
  }
}, styleProps.textAlign === 'left' && styleProps.orientation !== 'vertical' && {
  '&::before': {
    width: '10%'
  },
  '&::after': {
    width: '90%'
  }
}));
const DividerWrapper = (0, _experimentalStyled.default)('span', {}, {
  name: 'MuiDivider',
  slot: 'Wrapper'
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  display: 'inline-block',
  paddingLeft: theme.spacing(1.2),
  paddingRight: theme.spacing(1.2)
}, styleProps.orientation === 'vertical' && {
  paddingTop: theme.spacing(1.2),
  paddingBottom: theme.spacing(1.2)
}));
const Divider = /*#__PURE__*/React.forwardRef(function Divider(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiDivider'
  });
  const {
    absolute = false,
    children,
    className,
    component = children ? 'div' : 'hr',
    flexItem = false,
    light = false,
    orientation = 'horizontal',
    role = component !== 'hr' ? 'separator' : undefined,
    textAlign = 'center',
    variant = 'fullWidth'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["absolute", "children", "className", "component", "flexItem", "light", "orientation", "role", "textAlign", "variant"]);
  const styleProps = (0, _extends2.default)({}, props, {
    absolute,
    component,
    flexItem,
    light,
    orientation,
    role,
    textAlign,
    variant
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/React.createElement(DividerRoot, (0, _extends2.default)({
    as: component,
    className: (0, _clsx.default)(classes.root, className),
    role: role,
    ref: ref,
    styleProps: styleProps
  }, other), children ? /*#__PURE__*/React.createElement(DividerWrapper, {
    className: classes.wrapper,
    styleProps: styleProps
  }, children) : null);
});
process.env.NODE_ENV !== "production" ? Divider.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Absolutely position the element.
   * @default false
   */
  absolute: _propTypes.default.bool,

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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * If `true`, a vertical divider will have the correct height when used in flex container.
   * (By default, a vertical divider will have a calculated height of `0px` if it is the child of a flex container.)
   * @default false
   */
  flexItem: _propTypes.default.bool,

  /**
   * If `true`, the divider will have a lighter color.
   * @default false
   */
  light: _propTypes.default.bool,

  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: _propTypes.default.oneOf(['horizontal', 'vertical']),

  /**
   * @ignore
   */
  role: _propTypes.default.string,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The text alignment.
   * @default 'center'
   */
  textAlign: _propTypes.default.oneOf(['center', 'left', 'right']),

  /**
   * The variant to use.
   * @default 'fullWidth'
   */
  variant: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['fullWidth', 'inset', 'middle']), _propTypes.default.string])
} : void 0;
var _default = Divider;
exports.default = _default;