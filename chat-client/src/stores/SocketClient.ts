import { ISocket, Socket } from '@app/common/socket';
import { observable } from 'mobx';

export interface ISocketClient {
  client: ISocket;
}

export class SocketClient implements ISocketClient {
  @observable public client = new Socket();
}
