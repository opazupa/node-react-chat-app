import { Color, createMuiTheme } from '@material-ui/core';

/**
 * ITheme
 *
 * @export
 * @interface ITheme
 */
export interface ITheme {
  colors: {
    primary: Color;
    secondary: Color;
    error: Color;
    type: 'light' | 'dark';
  };
  typography: { [Key: string]: any };
}

/**
 * Creayes Material UI theme.
 *
 * @param {ITheme} theme
 * @returns
 */
export const createTheme = (theme: ITheme) => {
  return createMuiTheme({
    palette: { ...theme.colors },
    typography: { ...theme.typography }
  });
};
