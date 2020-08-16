'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-14c82365.js');
require('./helpers.js');
require('./chunk-691abc80.js');
require('./chunk-208d34ef.js');
require('./chunk-f628cf14.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-03ecc239.js');
var __chunk_7 = require('./chunk-cd0c80f7.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_7.Autocomplete);
  }
};
__chunk_5.use(Plugin);

exports.BAutocomplete = __chunk_7.Autocomplete;
exports.default = Plugin;
