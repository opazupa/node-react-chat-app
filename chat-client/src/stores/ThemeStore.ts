import { Color } from '@material-ui/core';
import { amber, grey, red } from '@material-ui/core/colors';
import { action, observable } from 'mobx';

import { ITheme } from '../common/models/ITheme';
import { autoSave } from './utils/AutoSave';

export interface IThemeStore {
  theme: ITheme;
  highlightColor: string;
  set: (primary: Color, secondary: Color, error: Color, type: 'light' | 'dark', highlightColor?: Color) => void;
  reset: () => void;
}
const DEFAULT_THEME = {
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

const DEFAULT_HIGHLIGHT_COLOR = '#ffb7b7';

export class ThemeStore implements IThemeStore {
  @observable public theme = DEFAULT_THEME;
  @observable public highlightColor = DEFAULT_HIGHLIGHT_COLOR;

  constructor() {
    autoSave(this);
  }

  @action
  public set(primary: Color, secondary: Color, error: Color, type: 'light' | 'dark', highlightColor?: Color) {
    this.theme.colors = { primary, secondary, error, type };
    if (highlightColor) {
      this.highlightColor = highlightColor[500];
    }
  }

  @action
  public reset() {
    this.theme = DEFAULT_THEME;
    this.highlightColor = DEFAULT_HIGHLIGHT_COLOR;
  }
}
