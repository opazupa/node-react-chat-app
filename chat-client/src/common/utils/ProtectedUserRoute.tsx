import { INotifyStore } from '@app/stores';
import { IUserStore } from '@app/stores/UserStore';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

/**
 * IUserRouteProps
 *
 * @interface IUserRouteProps
 * @extends {RouteProps}
 */
interface IUserRouteProps extends RouteProps {
  userStore?: IUserStore;
  notifyStore?: INotifyStore;
}

/**
 * Auth guard for registered users.
 *
 * @class ProtectedUserRoute
 * @extends {React.Component<IUserRouteProps, {}>}
 */
@inject('userStore')
@inject('notifyStore')
@observer
class ProtectedUserRoute extends React.Component<IUserRouteProps, {}> {
  public componentDidMount = () => {
    const { userStore, notifyStore } = this.props;
    if (!userStore!.registered) {
      notifyStore!.showError('U must register to chat 🐑!');
    }
  };

  public render() {
    const { userStore, notifyStore, ...rest } = this.props;

    return userStore!.registered ? <Route {...rest} /> : <Redirect to="/" />;
  }
}

export default ProtectedUserRoute;
