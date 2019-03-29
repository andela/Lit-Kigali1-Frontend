import React, { Component } from "react";
import "./App.scss";
import Routes from "../routes";

class App extends Component {
  render() {
    return (
      <div>
        <h1 className="app-name">Author's Haven</h1>
        <h2 className="team-name">LIT Kigali</h2>
        <Routes />
      </div>
    );
  }
}
// const App = () => (

// );

export default App;
