import { ITheme } from '@app/common/models/ITheme';
import { Color } from '@material-ui/core';
import { amber, grey, red } from '@material-ui/core/colors';
import { action, observable } from 'mobx';

import { autoSave } from './utils/AutoSave';

/**
 * IThemeStore
 *
 * @export
 * @interface IThemeStore
 */
export interface IThemeStore {
  theme: ITheme;
  highlightColor: string;
  setPrimaryColor: (primary: Color) => void;
  setSecondaryColor: (secondary: Color) => void;
  setErrorColor: (error: Color) => void;
  setType: (type: 'light' | 'dark') => void;
  setHighlightColor: (highlightColor: Color) => void;
  set: (primary: Color, secondary: Color, error: Color, type: 'light' | 'dark', highlightColor?: Color) => void;
  reset: () => void;
}

/**
 * Default theme.
 */
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

/**
 * Default highlight color.
 */
const DEFAULT_HIGHLIGHT_COLOR = '#ffb7b7';

/**
 * Store for accessing user theme.
 * Autosaved!.
 *
 * @export
 * @class ThemeStore
 * @implements {IThemeStore}
 */
export class ThemeStore implements IThemeStore {
  @observable public theme = DEFAULT_THEME;
  @observable public highlightColor = DEFAULT_HIGHLIGHT_COLOR;

  constructor() {
    autoSave(this);
  }

  /**
   * Sets primary color.
   *
   * @param {Color} primary
   * @memberof ThemeStore
   */
  @action
  public setPrimaryColor(primary: Color) {
    this.theme.colors.primary = primary;
  }

  /**
   * Sets secondary color.
   *
   * @param {Color} secondary
   * @memberof ThemeStore
   */
  @action
  public setSecondaryColor(secondary: Color) {
    this.theme.colors.secondary = secondary;
  }

  /**
   * Sets error color.
   *
   * @param {Color} error
   * @memberof ThemeStore
   */
  @action
  public setErrorColor = (error: Color) => {
    this.theme.colors.error = error;
  };

  /**
   * Sets type.
   *
   * @memberof ThemeStore
   */
  @action
  public setType = (type: 'light' | 'dark') => {
    this.theme.colors.type = type;
  };
  /**
   * Sets highlight color.
   *
   * @memberof ThemeStore
   */
  @action
  public setHighlightColor = (highlightColor: Color) => {
    this.highlightColor = highlightColor[500];
  };

  /**
   * Applies given theme.
   *
   * @memberof ThemeStore
   */
  @action
  public set = (primary: Color, secondary: Color, error: Color, type: 'light' | 'dark', highlightColor?: Color) => {
    this.theme.colors = { primary, secondary, error, type };
    if (highlightColor) {
      this.highlightColor = highlightColor[500];
    }
  };

  /**
   * Resets thme to default.
   *
   * @memberof ThemeStore
   */
  @action
  public reset = () => {
    this.theme = DEFAULT_THEME;
    this.highlightColor = DEFAULT_HIGHLIGHT_COLOR;
  };
}
