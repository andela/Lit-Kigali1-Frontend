import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import HomeComponent from '../components/Home';
import LoginComponent from '../components/Auth/Login';

const Routes = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
      <Route exact path="/" component={HomeComponent} />
      <Route exact path="/login" component={LoginComponent} />
    </div>
  </Router>
);

export default Routes;
