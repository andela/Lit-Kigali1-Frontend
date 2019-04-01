import React, { Component } from 'react';
import Routes from '../_components/routes';
import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
      appName: "Author's haven",
      teamName: 'Lit Kigali',
    };
  }

  render() {
    const { appName, teamName } = this.state;
    return (
      <div>
        <h1 className="app-name">{appName}</h1>
        <h2 className="team-name">{teamName}</h2>
        <Routes />
      </div>
    );
  }
}

export default App;
