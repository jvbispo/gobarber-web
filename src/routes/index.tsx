import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/singIn';
import SignUp from '../pages/singUp';
import Dashboard from '../pages/dashboard';
import Route from './Routes';
import ForgotPassword from '../pages/forgotPassword';
import ResetPassword from '../pages/resetPassword';
import Profile from '../pages/profile';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />
      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
};

export default Routes;
