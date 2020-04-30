import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/singIn';
import SignUp from '../pages/singUp';
import Dashboard from '../pages/dashboard';
import Route from './Routes';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
    </Switch>
  );
};

export default Routes;
