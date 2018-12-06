import './css/App.css';

import * as React from 'react';

import logo from './logo.svg';
import { ISocket, Socket } from './socket/Socket';

export interface IChat {
  cleintId: string;
  userName: string;
  timestamp: Date;
  event?: string;
  message?: string;
}

export interface IUser {
  id: string;
  name: string;
}

export interface IAppState {
  chatroom?: IChatroom;
  client: ISocket;
  isRegisterInProcess: boolean;
  user?: IUser;
  name: string;
  room: string;
  chathistory: IChat[];
}

export interface IChatroom {
  name: string;
}

class App extends React.Component {
  public state: IAppState;

  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      chathistory: [],
      chatroom: undefined,
      client: new Socket(),
      isRegisterInProcess: false,
      name: 'OlliMoll1',
      room: 'Room1',
      user: undefined
    };

    this.state.client.registerHandler((chat: IChat) => {
      console.log(chat);
      this.setState({ chathistory: this.state.chathistory.concat(chat) });
    });
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={() => this.register()}>Register</button>
        <button onClick={() => this.join(this.state.room)}>Join</button>
        <button onClick={() => this.leave(this.state.room)}>Leave</button>
        <button
          onClick={() =>
            this.state.client.message(this.state.room, 'Hei olen olli', (err: any, chats: IChat[]) => {
              console.log('viesti meni');
            })
          }
        >
          Send message
        </button>
        {this.state.chathistory.map((chat: IChat, i) => [
          <div key={i}>
            {chat.event
              ? `${chat.event} ${new Date(chat.timestamp).toString()}`
              : `${chat.userName} ${chat.message} ${new Date(chat.timestamp).toString()}`}
          </div>
        ])}
      </div>
    );
  }

  private leave(room: string) {
    this.state.client.leave(room, (err: any, chats: IChat[]) => {
      this.setState({ chatroom: undefined });
    });
  }

  private join(room: string) {
    this.state.client.join(room, (err: any, chats: IChat[]) => {
      this.setState({ chatrooms: room });
      this.setState({ chathistory: chats });
    });
  }

  private register() {
    const onRegisterResponse = (user?: IUser) => this.setState({ isRegisterInProcess: false, user });
    this.setState({ isRegisterInProcess: true });
    this.state.client.register(this.state.name, (err: any, user: IUser) => {
      if (err) {
        return onRegisterResponse(undefined);
      }
      return onRegisterResponse(user);
    });
  }
}

export default App;
