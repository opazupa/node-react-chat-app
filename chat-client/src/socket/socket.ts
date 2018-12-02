import * as socketIO from 'socket.io-client';

export interface ISocket {
  registerHandler: (onMessageReceived: any) => void;
  unregisterHandler: () => void;
  register: (name: string, cb: any) => void;
  join: (chatroomName: string, cb: any) => void;
  leave: (chatroomName: string, cb: any) => void;
  message: (chatroomName: string, msg: string, cb: any) => void;
  getChatrooms: (cb: any) => void;
}

export default function(): ISocket {
  const socket: SocketIOClient.Socket = socketIO.connect(process.env.SERVER_URL || 'http://localhost:5000');

  function registerHandler(onMessageReceived: any) {
    socket.on('message', onMessageReceived);
  }

  function unregisterHandler() {
    socket.off('message');
  }

  socket.on('error', (err: any) => {
    // tslint:disable-next-line:no-console
    console.log('received socket error:');
    console.log(err);
  });

  function register(name: string, cb: any) {
    socket.emit('register', name, cb);
  }

  function join(chatroomName: string, cb: any) {
    socket.emit('join', chatroomName, cb);
  }

  function leave(chatroomName: string, cb: any) {
    socket.emit('leave', chatroomName, cb);
  }

  function message(chatroomName: string, msg: string, cb: any) {
    socket.emit('message', { chatroomName, message: msg }, cb);
  }

  function getChatrooms(cb: any) {
    socket.emit('chatrooms', null, cb);
  }

  // function getAvailableUsers(cb:any) {
  //   socket.emit('availableUsers', null, cb);
  // }

  return {
    getChatrooms,
    join,
    leave,
    message,
    // getAvailableUsers,
    register,
    registerHandler,
    unregisterHandler
  };
}
