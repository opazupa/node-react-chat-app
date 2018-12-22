import { IUser } from '@app/common/models';
import { Emoji } from '@app/common/utils';
import { Logo } from '@app/components';
import { INotifyStore, ISocketClient, IUserStore } from '@app/stores';
import { Fab, Grid, TextField, Typography, Zoom } from '@material-ui/core';
import UserIcon from '@material-ui/icons/DirectionsRunOutlined';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { withRouter } from 'react-router-dom';

interface IHomeProps {
  userStore?: IUserStore;
  notifyStore?: INotifyStore;
  socket?: ISocketClient;
  history?: any;
}
interface IHomeState {
  userName: string;
}

@(withRouter as any)
@inject('userStore')
@inject('notifyStore')
@inject('socket')
@observer
class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps, context) {
    super(props, context);

    this.state = {
      userName: (props.userStore!.user && props.userStore!.user!.userName) || ''
    };
  }

  public render() {
    const { userStore } = this.props;

    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={8} direction="column">
            <Grid item>
              <Logo />
            </Grid>
            <Grid item>
              <Typography color="textSecondary">
                Select username and fire up some chats <Emoji symbol="💪" />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="userName"
            variant="outlined"
            type="text"
            label="Username"
            value={this.state.userName}
            onChange={this.handleUserNameChange()}
          />
        </Grid>
        <Grid item xs={12}>
          <Zoom in={this.state.userName ? true : false} style={{ transitionDelay: '200ms' }}>
            <Fab type="submit" variant="extended" size="large" color="secondary" aria-label="Submit" onClick={this.registerUser()}>
              <UserIcon style={{ marginRight: '5px' }} />
              {userStore!.registered ? 'Change username' : `Let's go!`}
            </Fab>
          </Zoom>
        </Grid>
      </Grid>
    );
  }

  private handleUserNameChange = () => event => {
    this.setState({ userName: event.target.value });
    return;
  };

  private registerUser = () => event => {
    this.props.socket!.client.register(this.state.userName, (err: any, user: IUser) => {
      if (err) {
        this.props.notifyStore!.showError(err);
      } else {
        if (!this.props.userStore!.registered) {
          this.props.userStore!.register(user!);
          this.props.history.push('/chatrooms');
          return;
        }
        this.props.notifyStore!.showMessage(`Username changed`);
        this.props.userStore!.register(user!);
      }
    });
  };
}

export default Home;
