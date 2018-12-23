import { IChat, IChatroom } from '@app/common/models';
import { action, observable } from 'mobx';

export interface IChatStore {
  chatroom?: IChatroom;
  chatHistory: IChat[];
  joinRoom: (chatroom: IChatroom) => void;
  leaveRoom: () => void;
}

export class ChatStore implements IChatStore {
  @observable public chatroom?: IChatroom;
  @observable public chatHistory: IChat[] = [];

  @action
  public joinRoom = (chatroom: IChatroom) => {
    this.chatroom = chatroom;
  };

  @action
  public leaveRoom = () => {
    this.chatroom = undefined;
  };
}
