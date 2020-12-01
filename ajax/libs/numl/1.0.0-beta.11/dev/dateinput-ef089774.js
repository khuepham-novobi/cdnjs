import './index-1e8b6f76.js';
import { C as ComponentBehavior } from './component-3ef9f763.js';

class DateInputBehaviour extends ComponentBehavior {
  static get params() {
    return {
      input: true,
      localized: true,
      component: 'dateinput',
      props: ['value', 'begin', 'end', 'mode', 'host', 'placeholder'],
    };
  }
}

export default DateInputBehaviour;
