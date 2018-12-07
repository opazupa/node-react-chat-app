import * as socketIO from 'socket.io-client';

/**
 * ISocket.
 *
 * @export
 * @interface ISocket
 */
export interface ISocket {
  registerHandler: (onMessageReceived: any) => void;
  unregisterHandler: () => void;
  register: (name: string, cb: any) => void;
  join: (chatroomName: string, cb: any) => void;
  leave: (chatroomName: string, cb: any) => void;
  message: (chatroomName: string, msg: string, cb: any) => void;
  getChatrooms: (cb: any) => void;
}

/**
 * Socket API for socket IO.
 *
 * @export
 * @class Socket
 * @implements {ISocket}
 */
export class Socket implements ISocket {
  private socket: SocketIOClient.Socket;

  constructor() {
    this.socket = socketIO.connect(process.env.SERVER_URL || '');

    this.socket.on('error', (err: any) => {
      console.log('received socket error:' + err);
    });
  }

  /**
   * Subscribes client for new messages.
   *
   * @param {*} onMessageReceived
   * @memberof Socket
   */
  public registerHandler(onMessageReceived: any) {
    this.socket.on('message', onMessageReceived);
  }

  /**
   * Unsubscribes client from messages.
   *
   * @memberof Socket
   */
  public unregisterHandler() {
    this.socket.off('message');
  }

  /**
   * Registers username for client.
   *
   * @param {string} name
   * @param {*} cb
   * @memberof Socket
   */
  public register(name: string, cb: any) {
    this.socket.emit('register', name, cb);
  }

  /**
   * Joins a given chatroom.
   *
   * @param {string} chatroomName
   * @param {*} cb
   * @memberof Socket
   */
  public join(chatroomName: string, cb: any) {
    this.socket.emit('join', chatroomName, cb);
  }

  /**
   * Leaves given chatroom.
   *
   * @param {string} chatroomName
   * @param {*} cb
   * @memberof Socket
   */
  public leave(chatroomName: string, cb: any) {
    this.socket.emit('leave', chatroomName, cb);
  }

  /**
   * Send new message to chatroom.
   *
   * @param {string} chatroomName
   * @param {string} msg
   * @param {*} cb
   * @memberof Socket
   */
  public message(chatroomName: string, msg: string, cb: any) {
    this.socket.emit('message', { chatroomName, message: msg }, cb);
  }

  /**
   * Get all availevable chatrooms.
   *
   * @param {*} cb
   * @memberof Socket
   */
  public getChatrooms(cb: any) {
    this.socket.emit('chatrooms', null, cb);
  }
}
