import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const ProtectedRoute = ({ isAllowed, ...props }) => (isAllowed ? <Route {...props} /> : <Redirect to="/" />);
