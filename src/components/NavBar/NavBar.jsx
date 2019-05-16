import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../common/Button/Button';
import logoWhite from '../../assets/images/logo-white.png';
import userAvatar from '../../assets/images/avatar.png';
import Notifications from '../Notification/Notifications';

export class NavBar extends Component {
  state = {
    showMenu: false,
  };

  showMenu = () => {
    const { showMenu } = this.state;
    this.setState(
      {
        showMenu: !showMenu,
      },
      () => {
        document.addEventListener('click', this.closeMenu);
      },
    );
  };

  closeMenu = () => {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  };

  onLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/auth';
  };

  renderLinks = (parentClass) => {
    const { username } = this.props;
    return (
      <ul className={parentClass}>
        <li>
          <Link to="/articles/create">New article</Link>
        </li>
        <li>
          <Link to="/articles">Articles</Link>
        </li>
        <li>
          <Link to="/my-articles">My Articles</Link>
        </li>
        <li>
          <Link to={`/profiles/${username}`}>My Profile</Link>
        </li>
        <li className="separator" />
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Button classes="transparent signout-btn" id="signouBtn" onClick={this.onLogout}>
            Sign out
          </Button>
        </li>
      </ul>
    );
  };

  render() {
    const { showMenu } = this.state;
    const { image, notificationsCount, isLoggedIn } = this.props;
    return (
      <nav className="top-navbar container">
        <div className="col-3-mob">
          <Link to="/">
            <img src={logoWhite} alt="brand-logo" className="brand-logo" />
          </Link>
        </div>
        <div className="col-9-mob content-right color-white">
          {isLoggedIn ? (
            <div className="toggle-menu is-tablet">
              <button className={`hamburger ${showMenu ? 'active' : ''}`} onClick={this.showMenu} />
              <div className={`hamburger-nav ${showMenu ? 'active' : ''}`}>
                {this.renderLinks()}
              </div>
            </div>
          ) : (
            ''
          )}
          {isLoggedIn ? (
            <button className="nav-button navbar-dropdown is-desktop color-white">
              <i className="fa fa-bell fa-2x" aria-hidden="true" />
              <span className={notificationsCount > 0 ? 'badge' : ''}>
                {notificationsCount > 0 ? notificationsCount : ''}
              </span>
              <Notifications />
            </button>
          ) : (
            ''
          )}
          {isLoggedIn ? (
            <div className="nav-button navbar-dropdown is-desktop color-white">
              <Button onClick={this.showMenu} classes="transparent">
                <img src={image || userAvatar} className="top-navbar__avatar" alt="User logo" />
              </Button>
              {this.renderLinks('dropdown')}
            </div>
          ) : (
            <Link to="/auth" className="color-white">
              Login
            </Link>
          )}
        </div>
      </nav>
    );
  }
}

NavBar.propTypes = {
  username: PropTypes.string,
  image: PropTypes.string,
  notificationsCount: PropTypes.number,
  isLoggedIn: PropTypes.bool,
};

NavBar.defaultProps = {
  username: undefined,
  image: undefined,
  notificationsCount: 0,
  isLoggedIn: false,
};

export const mapStateToProps = ({
  currentUser: {
    isLoggedIn,
    profile: { username, image },
    notifications: { notificationsCount },
  },
}) => ({
  isLoggedIn,
  username,
  image,
  notificationsCount,
});

export default connect(mapStateToProps)(NavBar);
