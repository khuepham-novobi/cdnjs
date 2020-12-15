import './index-dcb1f7ed.js';
import { C as ComponentBehavior } from './component-f4ac6d58.js';

class DebuggerBehaviour extends ComponentBehavior {
  static get params() {
    return {
      component: 'debugger',
      props: ['target'],
    };
  }
}

export default DebuggerBehaviour;
