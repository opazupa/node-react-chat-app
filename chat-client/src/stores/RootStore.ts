import ThemeStore, { IThemeStore } from './ThemeStore';
import UserStore, { IUserStore } from './UserStore';

export interface IRootStore {
  userStore: IUserStore;
  themeStore: IThemeStore;
}

class RootStore implements IRootStore {
  public userStore: IUserStore;
  public themeStore: IThemeStore;

  constructor() {
    this.userStore = UserStore;
    this.themeStore = ThemeStore;
  }
}

export default new RootStore();
