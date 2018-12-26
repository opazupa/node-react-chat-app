import { IChatroom } from '@app/common/models';
import { Emoji } from '@app/common/utils';
import { ButtonBase, Card, CardContent, Typography } from '@material-ui/core';
import * as React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styled from 'styled-components';

interface IChatroomTileProps {
  chatroom: IChatroom;
}

const TileContent = styled(props => <CardContent {...props} />)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: start;
  border-right: 1.5px dashed black;
`;
const TileCard = styled(props => <Card {...props} />)`
  display: flex;
  align-items: center;
  cursor: pointer;

  :hover {
    transform: scale(1.05);

    .emoji-content {
      transform: rotate(37deg);
    }
  }

  .emoji-content {
    padding: 10px;
    font-size: 35px;
    min-width: 70px;
    -webkit-transition: all 0.5s ease-in-out 0s !important;
    transition: all 0.5s ease-in-out 0s !important;
  }
`;

const TileLink = styled(({ children, ...props }: LinkProps) => <Link {...props}>{children}</Link>)`
  text-decoration: none;
`;

class ChatroomTile extends React.Component<IChatroomTileProps, {}> {
  public render() {
    const { chatroom } = this.props;

    return (
      <ButtonBase focusRipple>
        <TileLink to={`chatroom/${chatroom.name}`}>
          <TileCard>
            <TileContent>
              <Typography component="h5" variant="h5">
                {chatroom.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Members: {chatroom.members}
              </Typography>
            </TileContent>
            <div className="emoji-content">
              <Emoji symbol={chatroom.symbol} />
            </div>
          </TileCard>
        </TileLink>
      </ButtonBase>
    );
  }
}

export default ChatroomTile;
