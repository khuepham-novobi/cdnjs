import './chunk-1fafdf15.js';
import { merge } from './helpers.js';
export { bound, createAbsoluteElement, createNewEvent, escapeRegExpChars, getMonthNames, getValueByPath, getWeekdayNames, hasFlag, indexOf, isCustomElement, isMobile, isVueComponent, isWebpSupported, matchWithGroups, merge, mod, multiColumnSort, removeElement, sign, toCssWidth } from './helpers.js';
import { c as config, s as setOptions, a as setVueInstance } from './chunk-bd4264c6.js';
import './chunk-197ef742.js';
import './chunk-3852f5fd.js';
import { a as registerComponentProgrammatic, u as use } from './chunk-cca88db8.js';
import './chunk-85a8ec35.js';
import './chunk-1c37796e.js';
import Plugin from './autocomplete.js';
export { default as Autocomplete } from './autocomplete.js';
import Plugin$1 from './button.js';
export { default as Button } from './button.js';
import './chunk-56f84f22.js';
import Plugin$2 from './carousel.js';
export { default as Carousel } from './carousel.js';
import './chunk-2793447b.js';
import './chunk-d6bb2470.js';
import Plugin$3 from './checkbox.js';
export { default as Checkbox } from './checkbox.js';
import Plugin$5 from './collapse.js';
export { default as Collapse } from './collapse.js';
import './chunk-10cf3f0e.js';
import './chunk-42f463e6.js';
import './chunk-5ccea041.js';
import './chunk-722c2a14.js';
import Plugin$4 from './clockpicker.js';
export { default as Clockpicker } from './clockpicker.js';
import './chunk-3c26c4a0.js';
import './chunk-21abdf85.js';
import Plugin$6 from './datepicker.js';
export { default as Datepicker } from './datepicker.js';
import './chunk-5c7b2549.js';
import Plugin$7 from './datetimepicker.js';
export { default as Datetimepicker } from './datetimepicker.js';
import './chunk-dbb1a60b.js';
import Plugin$8 from './dialog.js';
export { default as Dialog, DialogProgrammatic } from './dialog.js';
import Plugin$9 from './dropdown.js';
export { default as Dropdown } from './dropdown.js';
import Plugin$a from './field.js';
export { default as Field } from './field.js';
import Plugin$b from './icon.js';
export { default as Icon } from './icon.js';
import Plugin$c from './image.js';
export { default as Image } from './image.js';
import Plugin$d from './input.js';
export { default as Input } from './input.js';
import './chunk-b9bdb0e4.js';
import './chunk-685815b3.js';
import Plugin$e from './loading.js';
export { default as Loading, LoadingProgrammatic } from './loading.js';
import Plugin$f from './menu.js';
export { default as Menu } from './menu.js';
import './chunk-fe8a1a80.js';
import Plugin$g from './message.js';
export { default as Message } from './message.js';
import Plugin$h from './modal.js';
export { default as Modal, ModalProgrammatic } from './modal.js';
import Plugin$j from './notification.js';
export { default as Notification, NotificationProgrammatic } from './notification.js';
import './chunk-58668f16.js';
import Plugin$i from './navbar.js';
export { default as Navbar } from './navbar.js';
import Plugin$k from './numberinput.js';
export { default as Numberinput } from './numberinput.js';
import './chunk-d3f604a3.js';
import Plugin$l from './pagination.js';
export { default as Pagination } from './pagination.js';
import Plugin$m from './progress.js';
export { default as Progress } from './progress.js';
import Plugin$n from './radio.js';
export { default as Radio } from './radio.js';
import Plugin$o from './rate.js';
export { default as Rate } from './rate.js';
import Plugin$p from './select.js';
export { default as Select } from './select.js';
import Plugin$q from './skeleton.js';
export { default as Skeleton } from './skeleton.js';
import Plugin$r from './sidebar.js';
export { default as Sidebar } from './sidebar.js';
import './chunk-4939e2ec.js';
import Plugin$s from './slider.js';
export { default as Slider } from './slider.js';
import Plugin$t from './snackbar.js';
export { default as Snackbar, SnackbarProgrammatic } from './snackbar.js';
import './chunk-23f32560.js';
import './chunk-847dd5f6.js';
import Plugin$u from './steps.js';
export { default as Steps } from './steps.js';
import Plugin$v from './switch.js';
export { default as Switch } from './switch.js';
import Plugin$w from './table.js';
export { default as Table } from './table.js';
import Plugin$x from './tabs.js';
export { default as Tabs } from './tabs.js';
import './chunk-fb315748.js';
import Plugin$y from './tag.js';
export { default as Tag } from './tag.js';
import Plugin$z from './taginput.js';
export { default as Taginput } from './taginput.js';
import Plugin$A from './timepicker.js';
export { default as Timepicker } from './timepicker.js';
import Plugin$B from './toast.js';
export { default as Toast, ToastProgrammatic } from './toast.js';
import Plugin$C from './tooltip.js';
export { default as Tooltip } from './tooltip.js';
import Plugin$D from './upload.js';
export { default as Upload } from './upload.js';



var components = /*#__PURE__*/Object.freeze({
    Autocomplete: Plugin,
    Button: Plugin$1,
    Carousel: Plugin$2,
    Checkbox: Plugin$3,
    Clockpicker: Plugin$4,
    Collapse: Plugin$5,
    Datepicker: Plugin$6,
    Datetimepicker: Plugin$7,
    Dialog: Plugin$8,
    Dropdown: Plugin$9,
    Field: Plugin$a,
    Icon: Plugin$b,
    Image: Plugin$c,
    Input: Plugin$d,
    Loading: Plugin$e,
    Menu: Plugin$f,
    Message: Plugin$g,
    Modal: Plugin$h,
    Navbar: Plugin$i,
    Notification: Plugin$j,
    Numberinput: Plugin$k,
    Pagination: Plugin$l,
    Progress: Plugin$m,
    Radio: Plugin$n,
    Rate: Plugin$o,
    Select: Plugin$p,
    Skeleton: Plugin$q,
    Sidebar: Plugin$r,
    Slider: Plugin$s,
    Snackbar: Plugin$t,
    Steps: Plugin$u,
    Switch: Plugin$v,
    Table: Plugin$w,
    Tabs: Plugin$x,
    Tag: Plugin$y,
    Taginput: Plugin$z,
    Timepicker: Plugin$A,
    Toast: Plugin$B,
    Tooltip: Plugin$C,
    Upload: Plugin$D
});

var ConfigComponent = {
  getOptions: function getOptions() {
    return config;
  },
  setOptions: function setOptions$1(options) {
    setOptions(merge(config, options, true));
  }
};

var Buefy = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    setVueInstance(Vue); // Options

    setOptions(merge(config, options, true)); // Components

    for (var componentKey in components) {
      Vue.use(components[componentKey]);
    } // Config component


    registerComponentProgrammatic(Vue, 'config', ConfigComponent);
  }
};
use(Buefy);

export default Buefy;
export { ConfigComponent as ConfigProgrammatic };
