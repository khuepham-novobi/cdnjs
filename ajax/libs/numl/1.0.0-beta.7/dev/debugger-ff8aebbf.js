import './index-3caafb06.js';
import { C as ComponentBehavior } from './component-40c1d775.js';

class DebuggerBehaviour extends ComponentBehavior {
  static get params() {
    return {
      component: 'debugger',
      props: ['target'],
    };
  }
}

export default DebuggerBehaviour;
