'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.time = exports.prefixer = exports.events = undefined;

var _utils = require('./utils');

Object.keys(_utils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _utils[key];
    }
  });
});

var _events = require('./events.js');

var _events2 = _interopRequireDefault(_events);

var _prefixer = require('./prefixer.js');

var _prefixer2 = _interopRequireDefault(_prefixer);

var _time = require('./time.js');

var _time2 = _interopRequireDefault(_time);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { events: _events2.default, prefixer: _prefixer2.default, time: _time2.default };
exports.events = _events2.default;
exports.prefixer = _prefixer2.default;
exports.time = _time2.default;