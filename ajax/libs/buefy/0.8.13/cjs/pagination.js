'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-5094d8df.js');
require('./helpers.js');
require('./chunk-805257cc.js');
require('./chunk-fa132d6c.js');
var __chunk_5 = require('./chunk-13e039f5.js');
var __chunk_21 = require('./chunk-ce8fe230.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_21.Pagination);
    __chunk_5.registerComponent(Vue, __chunk_21.PaginationButton);
  }
};
__chunk_5.use(Plugin);

exports.BPagination = __chunk_21.Pagination;
exports.BPaginationButton = __chunk_21.PaginationButton;
exports.default = Plugin;
