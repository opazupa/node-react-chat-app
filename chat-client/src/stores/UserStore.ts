import { action, observable } from 'mobx';

import { IUser } from '../common/models';
import { autoSave } from './utils/AutoSave';

export interface IUserStore {
  user?: IUser;
  register: (newUser: IUser) => void;
  unRegister: () => void;
}

export class UserStore implements IUserStore {
  @observable public user?: IUser = undefined;

  constructor() {
    autoSave(this);
  }

  @action
  public register(newUser: IUser) {
    this.user = newUser;
  }

  @action
  public unRegister() {
    this.user = undefined;
  }
}
