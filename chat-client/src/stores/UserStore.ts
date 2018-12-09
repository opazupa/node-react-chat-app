import { action, observable } from 'mobx';

import { IUser } from '../common/models';
import { autoSave } from './utils/AutoSave';

export interface IUserStore {
  user?: IUser;
  register: (newUser: IUser) => void;
  unRegister: () => void;
}

class UserStore implements IUserStore {
  @observable public user? = {} as IUser;

  constructor() {
    autoSave(this);
  }

  @action
  public register(newUser: IUser) {
    this.user = newUser;
  }

  @action
  public unRegister() {
    this.user = {} as IUser;
  }
}

export default new UserStore();
