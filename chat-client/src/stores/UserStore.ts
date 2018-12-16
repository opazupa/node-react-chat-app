import { action, computed, observable } from 'mobx';

import { IUser } from '../common/models';
import { autoSave } from './utils/AutoSave';

export interface IUserStore {
  user?: IUser;
  registered: boolean;
  register: (newUser: IUser) => void;
  unRegister: () => void;
}

export class UserStore implements IUserStore {
  @observable public user?: IUser = undefined;
  @computed
  get registered() {
    return this.user && this.user.userName ? true : false;
  }

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
