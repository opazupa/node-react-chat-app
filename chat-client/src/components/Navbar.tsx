import { AppBar, Button, Toolbar, Typography, withStyles } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';

const styles = {
  grow: {
    flexGrow: 1
  },
  navLinks: {},
  root: {
    flexGrow: 1
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
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="outlined">Home</Button>
          </Link>
          <Link to="/chatrooms" style={{ textDecoration: 'none' }}>
            <Button variant="outlined">Chat rooms</Button>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(NavBar);
