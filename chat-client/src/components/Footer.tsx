import { AppBar, withStyles } from '@material-ui/core';
import FavoriteOutlined from '@material-ui/icons/FavoriteOutlined';
import * as React from 'react';

const styles = {
  footer: {
    bottom: 0,
    height: '60px',
    'line-height': '60px',
    'text-align': 'center',
    top: 'auto'
  }
};

const Footer = (props: any) => {
  const { classes } = props;

  return (
    <AppBar className={classes.footer} position="fixed">
      <footer>
        <span>Coded with </span>
        <FavoriteOutlined style={{ color: 'red', verticalAlign: 'sub' }} />
        <span> Olli &copy;2018</span>
      </footer>
    </AppBar>
  );
};

export default withStyles(styles)(Footer);
