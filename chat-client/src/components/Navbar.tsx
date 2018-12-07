import { AppBar, Button, Toolbar, Typography, withStyles } from '@material-ui/core';
import ChatroomIcon from '@material-ui/icons/BallotOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

// TODO const the highlight color #ffb7b7
const NavLinks = styled.div`
  height: 64px;
  display: flex;

  a.active {
    border-bottom-color: #ffb7b7;
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

const NavBar = (props: any) => {
  const { classes } = props;
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Render spinning logo here :) */}
        {props.children}
        <Typography variant="h6" className={classes.grow}>
          Olli's chat
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
};

export default withStyles(styles)(NavBar);
