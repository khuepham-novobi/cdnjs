'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-14c82365.js');
require('./helpers.js');
require('./chunk-185921d7.js');
require('./chunk-d6b6c621.js');
require('./chunk-0055606b.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-4a92b054.js');
require('./chunk-54573332.js');
require('./chunk-ae7e641a.js');
require('./chunk-26e939c9.js');
require('./chunk-a5648237.js');
require('./chunk-12f439e3.js');
var __chunk_16 = require('./chunk-32d70dc7.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_16.Datepicker);
  }
};
__chunk_5.use(Plugin);

exports.BDatepicker = __chunk_16.Datepicker;
exports.default = Plugin;
