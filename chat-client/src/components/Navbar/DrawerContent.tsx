import { IUserStore } from '@app/stores';
import { Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import ChatroomIcon from '@material-ui/icons/BallotOutlined';
import ThemeIcon from '@material-ui/icons/ColorLensOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import * as React from 'react';

import InfoBlock from './InfoBlock';
import StyledNavLink from './StyledNavLink';

/**
 * IDrawerContentProps
 *
 * @interface IDrawerContentProps
 */
interface IDrawerContentProps {
  userStore?: IUserStore;
  highlightColor: string;
}

/**
 * Component for sidenav drawer
 */
const DrawerContent = (props: IDrawerContentProps) => (
  <List component="nav">
    <ListItem>
      <Typography variant="h6">
        <InfoBlock user={props.userStore!.user} />
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
    <StyledNavLink to="/theme" activeClassName="drawer-active" highlightColor={props.highlightColor}>
      <ListItem button>
        <ListItemIcon>
          <ThemeIcon className="button-icon" />
        </ListItemIcon>
        <ListItemText primary="THEME" />
      </ListItem>
    </StyledNavLink>
  </List>
);

export default DrawerContent;
