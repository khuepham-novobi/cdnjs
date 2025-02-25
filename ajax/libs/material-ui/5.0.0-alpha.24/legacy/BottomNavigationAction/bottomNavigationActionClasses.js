import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getBottomNavigationActionUtilityClass(slot) {
  return generateUtilityClass('MuiBottomNavigationAction', slot);
}
var bottomNavigationActionClasses = generateUtilityClasses('MuiBottomNavigationAction', ['root', 'iconOnly', 'selected', 'wrapper', 'label']);
export default bottomNavigationActionClasses;