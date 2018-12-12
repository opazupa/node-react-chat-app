import { Button, CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { green, grey, red } from '@material-ui/core/colors';
import * as colors from '@material-ui/core/colors';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { ISocket, Socket } from './common';
import { createTheme, IChat, IChatroom, IUser } from './common/models';
import { NoMatch } from './common/utils/NoMatch';
import ProtectedUserRoute from './common/utils/ProtectedUserRoute';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { IThemeStore } from './stores/ThemeStore';
import { IUserStore } from './stores/UserStore';
import { Chatroom } from './views/Chatroom';
import { ChatroomSelection } from './views/ChatroomSelection';
import { Home } from './views/Home';

interface IAppProps {
  themeStore?: IThemeStore;
  userStore?: IUserStore;
}

interface IAppState {
  chatroom?: IChatroom;
  client: ISocket;
  isRegisterInProcess: boolean;
  user?: IUser;
  name: string;
  room: string;
  chathistory: IChat[];
}

const Main = styled.main`
  padding: 10px 15px;
  margin-top: 64px;
  flex: 1 0 auto;
`;

@(withRouter as any)
@inject('themeStore')
@inject('userStore')
@observer
class App extends React.Component<IAppProps, IAppState> {
  public state: IAppState;

  constructor(props: IAppProps, context: any) {
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

    console.log(colors);

    this.state.client.registerHandler((chat: IChat) => {
      console.log(chat);
      this.setState({ chathistory: this.state.chathistory.concat(chat) });
    });
  }

  public render() {
    const { themeStore } = this.props as IAppProps;
    return (
      <MuiThemeProvider theme={createTheme(themeStore!.theme)}>
        <CssBaseline />
        <Navbar />
        <Main>
          <Switch>
            <Route exact path="/" component={Home} />
            <ProtectedUserRoute exact path="/chatrooms" component={ChatroomSelection} />
            <ProtectedUserRoute path="/chatroom/:id" component={Chatroom} />
            <Route component={NoMatch} />
          </Switch>
        </Main>
        <Button variant="outlined" onClick={() => themeStore!.set(grey, green, red, 'dark', colors.lime)}>
          Switch theme to green
        </Button>
        <button onClick={() => this.register()}>Register</button>
        <Footer />
        {/* <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
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
        ])} */}
      </MuiThemeProvider>
    );
  }
  // private leave(room: string) {
  //   this.state.client.leave(room, (err: any, chats: IChat[]) => {
  //     this.setState({ chatroom: undefined });
  //   });
  // }

  // private join(room: string) {
  //   this.state.client.join(room, (err: any, chats: IChat[]) => {
  //     this.setState({ chatrooms: room });
  //     this.setState({ chathistory: chats });
  //   });
  // }

  private register() {
    const onRegisterResponse = (user?: IUser) => {
      console.log(user);
      this.setState({ isRegisterInProcess: false });
      this.props.userStore!.register(user!);
    };
    this.setState({ isRegisterInProcess: true });
    this.state.client.register(this.state.name, (err: any, user: IUser) => {
      if (err) {
        this.props.userStore!.unRegister();
      }
      return onRegisterResponse(user);
    });
  }
}

export default App;
