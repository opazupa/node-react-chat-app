import { AppBar, Button, Toolbar, Typography, withStyles } from '@material-ui/core';
import ChatroomIcon from '@material-ui/icons/BallotOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import * as React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  grow: {
    flexGrow: 1
  },
  root: {
    flexGrow: 1
  },
  navButton: {
    textDecoration: 'none',
    paddingLeft: '5px'
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
        <div className={classes.navLinks}>
          <Link to="/" className={classes.navButton}>
            <Button size="large" color="secondary">
              Home
              <HomeIcon className={classes.buttonIcon} />
            </Button>
          </Link>
          <Link to="/chatrooms" className={classes.navButton}>
            <Button size="large" color="secondary">
              Chat rooms
              <ChatroomIcon className={classes.buttonIcon} />
            </Button>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(NavBar);
