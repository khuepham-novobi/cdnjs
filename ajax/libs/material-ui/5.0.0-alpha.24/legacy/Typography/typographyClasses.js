import { generateUtilityClass, generateUtilityClasses } from '@material-ui/unstyled';
export function getTypographyUtilityClass(slot) {
  return generateUtilityClass('MuiTypography', slot);
}
var typographyClasses = generateUtilityClasses('MuiTypography', ['root', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'inherit', 'button', 'caption', 'overline', 'alignLeft', 'alignRight', 'alignCenter', 'alignJustify', 'noWrap', 'gutterBottom', 'paragraph', 'colorInherit', 'colorPrimary', 'colorSecondary', 'colorTextPrimary', 'colorTextSecondary', 'colorError', 'displayInline', 'displayBlock']);
export default typographyClasses;