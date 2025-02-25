import { useTheme as useThemeWithoutDefault } from '@material-ui/styles';
import * as React from 'react';
import defaultTheme from './defaultTheme';
export default function useTheme() {
  var theme = useThemeWithoutDefault() || defaultTheme;

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useDebugValue(theme);
  }

  return theme;
}