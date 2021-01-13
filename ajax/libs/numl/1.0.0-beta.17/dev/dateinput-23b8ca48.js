import './index-da59e341.js';
import { C as ComponentBehavior } from './component-d03c4872.js';

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
