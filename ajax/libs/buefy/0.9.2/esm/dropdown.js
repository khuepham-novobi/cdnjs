import './chunk-1fafdf15.js';
import './helpers.js';
import './chunk-bd4264c6.js';
import { r as registerComponent, u as use } from './chunk-cca88db8.js';
import './chunk-56f84f22.js';
import './chunk-42f463e6.js';
import { D as Dropdown, a as DropdownItem } from './chunk-5ccea041.js';
export { D as BDropdown, a as BDropdownItem } from './chunk-5ccea041.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Dropdown);
    registerComponent(Vue, DropdownItem);
  }
};
use(Plugin);

export default Plugin;
