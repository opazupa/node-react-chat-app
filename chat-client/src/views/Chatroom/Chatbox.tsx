import '@app/styles/slide-animations.css';

import { IChat, ITheme, IUser } from '@app/common/models';
import { Chip, Grid, Paper, Typography } from '@material-ui/core';
import * as React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

const ChatBoxContainer = styled.div`
  height: calc(100vh - 230px);
  padding: 10px 5px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
`;

interface IChatProps {
  chat: IChat;
  className: string;
  userChatColor: string;
  isUserChat: boolean;
}

const Chat = styled(({ chat, userChatColor, isUserChat, ...props }: IChatProps) => {
  return (
    <Paper {...props}>
      <Grid container direction="column">
        <Typography variant="body2" color="secondary" component="span">
          {!isUserChat ? chat.userName : ''}
        </Typography>
        <Grid container wrap="wrap">
          <Grid item>
            <Typography variant="body1" component="span">
              {chat.message}
            </Typography>
          </Grid>
          <Grid item style={{ flexGrow: 1, alignSelf: 'flex-end', paddingLeft: '4px', textAlign: 'right' }}>
            <Typography variant="caption" color="textSecondary" component="span">
              {Intl.DateTimeFormat('fi-FI', {
                hour: 'numeric',
                minute: 'numeric'
              }).format(new Date(chat.timestamp))}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
})`
  display: flex;
  align-self: start;
  flex-shrink: 0;
  max-width: calc(70vw);
  padding: 10px;
  margin-top: 7px;

  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;

  &.user-chat {
    align-self: flex-end;
    background-color: ${props => props.userChatColor};
  }
`;

interface IEventProps {
  event: IChat;
}

const Event = styled(({ event, ...props }: IEventProps) => {
  const eventMessage = `${event.userName} ${event.event}`;

  return (
    <div {...props}>
      <Chip label={eventMessage} />
    </div>
  );
})`
  display: flex;
  flex-shrink: 0;
  align-self: center;
  margin-top: 5px;
`;

interface IChatBoxProps {
  chats: IChat[];
  theme: ITheme;
  user: IUser;
}

class ChatBox extends React.Component<IChatBoxProps, {}> {
  private chatBoxContainer;
  constructor(props, context) {
    super(props, context);
  }

  public componentDidMount() {
    this.scrollChatsToBottom();
  }

  public componentDidUpdate() {
    this.scrollChatsToBottom();
  }

  public render() {
    const { chats, theme } = this.props;
    return (
      <ChatBoxContainer ref={el => (this.chatBoxContainer = el)}>
        <TransitionGroup component={null}>
          {chats.map((chat: IChat, i) => [
            chat.event ? (
              <Event key={i} event={chat} />
            ) : (
              <CSSTransition classNames="slide-in" timeout={500}>
                <Chat
                  key={i}
                  className={this.isOwnChat(chat) ? 'user-chat slide-from-right' : 'slide-from-left'}
                  userChatColor={theme.colors.secondary[500]}
                  chat={chat}
                  isUserChat={this.isOwnChat(chat)}
                />
              </CSSTransition>
            )
          ])}
        </TransitionGroup>
      </ChatBoxContainer>
    );
  }

  private isOwnChat = (chat: IChat) => {
    return chat.userName === this.props.user.userName;
  };

  private scrollChatsToBottom(): void {
    this.chatBoxContainer.scrollTo(0, this.chatBoxContainer.scrollHeight);
  }
}
export default ChatBox;
