"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SourceConnector = void 0;

var _wrapConnectorHooks = _interopRequireDefault(require("./wrapConnectorHooks"));

var _isRef = require("../utils/isRef");

var _shallowequal = _interopRequireDefault(require("shallowequal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SourceConnector =
/*#__PURE__*/
function () {
  // The drop target may either be attached via ref or connect function
  // The drag preview may either be attached via ref or connect function
  function SourceConnector(backend) {
    var _this = this;

    _classCallCheck(this, SourceConnector);

    _defineProperty(this, "hooks", (0, _wrapConnectorHooks.default)({
      dragSource: function dragSource(node, options) {
        _this.dragSourceOptions = options || null;

        if ((0, _isRef.isRef)(node)) {
          _this.dragSourceRef = node;
        } else {
          _this.dragSourceNode = node;
        }

        _this.reconnectDragSource();
      },
      dragPreview: function dragPreview(node, options) {
        _this.dragPreviewOptions = options || null;

        if ((0, _isRef.isRef)(node)) {
          _this.dragPreviewRef = node;
        } else {
          _this.dragPreviewNode = node;
        }

        _this.reconnectDragPreview();
      }
    }));

    _defineProperty(this, "handlerId", null);

    _defineProperty(this, "dragSourceRef", null);

    _defineProperty(this, "dragSourceNode", void 0);

    _defineProperty(this, "dragSourceOptionsInternal", null);

    _defineProperty(this, "dragSourceUnsubscribe", void 0);

    _defineProperty(this, "dragPreviewRef", null);

    _defineProperty(this, "dragPreviewNode", void 0);

    _defineProperty(this, "dragPreviewOptionsInternal", null);

    _defineProperty(this, "dragPreviewUnsubscribe", void 0);

    _defineProperty(this, "lastConnectedHandlerId", null);

    _defineProperty(this, "lastConnectedDragSource", null);

    _defineProperty(this, "lastConnectedDragSourceOptions", null);

    _defineProperty(this, "lastConnectedDragPreview", null);

    _defineProperty(this, "lastConnectedDragPreviewOptions", null);

    _defineProperty(this, "backend", void 0);

    this.backend = backend;
  }

  _createClass(SourceConnector, [{
    key: "receiveHandlerId",
    value: function receiveHandlerId(newHandlerId) {
      if (this.handlerId === newHandlerId) {
        return;
      }

      this.handlerId = newHandlerId;
      this.reconnect();
    }
  }, {
    key: "reconnect",
    value: function reconnect() {
      this.reconnectDragSource();
      this.reconnectDragPreview();
    }
  }, {
    key: "reconnectDragSource",
    value: function reconnectDragSource() {
      // if nothing has changed then don't resubscribe
      var didChange = this.didHandlerIdChange() || this.didConnectedDragSourceChange() || this.didDragSourceOptionsChange();

      if (didChange) {
        this.disconnectDragSource();
      }

      var dragSource = this.dragSource;

      if (!this.handlerId) {
        return;
      }

      if (!dragSource) {
        this.lastConnectedDragSource = dragSource;
        return;
      }

      if (didChange) {
        this.lastConnectedHandlerId = this.handlerId;
        this.lastConnectedDragSource = dragSource;
        this.lastConnectedDragSourceOptions = this.dragSourceOptions;
        this.dragSourceUnsubscribe = this.backend.connectDragSource(this.handlerId, dragSource, this.dragSourceOptions);
      }
    }
  }, {
    key: "reconnectDragPreview",
    value: function reconnectDragPreview() {
      // if nothing has changed then don't resubscribe
      var didChange = this.didHandlerIdChange() || this.didConnectedDragPreviewChange() || this.didDragPreviewOptionsChange();

      if (didChange) {
        this.disconnectDragPreview();
      }

      var dragPreview = this.dragPreview;

      if (!this.handlerId || !dragPreview) {
        return;
      }

      if (didChange) {
        this.lastConnectedHandlerId = this.handlerId;
        this.lastConnectedDragPreview = dragPreview;
        this.lastConnectedDragPreviewOptions = this.dragPreviewOptions;
        this.dragPreviewUnsubscribe = this.backend.connectDragPreview(this.handlerId, dragPreview, this.dragPreviewOptions);
      }
    }
  }, {
    key: "didHandlerIdChange",
    value: function didHandlerIdChange() {
      return this.lastConnectedHandlerId !== this.handlerId;
    }
  }, {
    key: "didConnectedDragSourceChange",
    value: function didConnectedDragSourceChange() {
      return this.lastConnectedDragSource !== this.dragSource;
    }
  }, {
    key: "didConnectedDragPreviewChange",
    value: function didConnectedDragPreviewChange() {
      return this.lastConnectedDragPreview !== this.dragPreview;
    }
  }, {
    key: "didDragSourceOptionsChange",
    value: function didDragSourceOptionsChange() {
      return !(0, _shallowequal.default)(this.lastConnectedDragSourceOptions, this.dragSourceOptions);
    }
  }, {
    key: "didDragPreviewOptionsChange",
    value: function didDragPreviewOptionsChange() {
      return !(0, _shallowequal.default)(this.lastConnectedDragPreviewOptions, this.dragPreviewOptions);
    }
  }, {
    key: "disconnectDragSource",
    value: function disconnectDragSource() {
      if (this.dragSourceUnsubscribe) {
        this.dragSourceUnsubscribe();
        this.dragSourceUnsubscribe = undefined;
      }
    }
  }, {
    key: "disconnectDragPreview",
    value: function disconnectDragPreview() {
      if (this.dragPreviewUnsubscribe) {
        this.dragPreviewUnsubscribe();
        this.dragPreviewUnsubscribe = undefined;
        this.dragPreviewNode = null;
        this.dragPreviewRef = null;
      }
    }
  }, {
    key: "connectTarget",
    get: function get() {
      return this.dragSource;
    }
  }, {
    key: "dragSourceOptions",
    get: function get() {
      return this.dragSourceOptionsInternal;
    },
    set: function set(options) {
      this.dragSourceOptionsInternal = options;
    }
  }, {
    key: "dragPreviewOptions",
    get: function get() {
      return this.dragPreviewOptionsInternal;
    },
    set: function set(options) {
      this.dragPreviewOptionsInternal = options;
    }
  }, {
    key: "dragSource",
    get: function get() {
      return this.dragSourceNode || this.dragSourceRef && this.dragSourceRef.current;
    }
  }, {
    key: "dragPreview",
    get: function get() {
      return this.dragPreviewNode || this.dragPreviewRef && this.dragPreviewRef.current;
    }
  }]);

  return SourceConnector;
}();

exports.SourceConnector = SourceConnector;