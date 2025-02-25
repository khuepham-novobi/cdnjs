import './chunk-6ea13200.js';
import './helpers.js';
import './chunk-17222463.js';
import './chunk-d732d84c.js';
import { r as registerComponent, u as use } from './chunk-cca88db8.js';
import { P as Pagination, a as PaginationButton } from './chunk-b5f09e5f.js';
export { P as BPagination, a as BPaginationButton } from './chunk-b5f09e5f.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Pagination);
    registerComponent(Vue, PaginationButton);
  }
};
use(Plugin);

export default Plugin;
