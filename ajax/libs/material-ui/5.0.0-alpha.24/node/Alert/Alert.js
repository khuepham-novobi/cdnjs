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

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _Paper = _interopRequireDefault(require("../Paper"));

var _alertClasses = _interopRequireWildcard(require("./alertClasses"));

var _IconButton = _interopRequireDefault(require("../IconButton"));

var _SuccessOutlined = _interopRequireDefault(require("../internal/svg-icons/SuccessOutlined"));

var _ReportProblemOutlined = _interopRequireDefault(require("../internal/svg-icons/ReportProblemOutlined"));

var _ErrorOutline = _interopRequireDefault(require("../internal/svg-icons/ErrorOutline"));

var _InfoOutlined = _interopRequireDefault(require("../internal/svg-icons/InfoOutlined"));

var _Close = _interopRequireDefault(require("../internal/svg-icons/Close"));

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return (0, _utils.deepmerge)(styles.root || {}, (0, _extends2.default)({}, styles[styleProps.variant], styles[`${styleProps.variant}${(0, _capitalize.default)(styleProps.color || styleProps.severity)}`], {
    [`& .${_alertClasses.default.icon}`]: styles.icon,
    [`& .${_alertClasses.default.message}`]: styles.message,
    [`& .${_alertClasses.default.action}`]: styles.action
  }));
};

const useUtilityClasses = styleProps => {
  const {
    variant,
    color,
    severity,
    classes
  } = styleProps;
  const slots = {
    root: ['root', `${variant}${(0, _capitalize.default)(color || severity)}`, `${variant}`],
    icon: ['icon'],
    message: ['message'],
    action: ['action']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _alertClasses.getAlertUtilityClass, classes);
};

const AlertRoot = (0, _experimentalStyled.default)(_Paper.default, {}, {
  name: 'MuiAlert',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  styleProps
}) => {
  const getColor = theme.palette.mode === 'light' ? _colorManipulator.darken : _colorManipulator.lighten;
  const getBackgroundColor = theme.palette.mode === 'light' ? _colorManipulator.lighten : _colorManipulator.darken;
  const color = styleProps.color || styleProps.severity;
  return (0, _extends2.default)({}, theme.typography.body2, {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'transparent',
    display: 'flex',
    padding: '6px 16px'
  }, color && styleProps.variant === 'standard' && {
    color: getColor(theme.palette[color].main, 0.6),
    backgroundColor: getBackgroundColor(theme.palette[color].main, 0.9),
    [`& .${_alertClasses.default.icon}`]: {
      color: theme.palette[color].main
    }
  }, color && styleProps.variant === 'outlined' && {
    color: getColor(theme.palette[color].main, 0.6),
    border: `1px solid ${theme.palette[color].main}`,
    [`& .${_alertClasses.default.icon}`]: {
      color: theme.palette[color].main
    }
  }, color && styleProps.variant === 'filled' && {
    color: '#fff',
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: theme.palette[color].main
  });
});
/* Styles applied to the icon wrapper element. */

const AlertIcon = (0, _experimentalStyled.default)('div', {}, {
  name: 'MuiAlert',
  slot: 'Icon'
})({
  marginRight: 12,
  padding: '7px 0',
  display: 'flex',
  fontSize: 22,
  opacity: 0.9
});
/* Styles applied to the message wrapper element. */

const AlertMessage = (0, _experimentalStyled.default)('div', {}, {
  name: 'MuiAlert',
  slot: 'Message'
})({
  padding: '8px 0'
});
/* Styles applied to the action wrapper element if `action` is provided. */

const AlertAction = (0, _experimentalStyled.default)('div', {}, {
  name: 'MuiAlert',
  slot: 'Action'
})({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  paddingLeft: 16,
  marginRight: -8
});
const defaultIconMapping = {
  success: /*#__PURE__*/React.createElement(_SuccessOutlined.default, {
    fontSize: "inherit"
  }),
  warning: /*#__PURE__*/React.createElement(_ReportProblemOutlined.default, {
    fontSize: "inherit"
  }),
  error: /*#__PURE__*/React.createElement(_ErrorOutline.default, {
    fontSize: "inherit"
  }),
  info: /*#__PURE__*/React.createElement(_InfoOutlined.default, {
    fontSize: "inherit"
  })
};

var _ref = /*#__PURE__*/React.createElement(_Close.default, {
  fontSize: "small"
});

const Alert = /*#__PURE__*/React.forwardRef(function Alert(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiAlert'
  });
  const {
    action,
    children,
    className,
    closeText = 'Close',
    color,
    icon,
    iconMapping = defaultIconMapping,
    onClose,
    role = 'alert',
    severity = 'success',
    variant = 'standard'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["action", "children", "className", "closeText", "color", "icon", "iconMapping", "onClose", "role", "severity", "variant"]);
  const styleProps = (0, _extends2.default)({}, props, {
    variant,
    color,
    severity
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/React.createElement(AlertRoot, (0, _extends2.default)({
    role: role,
    square: true,
    elevation: 0,
    styleProps: styleProps,
    className: (0, _clsx.default)(classes.root, className),
    ref: ref
  }, other), icon !== false ? /*#__PURE__*/React.createElement(AlertIcon, {
    styleProps: styleProps,
    className: classes.icon
  }, icon || iconMapping[severity] || defaultIconMapping[severity]) : null, /*#__PURE__*/React.createElement(AlertMessage, {
    styleProps: styleProps,
    className: classes.message
  }, children), action != null ? /*#__PURE__*/React.createElement(AlertAction, {
    className: classes.action
  }, action) : null, action == null && onClose ? /*#__PURE__*/React.createElement(AlertAction, {
    styleProps: styleProps,
    className: classes.action
  }, /*#__PURE__*/React.createElement(_IconButton.default, {
    size: "small",
    "aria-label": closeText,
    title: closeText,
    color: "inherit",
    onClick: onClose
  }, _ref)) : null);
});
process.env.NODE_ENV !== "production" ? Alert.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The action to display. It renders after the message, at the end of the alert.
   */
  action: _propTypes.default.node,

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
   * Override the default label for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Close'
   */
  closeText: _propTypes.default.string,

  /**
   * The main color for the alert. Unless provided, the value is taken from the `severity` prop.
   */
  color: _propTypes.default.oneOf(['error', 'info', 'success', 'warning']),

  /**
   * Override the icon displayed before the children.
   * Unless provided, the icon is mapped to the value of the `severity` prop.
   */
  icon: _propTypes.default.node,

  /**
   * The component maps the `severity` prop to a range of different icons,
   * for instance success to `<SuccessOutlined>`.
   * If you wish to change this mapping, you can provide your own.
   * Alternatively, you can use the `icon` prop to override the icon displayed.
   */
  iconMapping: _propTypes.default.shape({
    error: _propTypes.default.node,
    info: _propTypes.default.node,
    success: _propTypes.default.node,
    warning: _propTypes.default.node
  }),

  /**
   * Callback fired when the component requests to be closed.
   * When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.
   *
   * @param {object} event The event source of the callback.
   */
  onClose: _propTypes.default.func,

  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role: _propTypes.default.string,

  /**
   * The severity of the alert. This defines the color and icon used.
   * @default 'success'
   */
  severity: _propTypes.default.oneOf(['error', 'info', 'success', 'warning']),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The variant to use.
   * @default 'standard'
   */
  variant: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['filled', 'outlined', 'standard']), _propTypes.default.string])
} : void 0;
var _default = Alert;
exports.default = _default;