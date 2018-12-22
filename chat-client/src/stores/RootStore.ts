import { ChatStore, IChatStore } from './ChatStore';
import { INotifyStore, NotifyStore } from './NotifyStore';
import { ISocketClient, SocketClient } from './SocketClient';
import { IThemeStore, ThemeStore } from './ThemeStore';
import { IUserStore, UserStore } from './UserStore';

export interface IRootStore {
  userStore: IUserStore;
  themeStore: IThemeStore;
  socket: ISocketClient;
  notifyStore: INotifyStore;
  chatStore: IChatStore;
}

class RootStore implements IRootStore {
  public userStore: IUserStore;
  public themeStore: IThemeStore;
  public socket: ISocketClient;
  public notifyStore: INotifyStore;
  public chatStore: IChatStore;

  constructor() {
    this.userStore = new UserStore();
    this.themeStore = new ThemeStore();
    this.socket = new SocketClient();
    this.notifyStore = new NotifyStore();
    this.chatStore = new ChatStore();
  }
}

export default new RootStore();
