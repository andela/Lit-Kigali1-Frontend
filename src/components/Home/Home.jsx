import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { fetchCurrentUser } from '../../redux/actions/currentUserActions';

export class Home extends Component {
  componentWillMount() {
    const parsed = queryString.parse(this.props.location.search);
    console.log(this.props.location.search);
    const { getCurrentUser } = this.props;

    if (parsed.token) {
      localStorage.setItem('token', parsed.token);
      window.location.href = '/';
    }
    getCurrentUser();
  }

  render() {
    return (
      <div className="main-content">
        <div className="container is-column content-center">
          <h1 style={{ background: 'gray', color: 'white' }}>Home Component</h1>
          <div className="align-center color-primary">
            <Link className="title-1 color-primary" to="/profiles/olivier">
              Go to -&gt;
              <span className="color-green">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(fetchCurrentUser()),
});

Home.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(Home);
