import { IChatroom } from '@app/common/models';
import { Divider, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBack';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface IChatHeaderProps {
  chatroom?: IChatroom;
}
const ChatHeader = styled(({ chatroom, ...props }: IChatHeaderProps) => (
  <Grid container direction="column" {...props}>
    <Paper square={true} elevation={0} style={{ paddingTop: '5px' }}>
      <Grid container justify="center" alignItems="center">
        <Grid item>
          <IconButton color="secondary" component={({ innerRef, color, ...rest }) => <Link {...rest} to="/chatrooms" />}>
            <BackIcon />
          </IconButton>
        </Grid>
        <Grid item style={{ flexGrow: 1, textAlign: 'center' }}>
          <Typography variant="h4">{chatroom && `${chatroom.name} ${chatroom.symbol}`}</Typography>
        </Grid>
      </Grid>
      <Divider />
    </Paper>
  </Grid>
))`
  position: sticky;
  margin-top: -10px;
  top: 64px;
`;

export default ChatHeader;
