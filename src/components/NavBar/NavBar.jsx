import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logoWhite from '../../assets/images/logo-white.png';
import userAvatar from '../../assets/images/avatar.png';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      hamburger: false,
    };
  }

  toggleHamburger() {
    this.setState({
      hamburger: !this.state.hamburger,
    });
  }

  renderLinks(parentClass) {
    return (
      <ul className={parentClass}>
        <li>
          <Link to="/articles/create">New article</Link>
        </li>
        <li>
          <Link to="/articles">Articles</Link>
        </li>
        <li>
          <Link to="/profile/:username/articles">My Articles</Link>
        </li>
        <li className="separator" />
        <li>
          <Link to="/settings">Settings</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <a href="#" onClick={() => console.log('signout')}>
            Sign out
          </a>
        </li>
      </ul>
    );
  }

  render() {
    return (
      <nav className="top-navbar container">
        <div className="col-3-mob">
          <Link to="/">
            <img src={logoWhite} alt="brand-logo" className="brand-logo" />
          </Link>
        </div>
        <div className="col-9-mob content-right color-white">
          <button onClick={() => this.toggleHamburger()} className="toggle-menu is-tablet">
            <div className="hamburger" />
            <div className="hamburger-nav">{this.renderLinks()}</div>
          </button>
          <button className="nav-button navbar-dropdown is-desktop color-white">
            <img src={userAvatar} className="top-navbar__avatar" alt="User logo" />
            {this.renderLinks('dropdown')}
          </button>
        </div>
      </nav>
    );
  }
}

export default NavBar;
