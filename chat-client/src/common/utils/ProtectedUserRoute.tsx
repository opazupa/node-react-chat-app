import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { IUserStore } from 'src/stores/UserStore';

import { IUser } from '../models';

interface IUserRouteProps extends RouteProps {
  userStore?: IUserStore;
}

@inject('userStore')
@observer
class ProtectedUserRoute extends React.Component<IUserRouteProps, {}> {
  public render() {
    const { userStore, ...rest } = this.props;

    return this.isUserRegistered(userStore!.user) ? <Route {...rest} /> : <Redirect to="/" />;
  }

  private isUserRegistered(user?: IUser): boolean {
    return user && user.userName ? true : false;
  }
}

export default ProtectedUserRoute;
