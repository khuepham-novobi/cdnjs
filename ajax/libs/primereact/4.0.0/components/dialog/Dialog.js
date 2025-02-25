"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Dialog = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _classnames = _interopRequireDefault(require("classnames"));

var _UniqueComponentId = _interopRequireDefault(require("../utils/UniqueComponentId"));

var _reactTransitionGroup = require("react-transition-group");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Dialog =
/*#__PURE__*/
function (_Component) {
  _inherits(Dialog, _Component);

  function Dialog(props) {
    var _this;

    _classCallCheck(this, Dialog);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dialog).call(this, props));
    _this.state = {
      maximized: false,
      maskVisible: props.visible
    };
    _this.onClose = _this.onClose.bind(_assertThisInitialized(_this));
    _this.toggleMaximize = _this.toggleMaximize.bind(_assertThisInitialized(_this));
    _this.onMaskClick = _this.onMaskClick.bind(_assertThisInitialized(_this));
    _this.onDialogClick = _this.onDialogClick.bind(_assertThisInitialized(_this));
    _this.onEntered = _this.onEntered.bind(_assertThisInitialized(_this));
    _this.onExit = _this.onExit.bind(_assertThisInitialized(_this));
    _this.onExited = _this.onExited.bind(_assertThisInitialized(_this));
    _this.id = _this.props.id || (0, _UniqueComponentId.default)();
    return _this;
  }

  _createClass(Dialog, [{
    key: "onClose",
    value: function onClose(event) {
      this.props.onHide();
      event.preventDefault();
    }
  }, {
    key: "focus",
    value: function focus() {
      var focusable = _DomHandler.default.findSingle(this.dialog, 'button');

      if (focusable) {
        focusable.focus();
      }
    }
  }, {
    key: "onMaskClick",
    value: function onMaskClick(event) {
      if (this.props.modal && this.props.closable && this.props.dismissableMask) {
        this.onClose(event);
      }
    }
  }, {
    key: "onDialogClick",
    value: function onDialogClick(event) {
      event.stopPropagation();
    }
  }, {
    key: "toggleMaximize",
    value: function toggleMaximize(event) {
      var _this2 = this;

      this.setState({
        maximized: !this.state.maximized
      }, function () {
        if (!_this2.props.blockScroll) {
          var funcName = _this2.state.maximized ? 'addClass' : 'removeClass';

          _DomHandler.default[funcName](document.body, 'p-overflow-hidden');
        }
      });
      event.preventDefault();
    }
  }, {
    key: "getPositionClass",
    value: function getPositionClass() {
      var _this3 = this;

      var positions = ['center', 'left', 'right', 'top', 'topleft', 'topright', 'bottom', 'bottomleft', 'bottomright'];
      var pos = positions.find(function (item) {
        return item === _this3.props.position;
      });
      return pos ? "p-dialog-".concat(pos) : '';
    }
  }, {
    key: "onEntered",
    value: function onEntered() {
      if (this.props.onShow) {
        this.props.onShow();
      }

      if (this.props.focusOnShow) {
        this.focus();
      }

      this.enableDocumentSettings();
    }
  }, {
    key: "onExit",
    value: function onExit() {
      this.props.onHide();
    }
  }, {
    key: "onExited",
    value: function onExited() {
      this.setState({
        maskVisible: false
      });
      this.disableDocumentSettings();
    }
  }, {
    key: "enableDocumentSettings",
    value: function enableDocumentSettings() {
      if (this.props.modal) {
        this.bindGlobalListeners();
      }

      if (this.props.blockScroll || this.props.maximizable && this.state.maximized) {
        _DomHandler.default.addClass(document.body, 'p-overflow-hidden');
      }
    }
  }, {
    key: "disableDocumentSettings",
    value: function disableDocumentSettings() {
      if (this.props.modal) {
        this.unbindGlobalListeners();
        var hasBlockScroll = document.primeDialogParams && document.primeDialogParams.some(function (param) {
          return param.hasBlockScroll;
        });

        if (!hasBlockScroll) {
          _DomHandler.default.removeClass(document.body, 'p-overflow-hidden');
        }
      } else if (this.props.blockScroll || this.props.maximizable && this.state.maximized) {
        _DomHandler.default.removeClass(document.body, 'p-overflow-hidden');
      }
    }
  }, {
    key: "bindGlobalListeners",
    value: function bindGlobalListeners() {
      if (this.props.closeOnEscape && this.props.closable) {
        this.bindDocumentKeyDownListener();
      }
    }
  }, {
    key: "unbindGlobalListeners",
    value: function unbindGlobalListeners() {
      this.unbindDocumentKeyDownListener();
    }
  }, {
    key: "bindDocumentKeyDownListener",
    value: function bindDocumentKeyDownListener() {
      var _this4 = this;

      this.documentKeyDownListener = function (event) {
        var currentTarget = event.currentTarget;

        if (currentTarget && currentTarget.primeDialogParams) {
          var params = currentTarget.primeDialogParams;
          var paramLength = params.length;
          var dialogId = params[paramLength - 1].id;

          if (dialogId === _this4.id) {
            var dialog = document.getElementById(dialogId);

            if (event.which === 27) {
              _this4.onClose(event);

              event.stopImmediatePropagation();
              params.splice(paramLength - 1, 1);
            } else if (event.which === 9) {
              event.preventDefault();

              var focusableElements = _DomHandler.default.getFocusableElements(dialog);

              if (focusableElements && focusableElements.length > 0) {
                if (!document.activeElement) {
                  focusableElements[0].focus();
                } else {
                  var focusedIndex = focusableElements.indexOf(document.activeElement);

                  if (event.shiftKey) {
                    if (focusedIndex === -1 || focusedIndex === 0) focusableElements[focusableElements.length - 1].focus();else focusableElements[focusedIndex - 1].focus();
                  } else {
                    if (focusedIndex === -1 || focusedIndex === focusableElements.length - 1) focusableElements[0].focus();else focusableElements[focusedIndex + 1].focus();
                  }
                }
              }
            }
          }
        }
      };

      var newParam = {
        id: this.id,
        hasBlockScroll: this.props.blockScroll
      };
      document.primeDialogParams = document.primeDialogParams ? [].concat(_toConsumableArray(document.primeDialogParams), [newParam]) : [newParam];
      document.addEventListener('keydown', this.documentKeyDownListener);
    }
  }, {
    key: "unbindDocumentKeyDownListener",
    value: function unbindDocumentKeyDownListener() {
      var _this5 = this;

      if (this.documentKeyDownListener) {
        document.removeEventListener('keydown', this.documentKeyDownListener);
        document.primeDialogParams = document.primeDialogParams && document.primeDialogParams.filter(function (param) {
          return param.id !== _this5.id;
        });
        this.documentKeyDownListener = null;
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.visible) {
        this.mask.style.zIndex = String(this.zIndex);
        this.onEntered();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this6 = this;

      if (this.props.visible && !this.state.maskVisible) {
        this.setState({
          maskVisible: true
        }, function () {
          _this6.mask.style.zIndex = String(_this6.zIndex);
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.disableDocumentSettings();
    }
  }, {
    key: "renderCloseIcon",
    value: function renderCloseIcon() {
      if (this.props.closable) {
        return _react.default.createElement("button", {
          type: "button",
          className: "p-dialog-titlebar-icon p-dialog-titlebar-close p-link",
          "aria-label": this.props.ariaCloseIconLabel,
          onClick: this.onClose
        }, _react.default.createElement("span", {
          className: "p-dialog-titlebar-close-icon pi pi-times"
        }));
      } else {
        return null;
      }
    }
  }, {
    key: "renderMaximizeIcon",
    value: function renderMaximizeIcon() {
      var iconClassName = (0, _classnames.default)('p-dialog-titlebar-maximize-icon pi', {
        'pi-window-maximize': !this.state.maximized,
        'pi-window-minimize': this.state.maximized
      });

      if (this.props.maximizable) {
        return _react.default.createElement("button", {
          type: "button",
          className: "p-dialog-titlebar-icon p-dialog-titlebar-maximize p-link",
          onClick: this.toggleMaximize
        }, _react.default.createElement("span", {
          className: iconClassName
        }));
      } else {
        return null;
      }
    }
  }, {
    key: "renderIconsTemplate",
    value: function renderIconsTemplate() {
      if (this.props.iconsTemplate) {
        return this.props.iconsTemplate(this);
      } else {
        return null;
      }
    }
  }, {
    key: "renderHeader",
    value: function renderHeader() {
      var _this7 = this;

      if (this.props.showHeader) {
        var closeIcon = this.renderCloseIcon();
        var maximizeIcon = this.renderMaximizeIcon();
        var iconsTemplate = this.renderIconsTemplate();
        return _react.default.createElement("div", {
          ref: function ref(el) {
            return _this7.headerElement = el;
          },
          className: "p-dialog-titlebar"
        }, _react.default.createElement("span", {
          id: this.id + '_header',
          className: "p-dialog-title"
        }, this.props.header), _react.default.createElement("div", {
          className: "p-dialog-titlebar-icons"
        }, iconsTemplate, maximizeIcon, closeIcon));
      } else {
        return null;
      }
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var _this8 = this;

      return _react.default.createElement("div", {
        ref: function ref(el) {
          return _this8.contentElement = el;
        },
        className: "p-dialog-content",
        style: this.props.contentStyle
      }, this.props.children);
    }
  }, {
    key: "renderFooter",
    value: function renderFooter() {
      var _this9 = this;

      if (this.props.footer) {
        return _react.default.createElement("div", {
          ref: function ref(el) {
            return _this9.footerElement = el;
          },
          className: "p-dialog-footer"
        }, this.props.footer);
      } else {
        return null;
      }
    }
  }, {
    key: "renderElement",
    value: function renderElement() {
      var _this10 = this;

      var className = (0, _classnames.default)('p-dialog p-component', this.props.className, {
        'p-dialog-rtl': this.props.rtl,
        'p-dialog-maximized': this.state.maximized
      });
      var maskClassName = (0, _classnames.default)('p-dialog-mask', {
        'p-component-overlay': this.props.modal,
        'p-dialog-visible': this.state.maskVisible
      }, this.props.maskClassName, this.getPositionClass());
      var header = this.renderHeader();
      var content = this.renderContent();
      var footer = this.renderFooter();
      var transitionTimeout = {
        enter: this.props.position === 'center' ? 150 : 300,
        exit: this.props.position === 'center' ? 150 : 300
      };
      return _react.default.createElement("div", {
        ref: function ref(el) {
          return _this10.mask = el;
        },
        className: maskClassName,
        onClick: this.onMaskClick
      }, _react.default.createElement(_reactTransitionGroup.CSSTransition, {
        classNames: "p-dialog",
        timeout: transitionTimeout,
        in: this.props.visible,
        unmountOnExit: true,
        onEntered: this.onEntered,
        onExit: this.onExit,
        onExited: this.onExited
      }, _react.default.createElement("div", {
        ref: function ref(el) {
          return _this10.dialog = el;
        },
        id: this.id,
        className: className,
        style: this.props.style,
        onClick: this.onDialogClick,
        "aria-labelledby": this.id + '_label',
        role: "dialog",
        "aria-modal": this.props.model
      }, header, content, footer)));
    }
  }, {
    key: "render",
    value: function render() {
      var element = this.renderElement();
      if (this.props.appendTo) return _reactDom.default.createPortal(element, this.props.appendTo);else return element;
    }
  }, {
    key: "zIndex",
    get: function get() {
      return this.props.baseZIndex + _DomHandler.default.generateZIndex();
    }
  }]);

  return Dialog;
}(_react.Component);

exports.Dialog = Dialog;

_defineProperty(Dialog, "defaultProps", {
  id: null,
  header: null,
  footer: null,
  visible: false,
  position: 'center',
  modal: true,
  onHide: null,
  onShow: null,
  contentStyle: null,
  closeOnEscape: true,
  dismissableMask: false,
  rtl: false,
  closable: true,
  style: null,
  className: null,
  maskClassName: null,
  showHeader: true,
  appendTo: null,
  baseZIndex: 0,
  maximizable: false,
  blockScroll: false,
  iconsTemplate: null,
  ariaCloseIconLabel: 'Close',
  focusOnShow: true
});

_defineProperty(Dialog, "propTypes", {
  id: _propTypes.default.string,
  header: _propTypes.default.any,
  footer: _propTypes.default.any,
  visible: _propTypes.default.bool,
  position: _propTypes.default.string,
  modal: _propTypes.default.bool,
  onHide: _propTypes.default.func.isRequired,
  onShow: _propTypes.default.func,
  contentStyle: _propTypes.default.object,
  closeOnEscape: _propTypes.default.bool,
  dismissableMask: _propTypes.default.bool,
  rtl: _propTypes.default.bool,
  closable: _propTypes.default.bool,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  maskClassName: _propTypes.default.string,
  showHeader: _propTypes.default.bool,
  appendTo: _propTypes.default.object,
  baseZIndex: _propTypes.default.number,
  maximizable: _propTypes.default.bool,
  blockScroll: _propTypes.default.bool,
  iconsTemplate: _propTypes.default.func,
  ariaCloseIconLabel: _propTypes.default.string,
  focusOnShow: _propTypes.default.bool
});