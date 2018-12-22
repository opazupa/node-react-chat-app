import { IChat, IChatroom } from '@app/common/models';
import { observable } from 'mobx';

export interface IChatStore {
  chatroom: IChatroom;
  chatHistory: IChat[];
}

export class ChatStore implements IChatStore {
  @observable public chatroom: IChatroom;
  @observable public chatHistory: IChat[] = [];
}
