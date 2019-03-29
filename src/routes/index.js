import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

<<<<<<< HEAD
import HomeComponent from "../components/Home";
import LoginComponent from "../components/Login";
=======
import HomeComponent from "../views";
import LoginComponent from "../views/Login";
>>>>>>> chore(router): add router to the app [Finishes #163519094]

class Routes extends Component {
  render() {
    return (
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
  }
}
export default Routes;
