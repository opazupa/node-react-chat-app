import { IChat } from '@app/common/models';
import { INotifyStore, ISocketClient } from '@app/stores';
import { Button, Grid, Typography } from '@material-ui/core';
import BackIcon from '@material-ui/icons/ChevronLeft';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { match } from 'react-router';
import { Link } from 'react-router-dom';

interface IChatroomProps {
  socket?: ISocketClient;
  notifyStore?: INotifyStore;
  match: match<{ name: string }>;
}

interface IChatroomState {
  roomName: string;
  failedToJoin: boolean;
  chatHistory: IChat[];
}

@inject('socket')
@inject('notifyStore')
@observer
class Chatroom extends React.Component<IChatroomProps, IChatroomState> {
  constructor(props: IChatroomProps, context) {
    super(props, context);
    this.state = {
      roomName: this.props.match.params.name,
      failedToJoin: false,
      chatHistory: []
    };
  }

  public componentDidMount() {
    // register handler here
    this.props.socket!.client.registerHandler((chat: IChat) => {
      console.log(chat);
      this.setState({ chatHistory: this.state.chatHistory.concat(chat) });
    });

    // join chat room when mounted
    this.props.socket!.client.join(this.state.roomName, (err: any, chats: IChat[]) => {
      if (err) {
        this.props.notifyStore!.showError(err);
        this.setState({ failedToJoin: true, chatHistory: [] });
      } else {
        this.setState({ chatHistory: chats });
      }
    });
  }

  public componentWillUnmount() {
    this.props.socket!.client.unregisterHandler();
    // leave room on destroy
    console.log(this.state.roomName);
    if (this.state.roomName) {
      // tslint:disable-next-line:no-empty
      this.props.socket!.client.leave(this.state.roomName, (err: any, chats: IChat[]) => {});
    }
  }

  public render() {
    return (
      <Grid container justify="center">
        {this.state.failedToJoin ? (
          <Grid item>
            <Typography variant="h6" color="textPrimary">
              Failed to join room {this.state.roomName} :(
            </Typography>
          </Grid>
        ) : (
          <Grid container justify="center" direction="column" spacing={16}>
            <Grid item spacing={8}>
              <Button
                variant="outlined"
                color="secondary"
                component={({ innerRef, color, variant, ...props }) => <Link {...props} to="/chatrooms" />}
              >
                <BackIcon />
                Chatrooms
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() =>
                  this.props.socket!.client.message(
                    this.state.roomName,
                    `Test message to ${this.state.roomName}`,
                    (err: any, chats: IChat[]) => {
                      console.log('viesti meni');
                    }
                  )
                }
              >
                Send test message
              </Button>
            </Grid>
            <Grid item>
              {this.state.chatHistory.map((chat: IChat, i) => [
                <div key={i}>
                  {chat.event
                    ? `${chat.event} ${new Date(chat.timestamp).toString()}`
                    : `${chat.userName} ${chat.message} ${new Date(chat.timestamp).toString()}`}
                </div>
              ])}
            </Grid>
          </Grid>
        )}
      </Grid>
    );
  }
}

export default Chatroom;
