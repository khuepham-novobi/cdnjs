'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-14c82365.js');
require('./helpers.js');
require('./chunk-185921d7.js');
require('./chunk-d6b6c621.js');
require('./chunk-0055606b.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-4a92b054.js');
var __chunk_7 = require('./chunk-96c2e120.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_7.Autocomplete);
  }
};
__chunk_5.use(Plugin);

exports.BAutocomplete = __chunk_7.Autocomplete;
exports.default = Plugin;
