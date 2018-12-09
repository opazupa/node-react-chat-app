import { Color, createMuiTheme } from '@material-ui/core';

export interface ITheme {
  colors: {
    primary: Color;
    secondary: Color;
    error: Color;
    type: 'light' | 'dark';
  };
  typography: { [Key: string]: any };
}

export const createTheme = (theme: ITheme) => {
  return createMuiTheme({
    palette: { ...theme.colors },
    typography: { ...theme.typography }
  });
};
