import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import './App.scss';
import NavBar from './NavBar/NavBar';

const App = () => (
  <Router>
    <NavBar />
    <Routes />
  </Router>
);

export default App;
