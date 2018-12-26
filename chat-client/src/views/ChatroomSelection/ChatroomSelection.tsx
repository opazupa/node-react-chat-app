import { IChatroom } from '@app/common/models';
import { Emoji } from '@app/common/utils';
import { Loading } from '@app/components';
import { ISocketClient } from '@app/stores';
import { Grid, Typography } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import ChatroomTile from './ChatroomTile';

interface IChatroomSelectionProps {
  socket?: ISocketClient;
}
interface IChatroomSelectionState {
  chatrooms: IChatroom[];
  isLoading: boolean;
}

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
          <Grid container xs={12} justify="center">
            <Loading text="Loading chatrooms..." />
          </Grid>
        </Grid>
      );
    }

    return (
      <Grid container spacing={8} direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Join a chatroom to fire up some chats <Emoji symbol="💪" />
          </Typography>
        </Grid>
        <Grid container spacing={16} justify="center">
          {this.sortedChatrooms().map((room, i) => (
            <Grid item sm="auto" xs={12} key={i}>
              <ChatroomTile chatroom={room} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  }

  private sortedChatrooms = (): IChatroom[] => {
    return this.state.chatrooms.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  };

  private getChatrooms = (): void => {
    this.props.socket!.client.getChatrooms((err: any, chatrooms: IChatroom[]) => {
      this.setState({ isLoading: false, chatrooms: chatrooms || [] });
    });
  };
}

export default ChatroomSelection;
