import { IChat, IUser } from '@app/common/models';
import * as React from 'react';
import styled from 'styled-components';

const ChatBoxContainer = styled.div`
  min-height: calc(100vh - 230px);
  padding: 10px 0;
  display: flex;
  flex-direction: column;
`;

const Chat = styled.div`
  display: flex;
  &.own {
    color: green;
  }
`;

const Event = styled.div`
  display: flex;
  color: red;
`;

interface IChatboxProps {
  chats: IChat[];
  user: IUser;
}

class Chatbox extends React.Component<IChatboxProps, {}> {
  constructor(props, context) {
    super(props, context);
  }

  public render() {
    return (
      <ChatBoxContainer>
        {this.props.chats.map((chat: IChat, i) => [
          chat.event ? (
            <Event key={i}>{`${chat.userName} ${chat.event} ${new Date(chat.timestamp).toString()}`}</Event>
          ) : (
            <Chat key={i} className={this.isOwnChat(chat) ? 'own' : 'other'}>{`${chat.userName} ${chat.message} ${new Date(
              chat.timestamp
            ).toString()}`}</Chat>
          )
        ])}
      </ChatBoxContainer>
    );
  }

  private isOwnChat = (chat: IChat) => {
    return chat.userName === this.props.user.userName;
  };
}

export default Chatbox;
