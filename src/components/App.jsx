import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '../_components/routes';
import './App.scss';
import NavBar from './NavBar/NavBar';

const App = () => (
  <Router>
    <NavBar />
    <Routes />
  </Router>
);

export default App;
