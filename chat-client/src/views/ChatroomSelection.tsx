import { IChatroom } from '@app/common/models';
import { Emoji } from '@app/common/utils';
import { ChatroomTile, Loading } from '@app/components';
import { ISocketClient } from '@app/stores';
import { Grid, Typography } from '@material-ui/core';
import { History } from 'history';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { withRouter } from 'react-router-dom';

interface IChatroomSelectionProps {
  socket?: ISocketClient;
  history?: History;
}
interface IChatroomSelectionState {
  chatrooms: IChatroom[];
  isLoading: boolean;
}

@(withRouter as any)
@inject('socket')
@observer
class ChatroomSelection extends React.Component<IChatroomSelectionProps, IChatroomSelectionState> {
  constructor(props: IChatroomSelectionProps, context) {
    super(props, context);

    this.state = {
      isLoading: true,
      chatrooms: []
    };

    // Delay to just for showing shine loading component
    setTimeout(() => this.getChatrooms(), 1500);
  }

  public render() {
    const {} = this.props;
    if (this.state.isLoading) {
      return (
        <Grid container style={{ alignSelf: 'center' }}>
          <Grid item xs={12}>
            <Loading text="Loading chatrooms..." />
          </Grid>
        </Grid>
      );
    }

    return (
      <Grid container spacing={8} direction="column">
        <Grid item>
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Join a chatroom to fire up some chats <Emoji symbol="💪" />
          </Typography>
        </Grid>
        <Grid container spacing={8} justify="center">
          {this.createSortedChatroomTiles()}
        </Grid>
      </Grid>
    );
  }

  private createSortedChatroomTiles = () => {
    return this.state.chatrooms
      .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
      .map((room, i) => (
        <Grid item sm="auto" xs={12} key={i}>
          <ChatroomTile chatroom={room} onClick={() => this.handleTileClick(room)} />
        </Grid>
      ));
  };

  private getChatrooms = (): void => {
    this.props.socket!.client.getChatrooms((err: any, chatrooms: IChatroom[]) => {
      this.setState({ isLoading: false, chatrooms: chatrooms || [] });
    });
  };

  private handleTileClick = (room: IChatroom) => {
    this.props.history!.push(`/chatroom/${room.name}`);
  };
}

export default ChatroomSelection;
