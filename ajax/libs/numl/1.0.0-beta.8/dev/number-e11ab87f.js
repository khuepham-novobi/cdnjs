import './index-44c0fa28.js';
import { F as FormatterBehavior } from './formatter-b699c9bc.js';
import { n as numberFormat } from './number-72576ab2.js';

class NumberBehavior extends FormatterBehavior {
  static get formatter() {
    return numberFormat;
  }
}

export default NumberBehavior;
