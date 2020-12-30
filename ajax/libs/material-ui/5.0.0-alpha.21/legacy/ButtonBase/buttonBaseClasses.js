import _extends from "@babel/runtime/helpers/esm/extends";
import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getButtonBaseUtilityClass(slot) {
  return generateUtilityClass('MuiButtonBase', slot);
}

var buttonBaseClasses = _extends({}, generateUtilityClasses('MuiButtonBase', ['root', 'disabled', 'focusVisible']));

export default buttonBaseClasses;