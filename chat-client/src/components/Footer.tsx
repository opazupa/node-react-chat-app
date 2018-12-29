import { AppBar, Typography, withStyles } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import * as React from 'react';
import styled from 'styled-components';

const styles = {
  footer: {
    bottom: 0,
    height: '42px',
    lineHeight: '42px',
    textAlign: 'center' as 'center',
    top: 'auto',
    position: 'sticky' as 'sticky'
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

/**
 * Animated favorite icon.
 */
const AnimatedFavoriteIcon = styled(props => <FavoriteIcon {...props} />)`
  -webkit-transition: all 0.5s linear 0.2s !important;
  transition: all 0.5s linear 0.2s !important;
  vertical-align: sub;
  margin: 0 2px;
  color: #ffb7b7;

  &:hover {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
    margin: 0 10px;
  }
`;

/**
 * Footer component tested to be built with material "withStyles"
 */
const Footer = (props: any) => {
  const { classes } = props;

  return (
    <AppBar className={classes.footer} position="relative">
      <footer className={classes.flex}>
        <Typography variant="inherit" color="textPrimary">
          Coded with{' '}
        </Typography>
        <AnimatedFavoriteIcon />
        <Typography variant="inherit" color="textPrimary">
          {' '}
          Olli &copy;2018
        </Typography>
      </footer>
    </AppBar>
  );
};

export default withStyles(styles)(Footer);
