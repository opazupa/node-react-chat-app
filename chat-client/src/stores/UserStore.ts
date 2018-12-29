import { IUser } from '@app/common/models';
import { action, computed, observable } from 'mobx';

import { autoSave } from './utils/AutoSave';

/**
 * IUserStore
 *
 * @export
 * @interface IUserStore
 */
export interface IUserStore {
  user?: IUser;
  registered: boolean;
  register: (newUser: IUser) => void;
  unRegister: () => void;
}

/**
 * Store for user and registeration.
 * Autosaved!.
 *
 * @export
 * @class UserStore
 * @implements {IUserStore}
 */
export class UserStore implements IUserStore {
  @observable public user?: IUser = undefined;

  /**
   * Checks whether user is registered.
   *
   * @readonly
   * @memberof UserStore
   */
  @computed
  get registered() {
    return this.user && this.user.userName ? true : false;
  }

  constructor() {
    autoSave(this);
  }

  /**
   * Registers user.
   *
   * @param {IUser} newUser
   * @memberof UserStore
   */
  @action
  public register(newUser: IUser) {
    this.user = newUser;
  }

  /**
   * Unregisters user.
   *
   * @memberof UserStore
   */
  @action
  public unRegister() {
    this.user = undefined;
  }
}
