import React from 'react';
import { Route } from 'react-router-dom';

import Home from '../components/Home/Home';
import Login from '../components/Auth';
import ResetPassword from '../components/ForgotPassword/ResetPassword';
import ForgotPassword from '../components/ForgotPassword/ForgotPassword';
import ForgotPasswordMessage from '../components/ForgotPassword/ForgotPasswordMessage';

const Routes = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/users/:userId/reset/:resetCode" component={ResetPassword} />
    <Route exact path="/reset-password" component={ForgotPassword} />
    <Route exact path="/forgot-password-message" component={ForgotPasswordMessage} />
  </div>
);

export default Routes;
