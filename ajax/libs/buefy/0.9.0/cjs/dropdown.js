'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-14c82365.js');
require('./helpers.js');
require('./chunk-691abc80.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-e0340ab9.js');
require('./chunk-ae7e641a.js');
var __chunk_13 = require('./chunk-15d034ec.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_13.Dropdown);
    __chunk_5.registerComponent(Vue, __chunk_13.DropdownItem);
  }
};
__chunk_5.use(Plugin);

exports.BDropdown = __chunk_13.Dropdown;
exports.BDropdownItem = __chunk_13.DropdownItem;
exports.default = Plugin;
