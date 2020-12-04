import './index-d5432e4d.js';
import { F as FormatterBehavior } from './formatter-d84d59d7.js';
import { n as numberFormat } from './number-620fd9b2.js';

class NumberBehavior extends FormatterBehavior {
  static get formatter() {
    return numberFormat;
  }
}

export default NumberBehavior;
