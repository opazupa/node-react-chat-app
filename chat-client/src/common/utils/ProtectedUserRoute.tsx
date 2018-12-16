import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { IUserStore } from 'src/stores/UserStore';

interface IUserRouteProps extends RouteProps {
  userStore?: IUserStore;
}

@inject('userStore')
@observer
class ProtectedUserRoute extends React.Component<IUserRouteProps, {}> {
  public render() {
    const { userStore, ...rest } = this.props;

    return userStore!.registered ? <Route {...rest} /> : <Redirect to="/" />;
  }
}

export default ProtectedUserRoute;
