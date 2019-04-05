import React from 'react';
import { Route } from 'react-router-dom';

import Home from '../components/Home/Home';
import ResetPassword from '../components/ForgotPassword/ResetPassword';
import ForgotPassword from '../components/ForgotPassword/ForgotPassword';
import ForgotPasswordMessage from '../components/ForgotPassword/ForgotPasswordMessage';
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';
// import Auth from '../components/Auth';

const Routes = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route exact path="/" component={ForgotPassword} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={SignUp} />
    {/* <Route exact path="/auth" component={Auth} /> */}
    <Route exact path="/users/:userId/reset/:resetCode" component={ResetPassword} />
    <Route exact path="/reset-password" component={ResetPassword} />
    <Route exact path="/forgot-password-message" component={ForgotPasswordMessage} />
  </div>
);

export default Routes;
