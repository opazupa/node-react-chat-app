import { AppBar, Button, Hidden, IconButton, SwipeableDrawer, Toolbar, Typography } from '@material-ui/core';
import ChatroomIcon from '@material-ui/icons/BallotOutlined';
import ThemeIcon from '@material-ui/icons/ColorLensOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import logo from '../../logo.svg';
import { IThemeStore, IUserStore } from '../../stores';
import DrawerContent from './DrawerContent';
import InfoBlock from './InfoBlock';
import SpinningLogo from './SpinningLogo';
import StyledNavLink from './StyledNavLink';

const NavLinks = styled.div`
  height: 64px;
  display: flex;
  margin-left: 5px;
`;

interface INavBarProps {
  userStore?: IUserStore;
  themeStore?: IThemeStore;
}

interface INavBarState {
  showDrawer: boolean;
}

@(withRouter as any)
@inject('userStore')
@inject('themeStore')
@observer
class NavBar extends React.Component<INavBarProps, INavBarState> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showDrawer: false
    };
  }

  public render() {
    const { userStore, themeStore } = this.props;
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
              <StyledNavLink exact to="/" activeClassName="active" highlightColor={themeStore!.highlightColor}>
                <Button size="large" color="secondary">
                  Home
                  <HomeIcon className="button-icon" />
                </Button>
              </StyledNavLink>
              <StyledNavLink to="/chatrooms" activeClassName="active" highlightColor={themeStore!.highlightColor}>
                <Button size="large" color="secondary">
                  Chat rooms
                  <ChatroomIcon className="button-icon" />
                </Button>
              </StyledNavLink>
              <StyledNavLink to="/theme" activeClassName="active" highlightColor={themeStore!.highlightColor}>
                <Button color="secondary">
                  <ThemeIcon className="button-icon" />
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
            <DrawerContent user={userStore!.user} highlightColor={themeStore!.highlightColor} />
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
