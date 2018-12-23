import { ISocketClient } from '@app/stores';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { match } from 'react-router';

interface IChatroomProps {
  socket?: ISocketClient;
  match: match<{ name: string }>;
}

@inject('socket')
@observer
class Chatroom extends React.Component<IChatroomProps, {}> {
  constructor(props: IChatroomProps, context) {
    super(props, context);
    console.log(this.props.match.params.name);
    // register handler here
  }

  public componentDidMount() {
    // join chat room here
  }

  public componentWillUnmount() {
    // leave room here
  }

  public render() {
    // näytä virhe jos huonetta ei löytynyt :(

    return <div>Chatroom</div>;
  }
}

export default Chatroom;
