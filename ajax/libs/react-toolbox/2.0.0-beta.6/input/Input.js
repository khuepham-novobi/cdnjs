'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = exports.inputFactory = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames4 = require('classnames');

var _classnames5 = _interopRequireDefault(_classnames4);

var _reactCssThemr = require('react-css-themr');

var _identifiers = require('../identifiers');

var _FontIcon = require('../font_icon/FontIcon');

var _FontIcon2 = _interopRequireDefault(_FontIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var factory = function factory(FontIcon) {
  var Input = function (_React$Component) {
    _inherits(Input, _React$Component);

    function Input() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Input);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Input.__proto__ || Object.getPrototypeOf(Input)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (event) {
        var _this$props = _this.props,
            onChange = _this$props.onChange,
            multiline = _this$props.multiline,
            maxLength = _this$props.maxLength;

        var valueFromEvent = event.target.value;

        // Trim value to maxLength if that exists (only on multiline inputs).
        // Note that this is still required even tho we have the onKeyPress filter
        // because the user could paste smt in the textarea.
        var haveToTrim = multiline && maxLength && event.target.value.length > maxLength;
        var value = haveToTrim ? valueFromEvent.substr(0, maxLength) : valueFromEvent;

        // propagate to to store and therefore to the input
        if (onChange) onChange(value, event);
      }, _this.handleAutoresize = function () {
        var element = _this.inputNode;
        var rows = _this.props.rows;

        if (typeof rows === 'number' && !isNaN(rows)) {
          element.style.height = null;
        } else {
          // compute the height difference between inner height and outer height
          var style = getComputedStyle(element, null);
          var heightOffset = style.boxSizing === 'content-box' ? -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom)) : parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);

          // resize the input to its content size
          element.style.height = 'auto';
          element.style.height = element.scrollHeight + heightOffset + 'px';
        }
      }, _this.handleKeyPress = function (event) {
        // prevent insertion of more characters if we're a multiline input
        // and maxLength exists
        var _this$props2 = _this.props,
            multiline = _this$props2.multiline,
            maxLength = _this$props2.maxLength,
            onKeyPress = _this$props2.onKeyPress;

        if (multiline && maxLength) {
          // check if smt is selected, in which case the newly added charcter would
          // replace the selected characters, so the length of value doesn't actually
          // increase.
          var isReplacing = event.target.selectionEnd - event.target.selectionStart;
          var value = event.target.value;

          if (!isReplacing && value.length === maxLength) {
            event.preventDefault();
            event.stopPropagation();
            return undefined;
          }
        }

        if (onKeyPress) onKeyPress(event);
        return undefined;
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Input, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (this.props.multiline) {
          window.addEventListener('resize', this.handleAutoresize);
          this.handleAutoresize();
        }
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (!this.props.multiline && nextProps.multiline) {
          window.addEventListener('resize', this.handleAutoresize);
        } else if (this.props.multiline && !nextProps.multiline) {
          window.removeEventListener('resize', this.handleAutoresize);
        }
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        // resize the textarea, if nessesary
        if (this.props.multiline) this.handleAutoresize();
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.props.multiline) window.removeEventListener('resize', this.handleAutoresize);
      }
    }, {
      key: 'blur',
      value: function blur() {
        this.inputNode.blur();
      }
    }, {
      key: 'focus',
      value: function focus() {
        this.inputNode.focus();
      }
    }, {
      key: 'render',
      value: function render() {
        var _classnames2,
            _this2 = this;

        var _props = this.props,
            children = _props.children,
            disabled = _props.disabled,
            error = _props.error,
            floating = _props.floating,
            hint = _props.hint,
            icon = _props.icon,
            name = _props.name,
            labelText = _props.label,
            maxLength = _props.maxLength,
            multiline = _props.multiline,
            required = _props.required,
            theme = _props.theme,
            type = _props.type,
            value = _props.value,
            onKeyPress = _props.onKeyPress,
            _props$rows = _props.rows,
            rows = _props$rows === undefined ? 1 : _props$rows,
            others = _objectWithoutProperties(_props, ['children', 'disabled', 'error', 'floating', 'hint', 'icon', 'name', 'label', 'maxLength', 'multiline', 'required', 'theme', 'type', 'value', 'onKeyPress', 'rows']);

        var length = maxLength && value ? value.length : 0;
        var labelClassName = (0, _classnames5.default)(theme.label, _defineProperty({}, theme.fixed, !floating));

        var className = (0, _classnames5.default)(theme.input, (_classnames2 = {}, _defineProperty(_classnames2, theme.disabled, disabled), _defineProperty(_classnames2, theme.errored, error), _defineProperty(_classnames2, theme.hidden, type === 'hidden'), _defineProperty(_classnames2, theme.withIcon, icon), _classnames2), this.props.className);

        var valuePresent = value !== null && value !== undefined && value !== '' && !((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === Number && isNaN(value)); // eslint-disable-line

        var inputElementProps = _extends({}, others, {
          className: (0, _classnames5.default)(theme.inputElement, _defineProperty({}, theme.filled, valuePresent)),
          onChange: this.handleChange,
          ref: function ref(node) {
            _this2.inputNode = node;
          },
          role: 'input',
          name: name,
          disabled: disabled,
          required: required,
          type: type,
          value: value
        });
        if (!multiline) {
          inputElementProps.maxLength = maxLength;
          inputElementProps.onKeyPress = onKeyPress;
        } else {
          inputElementProps.rows = rows;
          inputElementProps.onKeyPress = this.handleKeyPress;
        }

        return _react2.default.createElement(
          'div',
          { 'data-react-toolbox': 'input', className: className },
          _react2.default.createElement(multiline ? 'textarea' : 'input', inputElementProps),
          icon ? _react2.default.createElement(FontIcon, { className: theme.icon, value: icon }) : null,
          _react2.default.createElement('span', { className: theme.bar }),
          labelText ? _react2.default.createElement(
            'label',
            { className: labelClassName, htmlFor: name },
            labelText,
            required ? _react2.default.createElement(
              'span',
              { className: theme.required },
              ' * '
            ) : null
          ) : null,
          hint ? _react2.default.createElement(
            'span',
            { hidden: labelText, className: theme.hint },
            hint
          ) : null,
          error ? _react2.default.createElement(
            'span',
            { className: theme.error },
            error
          ) : null,
          maxLength ? _react2.default.createElement(
            'span',
            { className: theme.counter },
            length,
            '/',
            maxLength
          ) : null,
          children
        );
      }
    }]);

    return Input;
  }(_react2.default.Component);

  Input.propTypes = {
    children: _react.PropTypes.node,
    className: _react.PropTypes.string,
    disabled: _react.PropTypes.bool,
    error: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node]),
    floating: _react.PropTypes.bool,
    hint: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node]),
    icon: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.element]),
    label: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node]),
    maxLength: _react.PropTypes.number,
    multiline: _react.PropTypes.bool,
    name: _react.PropTypes.string,
    onBlur: _react.PropTypes.func,
    onChange: _react.PropTypes.func,
    onFocus: _react.PropTypes.func,
    onKeyPress: _react.PropTypes.func,
    required: _react.PropTypes.bool,
    rows: _react.PropTypes.number,
    theme: _react.PropTypes.shape({
      bar: _react.PropTypes.string,
      counter: _react.PropTypes.string,
      disabled: _react.PropTypes.string,
      error: _react.PropTypes.string,
      errored: _react.PropTypes.string,
      hidden: _react.PropTypes.string,
      hint: _react.PropTypes.string,
      icon: _react.PropTypes.string,
      input: _react.PropTypes.string,
      inputElement: _react.PropTypes.string,
      required: _react.PropTypes.string,
      withIcon: _react.PropTypes.string
    }),
    type: _react.PropTypes.string,
    value: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string])
  };
  Input.defaultProps = {
    className: '',
    hint: '',
    disabled: false,
    floating: true,
    multiline: false,
    required: false,
    type: 'text'
  };


  return Input;
};

var Input = factory(_FontIcon2.default);
exports.default = (0, _reactCssThemr.themr)(_identifiers.INPUT, null, { withRef: true })(Input);
exports.inputFactory = factory;
exports.Input = Input;