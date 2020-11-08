import './index-e00f48fc.js';
import { F as FormatterBehavior } from './formatter-2cf27cf8.js';
import { n as numberFormat } from './number-f42ac778.js';

class NumberBehavior extends FormatterBehavior {
  static get formatter() {
    return numberFormat;
  }
}

export default NumberBehavior;
