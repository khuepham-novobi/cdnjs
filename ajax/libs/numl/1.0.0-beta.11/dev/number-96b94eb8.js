import './index-1e8b6f76.js';
import { F as FormatterBehavior } from './formatter-bcffa1ed.js';
import { n as numberFormat } from './number-036ff702.js';

class NumberBehavior extends FormatterBehavior {
  static get formatter() {
    return numberFormat;
  }
}

export default NumberBehavior;
