import { Color } from '@material-ui/core';
import { amber, grey, red } from '@material-ui/core/colors';
import { action, observable } from 'mobx';

import { ITheme } from '../common/models/ITheme';
import { autoSave } from './utils/AutoSave';

export interface IThemeStore {
  theme: ITheme;
  set: (primary: Color, secondary: Color, error: Color, type: 'light' | 'dark') => void;
  reset: () => void;
}
export const DEFAULT_THEME = {
  colors: {
    primary: grey,
    secondary: amber,
    error: red,
    type: 'light'
  },
  typography: {
    fontFamily: ['"Raleway"', '"Segoe UI"'].join(','),
    useNextVariants: true
  }
} as ITheme;

class ThemeStore implements IThemeStore {
  @observable public theme = DEFAULT_THEME;

  constructor() {
    autoSave(this);
  }

  @action
  public set(primary: Color, secondary: Color, error: Color, type: 'light' | 'dark') {
    this.theme.colors = { primary, secondary, error, type };
  }

  @action
  public reset() {
    this.theme = DEFAULT_THEME;
  }
}

export default new ThemeStore();
