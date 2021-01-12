import './index-c8e86d4d.js';
import { F as FormatterBehavior } from './formatter-bda6daf9.js';
import { n as numberFormat } from './number-1a25d120.js';

class NumberBehavior extends FormatterBehavior {
  static get formatter() {
    return numberFormat;
  }
}

export default NumberBehavior;
