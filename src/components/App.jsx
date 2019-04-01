import React, { Component } from 'react';
import './App.scss';
import Routes from '../routes';

class App extends Component {
  constructor() {
    super();

    this.state = {
      appName: '',
      teamName: ''
    };
  }

  componentDidMount() {
    this.setState({
      appName: "Author's haven",
      teamName: 'Lit Kigali'
    });
  }
  render() {
    return (
      <div>
        <h1 className="app-name">{this.state.appName}</h1>
        <h2 className="team-name">{this.state.teamName}</h2>
        <Routes />
      </div>
    );
  }
}

export default App;
