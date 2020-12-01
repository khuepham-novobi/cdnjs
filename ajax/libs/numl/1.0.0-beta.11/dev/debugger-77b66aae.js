import './index-1e8b6f76.js';
import { C as ComponentBehavior } from './component-3ef9f763.js';

class DebuggerBehaviour extends ComponentBehavior {
  static get params() {
    return {
      component: 'debugger',
      props: ['target'],
    };
  }
}

export default DebuggerBehaviour;
