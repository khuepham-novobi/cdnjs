import './index-fd92abaa.js';
import { F as FormatterBehavior } from './formatter-be5b5581.js';
import { n as numberFormat } from './number-df7e89f6.js';

class NumberBehavior extends FormatterBehavior {
  static get formatter() {
    return numberFormat;
  }
}

export default NumberBehavior;
