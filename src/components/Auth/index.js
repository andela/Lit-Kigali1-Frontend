import React from 'react';
import PropTypes from 'prop-types';
import SignUp from './SignUp';
import Login from './Login';

class AuthComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      flip: false,
    };
  }

 flip = (e) => {
   this.setState({ flip: true });
   e.preventDefault();
 }

 flipBack = (e) => {
   this.setState({ flip: false });
   e.preventDefault();
 }

 render() {
   const { history } = this.props;
   const { flip } = this.state;
   return (
     <div className="main-content middle-content">
       <div id="card" className={flip ? 'flip' : 'flipBack'}>
         <SignUp history={history} flip={this.flip} />
         <Login history={history} flipBack={this.flipBack} />
       </div>
     </div>
   );
 }
}

AuthComponent.propTypes = {
  history: PropTypes.any.isRequired,
};

export default AuthComponent;
