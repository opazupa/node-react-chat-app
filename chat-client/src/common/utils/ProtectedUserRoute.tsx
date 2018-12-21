import { IUserStore } from '@app/stores/UserStore';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface IUserRouteProps extends RouteProps {
  userStore?: IUserStore;
}

@inject('userStore')
@observer
class ProtectedUserRoute extends React.Component<IUserRouteProps, {}> {
  public render() {
    const { userStore, ...rest } = this.props;

    return userStore!.registered ? <Route {...rest} /> : this.handleRedirect();
  }

  private handleRedirect = () => {
    console.log('U must register to chat!');
    return <Redirect to="/" />;
  };
}

export default ProtectedUserRoute;
