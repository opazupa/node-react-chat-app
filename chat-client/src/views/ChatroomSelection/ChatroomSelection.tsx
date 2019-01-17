import { IChatroom } from '@app/common/models';
import { Emoji } from '@app/common/utils';
import { Loading } from '@app/components';
import { ISocketClient } from '@app/stores';
import { Grid, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import ChatroomTile from './ChatroomTile';

/**
 * IChatroomSelectionProps
 *
 * @interface IChatroomSelectionProps
 */
interface IChatroomSelectionProps {
  socket?: ISocketClient;
}
/**
 * IChatroomSelectionState
 *
 * @interface IChatroomSelectionState
 */
interface IChatroomSelectionState {
  chatrooms: IChatroom[];
  isLoading: boolean;
}

/**
 * Chatroom selection view
 *
 * @class ChatroomSelection
 * @extends {React.Component<IChatroomSelectionProps, IChatroomSelectionState>}
 */
@inject('socket')
@observer
class ChatroomSelection extends React.Component<IChatroomSelectionProps, IChatroomSelectionState> {
  constructor(props: IChatroomSelectionProps, context) {
    super(props, context);

    this.state = {
      isLoading: true,
      chatrooms: []
    };

    // Delay just for showing shine loading component
    setTimeout(() => this.getChatrooms(), 1500);
  }

  public render() {
    const {} = this.props;
    if (this.state.isLoading) {
      return (
        <Grid container style={{ alignSelf: 'center' }} alignItems="center">
          <Grid container justify="center">
            <Loading text="Loading chatrooms..." />
          </Grid>
        </Grid>
      );
    }

    return (
      <Grid container spacing={8} direction="column" alignItems="center">
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Join a chatroom to fire up some chats <Emoji symbol="💪" />
          </Typography>
        </Grid>
        <Grid container spacing={16} justify="center">
          {this.sortedChatrooms().map((room, i) => (
            <Grid item sm="auto" xs={12} key={i} justify="center" style={{ display: 'flex', justifyContent: 'center' }}>
              <ChatroomTile chatroom={room} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  }

  /**
   * Fetches chatrooms from the server.
   *
   * @private
   * @memberof ChatroomSelection
   */
  private getChatrooms = (): void => {
    this.props.socket!.client.getChatrooms((err: any, chatrooms: IChatroom[]) => {
      this.setState({ isLoading: false, chatrooms: chatrooms || [] });
    });
  };

  /**
   * Sort chatroom by name.
   *
   * @private
   * @memberof ChatroomSelection
   */
  private sortedChatrooms = (): IChatroom[] => {
    return this.state.chatrooms.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  };
}

export default ChatroomSelection;
