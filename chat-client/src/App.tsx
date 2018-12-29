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

/**
 * Main container for router
 */
const Main = styled(props => <Paper elevation={0} square {...props} />)`
  padding: 10px 15px 0 15px;
  margin-top: 64px;
  flex: 1 0 auto;
  display: flex;
  align-items: flex-start;
`;

/**
 * AppProps
 *
 * @interface IAppProps
 */
interface IAppProps {
  themeStore?: IThemeStore;
  userStore?: IUserStore;
  notifyStore?: INotifyStore;
  socket?: ISocketClient;
}

/**
 * Main app component.
 *
 * @class App
 * @extends {React.Component<IAppProps, {}>}
 */
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

  /**
   * Handles client reconnecting when refreshing or so.
   *
   * @private
   * @memberof App
   */
  private handleClientReconnect = (): void => {
    if (this.props.userStore!.registered) {
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
