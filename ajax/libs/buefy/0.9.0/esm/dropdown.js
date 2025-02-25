import './chunk-1fafdf15.js';
import './helpers.js';
import './chunk-f134e057.js';
import { r as registerComponent, u as use } from './chunk-cca88db8.js';
import './chunk-8cb48812.js';
import './chunk-42f463e6.js';
import { D as Dropdown, a as DropdownItem } from './chunk-edc3b90d.js';
export { D as BDropdown, a as BDropdownItem } from './chunk-edc3b90d.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Dropdown);
    registerComponent(Vue, DropdownItem);
  }
};
use(Plugin);

export default Plugin;
