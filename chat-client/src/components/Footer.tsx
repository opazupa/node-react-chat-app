import { AppBar, withStyles } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import * as React from 'react';
import styled from 'styled-components';

const styles = {
  footer: {
    bottom: 0,
    height: '60px',
    lineHeight: '60px',
    textAlign: 'center' as 'center',
    top: 'auto'
  }
};

const AnimatedFavoriteIcon = styled(props => <FavoriteIcon {...props} />)`
  transition: 1s linear !important;
  vertical-align: sub;
  color: #ffb7b7;

  &:hover {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

const Footer = (props: any) => {
  const { classes } = props;

  return (
    <AppBar className={classes.footer} position="fixed">
      <footer>
        <span>Coded with </span>
        <AnimatedFavoriteIcon />
        <span> Olli &copy;2018</span>
      </footer>
    </AppBar>
  );
};

export default withStyles(styles)(Footer);
