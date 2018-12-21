import { ISocketClient, SocketClient } from './SocketClient';
import { IThemeStore, ThemeStore } from './ThemeStore';
import { IUserStore, UserStore } from './UserStore';

export interface IRootStore {
  userStore: IUserStore;
  themeStore: IThemeStore;
  socket: ISocketClient;
}

class RootStore implements IRootStore {
  public userStore: IUserStore;
  public themeStore: IThemeStore;
  public socket: ISocketClient;

  constructor() {
    this.userStore = new UserStore();
    this.themeStore = new ThemeStore();
    this.socket = new SocketClient();
  }
}

export default new RootStore();
