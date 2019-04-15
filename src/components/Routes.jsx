import React from 'react';
import { Route } from 'react-router-dom';

import Home from './Home/Home';
import Login from './Auth';
import ResetPassword from './ForgotPassword/ResetPassword';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import ForgotPasswordMessage from './ForgotPassword/ForgotPasswordMessage';

const Routes = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/forgot-password" component={ForgotPassword} />
    <Route exact path="/forgot-password-message" component={ForgotPasswordMessage} />
    <Route exact path="/users/:userId/reset/:resetCode" component={ResetPassword} />
  </div>
);

export default Routes;
