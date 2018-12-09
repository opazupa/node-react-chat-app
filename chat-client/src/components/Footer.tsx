import { AppBar, withStyles } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import * as React from 'react';
import { HIGHLIGHT_COLOR } from 'src/common/utils/Constants';
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
  -webkit-transition: all 0.5s linear 0.2s !important;
  transition: all 0.5s linear 0.2s !important;
  vertical-align: sub;
  color: ${HIGHLIGHT_COLOR};

  &:hover {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
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
