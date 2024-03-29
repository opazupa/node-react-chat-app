import { IChat, IChatroom } from '@app/common/models';
import { Loading } from '@app/components';
import { INotifyStore, ISocketClient, IThemeStore, IUserStore } from '@app/stores';
import { Grid, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { match } from 'react-router';

import ChatBox from './ChatBox';
import ChatHeader from './ChatHeader';
import ChatWriter from './ChatWriter';

/**
 * IChatroomProps
 *
 * @interface IChatroomProps
 */
interface IChatroomProps {
  socket?: ISocketClient;
  userStore?: IUserStore;
  notifyStore?: INotifyStore;
  themeStore?: IThemeStore;
  match: match<{ name: string }>;
}

/**
 * IChatroomState
 *
 * @interface IChatroomState
 */
interface IChatroomState {
  roomName: string;
  room?: IChatroom;
  failedToJoin: boolean;
  isLoading: boolean;
  chatHistory: IChat[];
}

/**
 * Component for single chatroom view.
 *
 * @class Chatroom
 * @extends {React.Component<IChatroomProps, IChatroomState>}
 */
@inject('socket')
@inject('userStore')
@inject('themeStore')
@inject('notifyStore')
@observer
class Chatroom extends React.Component<IChatroomProps, IChatroomState> {
  constructor(props: IChatroomProps, context) {
    super(props, context);
    this.state = {
      roomName: this.props.match.params.name,
      failedToJoin: false,
      isLoading: true,
      room: undefined,
      chatHistory: []
    };

    // For the looks!
    setTimeout(() => this.getChatroomInfo(), 1500);
  }

  public componentDidMount() {
    // Register message handler when mounted
    this.props.socket!.client.registerHandler((chat: IChat) => {
      this.setState({ chatHistory: this.state.chatHistory.concat(chat) });
    });

    // Join chat room when mounted
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
    // Leave room on destroy
    if (this.state.roomName) {
      // tslint:disable-next-line:no-empty
      this.props.socket!.client.leave(this.state.roomName, (err: any, chats: IChat[]) => {});
    }
  }

  public render() {
    const { userStore, themeStore } = this.props;

    if (this.state.isLoading) {
      return (
        <Grid container style={{ alignSelf: 'center' }} alignItems="center">
          <Grid container justify="center">
            <Loading text={`Loading ${this.state.roomName} chats...`} />
          </Grid>
        </Grid>
      );
    }

    return (
      <Grid container justify="center">
        {this.state.failedToJoin ? (
          <Grid item style={{ alignSelf: 'center' }}>
            <Typography variant="h6" color="textPrimary">
              Failed to join room {this.state.roomName} :(
            </Typography>
          </Grid>
        ) : (
          <Grid container justify="center" direction="column">
            <ChatHeader chatroom={this.state.room} />
            <ChatBox user={userStore!.user!} theme={themeStore!.theme} chats={this.state.chatHistory} />
            <ChatWriter onMessageSend={(message: string) => this.onMessageSend(message)} />
          </Grid>
        )}
      </Grid>
    );
  }

  /**
   * Fetches given room info from server.
   *
   * @private
   * @memberof Chatroom
   */
  private getChatroomInfo = () => {
    this.props.socket!.client.getChatroomByName(this.state.roomName, (err: any, rooms: IChatroom[]) => {
      this.setState({ room: rooms[0] || undefined, isLoading: false });
    });
  };

  /**
   * Sends message to server.
   *
   * @private
   * @memberof Chatroom
   */
  private onMessageSend = (message: string) => {
    // tslint:disable-next-line:no-empty
    this.props.socket!.client.message(this.state.roomName, message, (err: any, chats: IChat[]) => {});
  };
}

export default Chatroom;
