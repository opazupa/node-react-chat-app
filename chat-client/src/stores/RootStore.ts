import { IThemeStore, ThemeStore } from './ThemeStore';
import { IUserStore, UserStore } from './UserStore';

export interface IRootStore {
  userStore: IUserStore;
  themeStore: IThemeStore;
}

class RootStore implements IRootStore {
  public userStore: IUserStore;
  public themeStore: IThemeStore;

  constructor() {
    this.userStore = new UserStore();
    this.themeStore = new ThemeStore();
  }
}

export default new RootStore();
