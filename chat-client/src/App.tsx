import { CssBaseline, MuiThemeProvider, Paper } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { createTheme, IChat, IChatroom, IUser } from './common/models';
import { ISocket, Socket } from './common/socket';
import { NoMatch, ProtectedUserRoute } from './common/utils';
import { Footer, Navbar } from './components';
import { IThemeStore, IUserStore } from './stores';
import { Chatroom, ChatroomSelection, Home, ThemePicker } from './views';

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

const Main = styled(props => <Paper {...props} />)`
  padding: 15px;
  margin-top: 64px;
  text-align: center;
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

    this.state.client.registerHandler((chat: IChat) => {
      console.log(chat);
      this.setState({ chathistory: this.state.chathistory.concat(chat) });
    });
  }

  public render() {
    const { themeStore } = this.props;
    return (
      <MuiThemeProvider theme={createTheme(themeStore!.theme)}>
        <CssBaseline />
        <Navbar />
        <Main>
          <Switch>
            <Route exact path="/" render={() => <Home onRegister={(name: string) => this.register(name)} />} />
            <Route exact path="/theme" component={ThemePicker} />
            <ProtectedUserRoute exact path="/chatrooms" component={ChatroomSelection} />
            <ProtectedUserRoute path="/chatroom/:id" component={Chatroom} />
            <Route component={NoMatch} />
          </Switch>
        </Main>
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

  private register(name: string) {
    this.state.client.register(name, (err: any, user: IUser) => {
      if (err) {
        this.props.userStore!.unRegister();
      } else {
        this.props.userStore!.register(user!);
        // this.props.history;
      }
    });
  }
}

export default App;
