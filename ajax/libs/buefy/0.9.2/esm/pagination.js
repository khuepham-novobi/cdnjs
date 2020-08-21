import './chunk-1fafdf15.js';
import './helpers.js';
import './chunk-bd4264c6.js';
import './chunk-3852f5fd.js';
import { r as registerComponent, u as use } from './chunk-cca88db8.js';
import { P as Pagination, a as PaginationButton } from './chunk-d3f604a3.js';
export { P as BPagination, a as BPaginationButton } from './chunk-d3f604a3.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Pagination);
    registerComponent(Vue, PaginationButton);
  }
};
use(Plugin);

export default Plugin;
