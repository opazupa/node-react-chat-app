import { Fab, Grid, TextField, Typography, Zoom } from '@material-ui/core';
import UserIcon from '@material-ui/icons/DirectionsRunOutlined';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import { Emoji } from '../common/utils';
import { IUserStore } from '../stores';

interface IHomeProps {
  userStore?: IUserStore;
  onRegister: (name: string) => any;
}
interface IHomeState {
  userName: string;
}

@inject('userStore')
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
          <Typography variant="h4">Welcome to Olli's chat</Typography>
          <Typography>
            Select username and fire up some chats <Emoji symbol="🔥" />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="userName"
            // className={}
            variant="outlined"
            type="text"
            label="Username"
            value={this.state.userName}
            onChange={this.handleUserNameChange()}
          />
        </Grid>
        <Grid item xs={12}>
          <Zoom in={this.state.userName ? true : false} style={{ transitionDelay: '200ms' }}>
            <Fab variant="extended" size="large" color="secondary" aria-label="Submit" onClick={() => this.registerUser()}>
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

  private registerUser() {
    this.props.onRegister(this.state.userName);
  }
}

export default Home;
