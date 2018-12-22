import { INotifyMessage } from '@app/common/models';
import { action, computed, observable } from 'mobx';

export interface INotifyStore {
  messages: INotifyMessage[];
  current?: INotifyMessage;
  showMessage: (message: string) => void;
  showError: (message: string) => void;
  hideCurrent: () => void;
  handleNext: () => void;
}

export class NotifyStore implements INotifyStore {
  @observable public messages: INotifyMessage[] = [];

  @computed
  get current(): INotifyMessage | undefined {
    return this.messages.length === 0 ? undefined : this.messages[0];
  }

  @action
  public showMessage = (message: string) => {
    this.hideCurrent();
    this.messages.push({ message, type: 'success', show: true });
  };

  @action
  public showError = (message: string) => {
    this.hideCurrent();
    this.messages.push({ message, type: 'error', show: true });
  };

  @action
  public hideCurrent = () => {
    if (this.messages.length > 0) {
      this.messages[0].show = false;
    }
  };

  @action
  public handleNext = () => {
    this.messages = this.messages.slice(1);
  };
}
