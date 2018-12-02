import './css/App.css';

import * as React from 'react';

import logo from './logo.svg';
import socket, { ISocket } from './socket/socket';

export interface IUser {
  id: string;
  nickname: string;
}

export interface IAppState {
  chatrooms: IChatroom[];
  client: ISocket;
  isRegisterInProcess: boolean;
  user?: IUser;
}

export interface IChatroom {
  name: string;
}

class App extends React.Component {
  public state: IAppState;

  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      chatrooms: [],
      client: socket(),
      isRegisterInProcess: false,
      user: undefined
    };
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
        <button onClick={() => this.join('Room1')}>Join</button>
        <button
          onClick={() =>
            this.state.client.message('Room1', 'Hei olen olli', () => {
              console.log('viesti meni');
            })
          }
        >
          Send message
        </button>
      </div>
    );
  }

  private join(room: string) {
    this.state.client.join(room, () => {
      this.setState({ chatrooms: [...this.state.chatrooms, room] });
    });
  }

  private register() {
    const onRegisterResponse = (user?: IUser) => this.setState({ isRegisterInProcess: false, user });
    this.setState({ isRegisterInProcess: true });
    this.state.client.register(name, (err: any, user: IUser) => {
      if (err) {
        return onRegisterResponse(undefined);
      }
      return onRegisterResponse(user);
    });
  }
}

export default App;
