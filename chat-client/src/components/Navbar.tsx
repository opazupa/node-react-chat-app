import {
  AppBar,
  Button,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ChatroomIcon from '@material-ui/icons/BallotOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { HIGHLIGHT_COLOR } from 'src/common/utils/Constants';
import { IUserStore } from 'src/stores/UserStore';
import styled from 'styled-components';

import { IUser } from '../common/models';
import logo from '../logo.svg';
import InfoBlock from './InfoBlock';

interface IDrawerContentProps {
  user?: IUser;
}
const DrawerContent = (props: IDrawerContentProps) => (
  <List component="nav">
    <ListItem>
      <Typography variant="h6">
        <InfoBlock user={props.user} />
      </Typography>
    </ListItem>
    <StyledNavLink exact to="/" activeClassName="drawer-active">
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="HOME" />
      </ListItem>
    </StyledNavLink>
    <StyledNavLink to="/chatrooms" activeClassName="drawer-active">
      <ListItem button>
        <ListItemIcon>
          <ChatroomIcon />
        </ListItemIcon>
        <ListItemText primary="CHAT ROOMS" />
      </ListItem>
    </StyledNavLink>
  </List>
);

const NavLinks = styled.div`
  height: 64px;
  display: flex;
  margin-left: 5px;
`;

const StyledNavLink = styled(props => <NavLink {...props} />)`
  text-decoration: none;
  display: flex;
  box-sizing: border-box;
  border-bottom: 3px solid transparent;
  border-right: 3px solid transparent;
  transition: border 0.5s ease-in-out;

  button {
    color: black;
    box-sizing: border-box;
    border-bottom: 3px solid transparent;
    margin-bottom: -3px;
  }

  .button-icon {
    margin-left: 5px;
  }

  &.active {
    border-bottom-color: ${HIGHLIGHT_COLOR};
  }

  &.drawer-active {
    border-right-color: ${HIGHLIGHT_COLOR};
  }
`;

const SpinningLogo = styled(props => (
  <span style={{ flexGrow: 1 }}>
    <img {...props} />
  </span>
))`
  animation: logo-spin infinite 20s linear;
  height: 60px;

  @keyframes logo-spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;

interface INavBarProps {
  userStore?: IUserStore;
}

interface INavBarState {
  showDrawer: boolean;
}

@(withRouter as any)
@inject('userStore')
@observer
class NavBar extends React.Component<INavBarProps, INavBarState> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showDrawer: false
    };
  }

  public render() {
    const { userStore } = this.props as INavBarProps;
    return (
      <AppBar position="fixed">
        <Toolbar>
          <SpinningLogo src={logo} alt="logo" />
          {/* Mobile Hidden */}
          <Hidden xsDown>
            <Typography variant="h6">
              <InfoBlock user={userStore!.user} />
            </Typography>
            <NavLinks>
              <StyledNavLink exact to="/" activeClassName="active">
                <Button size="large" color="secondary">
                  Home
                  <HomeIcon className="button-icon" />
                </Button>
              </StyledNavLink>
              <StyledNavLink to="/chatrooms" activeClassName="active">
                <Button size="large" color="secondary">
                  Chat rooms
                  <ChatroomIcon className="button-icon" />
                </Button>
              </StyledNavLink>
            </NavLinks>
          </Hidden>
          {/* Mobile visible */}
          <Hidden smUp>
            <IconButton onClick={this.toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Hidden>
          <SwipeableDrawer anchor="right" open={this.state.showDrawer} onClose={this.toggleDrawer(false)} onOpen={this.toggleDrawer(true)}>
            <DrawerContent user={userStore!.user} />
          </SwipeableDrawer>
        </Toolbar>
      </AppBar>
    );
  }

  private toggleDrawer = show => () => {
    this.setState({
      showDrawer: show
    });
  };
}

export default NavBar;
