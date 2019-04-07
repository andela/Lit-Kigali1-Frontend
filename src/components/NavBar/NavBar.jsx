import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '../common/Button/Button';
import logoWhite from '../../assets/images/logo-white.png';
import userAvatar from '../../assets/images/avatar.png';

export class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      showMenu: false,
    };
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu() {
    const { showMenu } = this.state;
    this.setState(
      {
        showMenu: !showMenu,
      },
      () => {
        document.addEventListener('click', this.closeMenu);
      },
    );
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
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
          <Button classes="transparent signout-btn">Sign out</Button>
        </li>
      </ul>
    );
  }

  render() {
    const { showMenu } = this.state;
    return (
      <nav className="top-navbar container">
        <div className="col-3-mob">
          <Link to="/">
            <img src={logoWhite} alt="brand-logo" className="brand-logo" />
          </Link>
        </div>
        <div className="col-9-mob content-right color-white">
          <div className="toggle-menu is-tablet">
            <button className={`hamburger ${showMenu ? 'active' : ''}`} onClick={this.showMenu} />
            <div className={`hamburger-nav ${showMenu ? 'active' : ''}`}>{this.renderLinks()}</div>
          </div>
          <div className="nav-button navbar-dropdown is-desktop color-white">
            <Button onClick={this.showMenu} classes="transparent">
              <img src={userAvatar} className="top-navbar__avatar" alt="User logo" />
            </Button>
            {this.renderLinks('dropdown')}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.user.loggedIn,
});

export default connect(mapStateToProps)(NavBar);
