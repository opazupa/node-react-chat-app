import { INotifyStore, NotifyStore } from './NotifyStore';
import { ISocketClient, SocketClient } from './SocketClient';
import { IThemeStore, ThemeStore } from './ThemeStore';
import { IUserStore, UserStore } from './UserStore';

/**
 * IRootStore
 *
 * @export
 * @interface IRootStore
 */
export interface IRootStore {
  userStore: IUserStore;
  themeStore: IThemeStore;
  socket: ISocketClient;
  notifyStore: INotifyStore;
}

/**
 * Root store to initialize sub-stores.
 *
 * @class RootStore
 * @implements {IRootStore}
 */
class RootStore implements IRootStore {
  public userStore: IUserStore;
  public themeStore: IThemeStore;
  public socket: ISocketClient;
  public notifyStore: INotifyStore;

  constructor() {
    this.userStore = new UserStore();
    this.themeStore = new ThemeStore();
    this.socket = new SocketClient();
    this.notifyStore = new NotifyStore();
  }
}

export default new RootStore();
