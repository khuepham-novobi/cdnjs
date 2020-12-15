import './index-dcb1f7ed.js';
import { C as ComponentBehavior } from './component-f4ac6d58.js';

class DatePickerBehaviour extends ComponentBehavior {
  static get params() {
    return {
      input: true,
      localized: true,
      component: 'datepicker',
      provideValue: false,
      props: ['value', 'begin', 'end', 'mode', 'lang', 'host'],
    };
  }
}

export default DatePickerBehaviour;
