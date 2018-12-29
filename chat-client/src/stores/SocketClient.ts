import { ISocket, Socket } from '@app/common/socket';
import { observable } from 'mobx';

/**
 * ISocketClient
 *
 * @export
 * @interface ISocketClient
 */
export interface ISocketClient {
  client: ISocket;
}

/**
 * Store  for accessing socket client.
 *
 * @export
 * @class SocketClient
 * @implements {ISocketClient}
 */
export class SocketClient implements ISocketClient {
  @observable public client = new Socket();
}
