import './index-0338ddf6.js';
import { F as FormatterBehavior } from './formatter-956634c4.js';
import { n as numberFormat } from './number-27a5ec6c.js';

class NumberBehavior extends FormatterBehavior {
  static get formatter() {
    return numberFormat;
  }
}

export default NumberBehavior;
