"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TieredMenuSub = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ClassNames = require("../utils/ClassNames");

var _DomHandler = _interopRequireDefault(require("../utils/DomHandler"));

var _Ripple = require("../ripple/Ripple");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TieredMenuSub = /*#__PURE__*/function (_Component) {
  _inherits(TieredMenuSub, _Component);

  var _super = _createSuper(TieredMenuSub);

  function TieredMenuSub(props) {
    var _this;

    _classCallCheck(this, TieredMenuSub);

    _this = _super.call(this, props);
    _this.state = {
      activeItem: null
    };
    _this.onLeafClick = _this.onLeafClick.bind(_assertThisInitialized(_this));
    _this.onChildItemKeyDown = _this.onChildItemKeyDown.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TieredMenuSub, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.parentActive && !this.props.parentActive) {
        this.setState({
          activeItem: null
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (!this.documentClickListener) {
        this.documentClickListener = function (event) {
          if (_this2.element && !_this2.element.contains(event.target)) {
            _this2.setState({
              activeItem: null
            });
          }
        };

        document.addEventListener('click', this.documentClickListener);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.documentClickListener) {
        document.removeEventListener('click', this.documentClickListener);
        this.documentClickListener = null;
      }
    }
  }, {
    key: "onItemMouseEnter",
    value: function onItemMouseEnter(event, item) {
      if (item.disabled) {
        event.preventDefault();
        return;
      }

      if (this.props.root) {
        if (this.state.activeItem || this.props.popup) {
          this.setState({
            activeItem: item
          });
        }
      } else {
        this.setState({
          activeItem: item
        });
      }
    }
  }, {
    key: "onItemClick",
    value: function onItemClick(event, item) {
      if (item.disabled) {
        event.preventDefault();
        return;
      }

      if (!item.url) {
        event.preventDefault();
      }

      if (item.command) {
        item.command({
          originalEvent: event,
          item: item
        });
      }

      if (this.props.root) {
        if (item.items) {
          if (this.state.activeItem && item === this.state.activeItem) {
            this.setState({
              activeItem: null
            });
          } else {
            this.setState({
              activeItem: item
            });
          }
        }
      }

      if (!item.items) {
        this.onLeafClick();
      }
    }
  }, {
    key: "onItemKeyDown",
    value: function onItemKeyDown(event, item) {
      var listItem = event.currentTarget.parentElement;

      switch (event.which) {
        //down
        case 40:
          var nextItem = this.findNextItem(listItem);

          if (nextItem) {
            nextItem.children[0].focus();
          }

          event.preventDefault();
          break;
        //up

        case 38:
          var prevItem = this.findPrevItem(listItem);

          if (prevItem) {
            prevItem.children[0].focus();
          }

          event.preventDefault();
          break;
        //right

        case 39:
          if (item.items) {
            this.setState({
              activeItem: item
            });
            setTimeout(function () {
              listItem.children[1].children[0].children[0].focus();
            }, 50);
          }

          event.preventDefault();
          break;

        default:
          break;
      }

      if (this.props.onKeyDown) {
        this.props.onKeyDown(event, listItem);
      }
    }
  }, {
    key: "onChildItemKeyDown",
    value: function onChildItemKeyDown(event, childListItem) {
      //left
      if (event.which === 37) {
        this.setState({
          activeItem: null
        });
        childListItem.parentElement.previousElementSibling.focus();
      }
    }
  }, {
    key: "findNextItem",
    value: function findNextItem(item) {
      var nextItem = item.nextElementSibling;
      if (nextItem) return _DomHandler.default.hasClass(nextItem, 'p-disabled') || !_DomHandler.default.hasClass(nextItem, 'p-menuitem') ? this.findNextItem(nextItem) : nextItem;else return null;
    }
  }, {
    key: "findPrevItem",
    value: function findPrevItem(item) {
      var prevItem = item.previousElementSibling;
      if (prevItem) return _DomHandler.default.hasClass(prevItem, 'p-disabled') || !_DomHandler.default.hasClass(prevItem, 'p-menuitem') ? this.findPrevItem(prevItem) : prevItem;else return null;
    }
  }, {
    key: "onLeafClick",
    value: function onLeafClick() {
      this.setState({
        activeItem: null
      });

      if (this.props.onLeafClick) {
        this.props.onLeafClick();
      }
    }
  }, {
    key: "renderSeparator",
    value: function renderSeparator(index) {
      return /*#__PURE__*/_react.default.createElement("li", {
        key: 'separator_' + index,
        className: "p-menu-separator",
        role: "separator"
      });
    }
  }, {
    key: "renderIcon",
    value: function renderIcon(item) {
      var className = (0, _ClassNames.classNames)('p-menuitem-icon', item.icon);

      if (item.icon) {
        return /*#__PURE__*/_react.default.createElement("span", {
          className: className
        });
      }

      return null;
    }
  }, {
    key: "renderSubmenuIcon",
    value: function renderSubmenuIcon(item) {
      if (item.items) {
        return /*#__PURE__*/_react.default.createElement("span", {
          className: "p-submenu-icon pi pi-angle-right"
        });
      }

      return null;
    }
  }, {
    key: "renderSubmenu",
    value: function renderSubmenu(item) {
      if (item.items) {
        return /*#__PURE__*/_react.default.createElement(TieredMenuSub, {
          model: item.items,
          onLeafClick: this.onLeafClick,
          popup: this.props.popup,
          onKeyDown: this.onChildItemKeyDown,
          parentActive: item === this.state.activeItem
        });
      }

      return null;
    }
  }, {
    key: "renderMenuitem",
    value: function renderMenuitem(item, index) {
      var _this3 = this;

      var className = (0, _ClassNames.classNames)('p-menuitem', {
        'p-menuitem-active': this.state.activeItem === item
      }, item.className);
      var linkClassName = (0, _ClassNames.classNames)('p-menuitem-link', {
        'p-disabled': item.disabled
      });
      var icon = this.renderIcon(item);
      var submenuIcon = this.renderSubmenuIcon(item);
      var submenu = this.renderSubmenu(item);
      return /*#__PURE__*/_react.default.createElement("li", {
        key: item.label + '_' + index,
        className: className,
        style: item.style,
        onMouseEnter: function onMouseEnter(event) {
          return _this3.onItemMouseEnter(event, item);
        },
        role: "none"
      }, /*#__PURE__*/_react.default.createElement("a", {
        href: item.url || '#',
        className: linkClassName,
        target: item.target,
        role: "menuitem",
        "aria-haspopup": item.items != null,
        onClick: function onClick(event) {
          return _this3.onItemClick(event, item);
        },
        onKeyDown: function onKeyDown(event) {
          return _this3.onItemKeyDown(event, item);
        }
      }, icon, /*#__PURE__*/_react.default.createElement("span", {
        className: "p-menuitem-text"
      }, item.label), submenuIcon, /*#__PURE__*/_react.default.createElement(_Ripple.Ripple, null)), submenu);
    }
  }, {
    key: "renderItem",
    value: function renderItem(item, index) {
      if (item.separator) return this.renderSeparator(index);else return this.renderMenuitem(item, index);
    }
  }, {
    key: "renderMenu",
    value: function renderMenu() {
      var _this4 = this;

      if (this.props.model) {
        return this.props.model.map(function (item, index) {
          return _this4.renderItem(item, index);
        });
      }

      return null;
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var className = (0, _ClassNames.classNames)({
        'p-submenu-list': !this.props.root
      });
      var submenu = this.renderMenu();
      return /*#__PURE__*/_react.default.createElement("ul", {
        ref: function ref(el) {
          return _this5.element = el;
        },
        className: className,
        role: this.props.root ? 'menubar' : 'menu',
        "aria-orientation": "horizontal"
      }, submenu);
    }
  }]);

  return TieredMenuSub;
}(_react.Component);

exports.TieredMenuSub = TieredMenuSub;

_defineProperty(TieredMenuSub, "defaultProps", {
  model: null,
  root: false,
  className: null,
  popup: false,
  onLeafClick: null,
  onKeyDown: null,
  parentActive: false
});

_defineProperty(TieredMenuSub, "propTypes", {
  model: _propTypes.default.any,
  root: _propTypes.default.bool,
  className: _propTypes.default.string,
  popup: _propTypes.default.bool,
  onLeafClick: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  parentActive: _propTypes.default.bool
});