import { AppBar, withStyles } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import * as React from 'react';

const styles = {
  footer: {
    bottom: 0,
    height: '60px',
    lineHeight: '60px',
    textAlign: 'center' as 'center',
    top: 'auto'
  },
  icon: {
    color: 'red',
    verticalAlign: 'sub'
  }
};

const Footer = (props: any) => {
  const { classes } = props;

  return (
    <AppBar className={classes.footer} position="fixed">
      <footer>
        <span>Coded with </span>
        <FavoriteIcon className={classes.icon} />
        <span> Olli &copy;2018</span>
      </footer>
    </AppBar>
  );
};

export default withStyles(styles)(Footer);
