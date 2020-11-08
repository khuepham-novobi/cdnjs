import './index-e00f48fc.js';
import { C as ComponentBehavior } from './component-11faa143.js';

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
