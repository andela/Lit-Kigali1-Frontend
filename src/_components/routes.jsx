import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HomeComponent from '../components/Home/Home';
import LoginComponent from '../components/Auth/Login';
import NavBar from '../components/NavBar/NavBar';

const Routes = () => (
  <Router>
    <NavBar />
    <Route exact path="/" component={HomeComponent} />
    <Route exact path="/login" component={LoginComponent} />
  </Router>
);

export default Routes;
