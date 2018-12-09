import { AppBar, Button, Toolbar, Typography, withStyles } from '@material-ui/core';
import ChatroomIcon from '@material-ui/icons/BallotOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { HIGHLIGHT_COLOR } from 'src/common/utils/Constants';
import { IUserStore } from 'src/stores/UserStore';
import styled from 'styled-components';

import logo from '../logo.svg';
import InfoBlock from './InfoBlock';

// TODO const the highlight color #ffb7b7
const NavLinks = styled.div`
  height: 64px;
  display: flex;

  a.active {
    border-bottom-color: ${HIGHLIGHT_COLOR};
  }
`;

const SpinningLogo = styled(props => <img {...props} />)`
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

const styles = {
  grow: {
    flexGrow: 1
  },
  root: {
    flexGrow: 1
  },
  navLink: {
    textDecoration: 'none',
    display: 'flex',
    boxSizing: 'border-box' as 'border-box',
    borderBottom: '3px solid transparent',
    transition: 'border 0.5s ease-in-out'
  },
  navLinkButton: {
    color: 'black',
    boxSizing: 'border-box' as 'border-box',
    borderBottom: '3px solid transparent',
    marginBottom: '-3px'
  },
  buttonIcon: {
    marginLeft: '5px'
  }
};

interface INavBarProps {
  classes: any;
  userStore?: IUserStore;
}

@(withRouter as any)
@inject('userStore')
@observer
class NavBar extends React.Component<INavBarProps, {}> {
  public render() {
    const { classes, userStore } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <SpinningLogo src={logo} className="App-logo" alt="logo" />
          <Typography variant="h6" className={classes.grow}>
            <InfoBlock user={userStore!.user} />
          </Typography>
          <NavLinks>
            <NavLink exact to="/" className={classes.navLink} activeClassName="active">
              <Button size="large" color="secondary" className={classes.navLinkButton}>
                Home
                <HomeIcon className={classes.buttonIcon} />
              </Button>
            </NavLink>
            <NavLink to="/chatrooms" className={classes.navLink} activeClassName="active">
              <Button size="large" color="secondary" className={classes.navLinkButton}>
                Chat rooms
                <ChatroomIcon className={classes.buttonIcon} />
              </Button>
            </NavLink>
          </NavLinks>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(NavBar);
