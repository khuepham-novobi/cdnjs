import './index-3caafb06.js';
import { F as FormatterBehavior } from './formatter-2cceadbe.js';
import { n as numberFormat } from './number-4532ff06.js';

class NumberBehavior extends FormatterBehavior {
  static get formatter() {
    return numberFormat;
  }
}

export default NumberBehavior;
