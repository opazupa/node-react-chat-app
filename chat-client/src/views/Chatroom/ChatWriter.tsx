import { IChatroom } from '@app/common/models';
import { Fab, Grid, Paper, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import * as React from 'react';

/**
 * IChatWriterProps
 *
 * @interface IChatWriterState
 */
interface IChatWriterProps {
  chatroom?: IChatroom;
  onMessageSend: (message: string) => void;
}

/**
 * IChatWriterState
 *
 * @interface IChatWriterState
 */
interface IChatWriterState {
  message: string;
}

/**
 * Component for chat input.
 *
 * @class ChatWriter
 * @extends {React.Component<IChatWriterProps, IChatWriterState>}
 */
class ChatWriter extends React.Component<IChatWriterProps, IChatWriterState> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      message: ''
    };
  }

  public render() {
    return (
      <Grid item style={{ position: 'sticky', bottom: '42px' }}>
        <Paper square elevation={0}>
          <Grid container alignItems="center" spacing={8}>
            <Grid item style={{ flexGrow: 1 }}>
              <TextField
                id="message-input"
                value={this.state.message}
                onChange={this.handleMessageChange()}
                onKeyUp={this.onEnterKey()}
                placeholder="Start firing chats..."
                margin="dense"
                fullWidth
                multiline
                rowsMax={3}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <Fab color="primary" onClick={() => this.sendMessage()}>
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }

  /**
   * Handles message input.
   *
   * @private
   * @memberof ChatWriter
   */
  private handleMessageChange = () => event => {
    this.setState({ message: event.target.value });
  };

  /**
   * Handles message send forwards.
   *
   * @private
   * @memberof ChatWriter
   */
  private sendMessage = () => {
    const message = this.state.message.trim();
    if (message) {
      this.props.onMessageSend(this.state.message);
      this.setState({ message: '' });
    }
  };

  /**
   * Sends message on enter key up event.
   *
   * @private
   * @memberof ChatWriter
   */
  private onEnterKey = () => event => {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
    event.stopPropagation();
  };
}

export default ChatWriter;
