import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import Routes from './Routes';
import './App.scss';
import NavBar from './NavBar/NavBar';
import { fetchCurrentUser } from '../redux/actions/currentUserActions';

export class App extends Component {
  componentWillMount() {
    const { getCurrentUser } = this.props;
    getCurrentUser();
  }

  render() {
    return (
      <Router>
        <NavBar />
        <Routes />
      </Router>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(fetchCurrentUser()),
});

App.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(App);
