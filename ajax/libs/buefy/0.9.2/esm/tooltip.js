import './chunk-1fafdf15.js';
import './helpers.js';
import './chunk-bd4264c6.js';
import { r as registerComponent, u as use } from './chunk-cca88db8.js';
import { T as Tooltip } from './chunk-4939e2ec.js';
export { T as BTooltip } from './chunk-4939e2ec.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Tooltip);
  }
};
use(Plugin);

export default Plugin;
