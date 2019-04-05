import React, { Component } from 'react';
import Signup from './SignUp';
import Login from './Login';

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.card = React.createRef();
    this.sign = React.createRef();
    this.flip = this.flip.bind(this);
  }
  //   flipBack() {
  //     this.card.current.style.transform = 'rotate(180)deg';
  //   }

  //   flip() {
  //     this.setState({ card: flipBack });
  //   }
  flip() {
    this.card.current.style.transform = 'rotateY(180)deg';
  }

  render() {
    return (
      <div className="main-content middle-content">
        <button onClick={this.flip}>Flip that shit</button>
        <div id="card" ref={this.card}>
          <Signup />
          <Login />
        </div>
      </div>
    );
  }
}

export default LoginComponent;
