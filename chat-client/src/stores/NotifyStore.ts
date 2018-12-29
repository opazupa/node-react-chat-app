import { INotifyMessage } from '@app/common/models';
import { action, computed, observable } from 'mobx';

/**
 * INotifyStore
 *
 * @export
 * @interface INotifyStore
 */
export interface INotifyStore {
  messages: INotifyMessage[];
  current?: INotifyMessage;
  showMessage: (message: string) => void;
  showError: (message: string) => void;
  hideCurrent: () => void;
  handleNext: () => void;
}

/**
 * Store for notification handling.
 *
 * @export
 * @class NotifyStore
 * @implements {INotifyStore}
 */
export class NotifyStore implements INotifyStore {
  @observable public messages: INotifyMessage[] = [];

  /**
   * Gets next message to show.
   *
   * @readonly
   * @type {(INotifyMessage | undefined)}
   * @memberof NotifyStore
   */
  @computed
  get current(): INotifyMessage | undefined {
    return this.messages.length === 0 ? undefined : this.messages[0];
  }

  /**
   * Shows message.
   *
   * @memberof NotifyStore
   */
  @action
  public showMessage = (message: string) => {
    this.hideCurrent();
    this.messages.push({ message, type: 'success', show: true });
  };

  /**
   * Shows error.
   *
   * @memberof NotifyStore
   */
  @action
  public showError = (message: string) => {
    this.hideCurrent();
    this.messages.push({ message, type: 'error', show: true });
  };

  /**
   * Handles next message in queue.
   *
   * @memberof NotifyStore
   */
  @action
  public handleNext = () => {
    this.messages = this.messages.slice(1);
  };

  /**
   * Hides current message
   *
   * @memberof NotifyStore
   */
  @action
  public hideCurrent = () => {
    if (this.messages.length > 0) {
      this.messages[0].show = false;
    }
  };
}
