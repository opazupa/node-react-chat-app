import { CssBaseline, MuiThemeProvider, Paper } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { createTheme, IUser } from './common/models';
import { NoMatch, ProtectedUserRoute } from './common/utils';
import { Footer, Navbar, NotificationHandler } from './components';
import { INotifyStore, ISocketClient, IThemeStore, IUserStore } from './stores';
import { Chatroom, ChatroomSelection, Home, ThemePicker } from './views';

interface IAppProps {
  themeStore?: IThemeStore;
  userStore?: IUserStore;
  notifyStore?: INotifyStore;
  socket?: ISocketClient;
}

const Main = styled(props => <Paper {...props} />)`
  padding: 30px 15px 15px 15px;
  margin-top: 64px;
  text-align: center;
  flex: 1 0 auto;
  display: flex;
  align-items: flex-start;
`;

@(withRouter as any)
@inject('themeStore')
@inject('notifyStore')
@inject('userStore')
@inject('socket')
@observer
class App extends React.Component<IAppProps, {}> {
  constructor(props: IAppProps, context: any) {
    super(props, context);
  }

  public componentWillMount() {
    this.handleClientReconnect();
  }

  public render() {
    const { themeStore } = this.props;
    return (
      <MuiThemeProvider theme={createTheme(themeStore!.theme)}>
        <CssBaseline />
        <Navbar />
        <Main>
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/theme" component={ThemePicker} />
            <ProtectedUserRoute exact path="/chatrooms" component={ChatroomSelection} />
            <ProtectedUserRoute path="/chatroom/:name" component={Chatroom} />
            <Route component={NoMatch} />
          </Switch>
        </Main>
        <NotificationHandler />
        <Footer />
      </MuiThemeProvider>
    );
  }

  private handleClientReconnect = (): void => {
    if (this.props.userStore!.registered) {
      // Re register here when refreshed if there is usee data in state!
      this.props.socket!.client.register(this.props.userStore!.user!.userName, (err: any, user: IUser) => {
        if (err) {
          this.props.notifyStore!.showError(err);
          this.props.userStore!.unRegister();
        } else {
          this.props.userStore!.register(user!);
        }
      });
    }
  };
}

export default App;
