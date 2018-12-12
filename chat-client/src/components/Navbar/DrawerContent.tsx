import { Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import ChatroomIcon from '@material-ui/icons/BallotOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import * as React from 'react';

import { IUser } from '../../common/models';
import InfoBlock from './InfoBlock';
import StyledNavLink from './StyledNavLink';

interface IDrawerContentProps {
  user?: IUser;
  highlightColor: string;
}
const DrawerContent = (props: IDrawerContentProps) => (
  <List component="nav">
    <ListItem>
      <Typography variant="h6">
        <InfoBlock user={props.user} />
      </Typography>
    </ListItem>
    <Divider />
    <StyledNavLink exact to="/" activeClassName="drawer-active" highlightColor={props.highlightColor}>
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="HOME" />
      </ListItem>
    </StyledNavLink>
    <StyledNavLink to="/chatrooms" activeClassName="drawer-active" highlightColor={props.highlightColor}>
      <ListItem button>
        <ListItemIcon>
          <ChatroomIcon />
        </ListItemIcon>
        <ListItemText primary="CHAT ROOMS" />
      </ListItem>
    </StyledNavLink>
  </List>
);

export default DrawerContent;
