import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Settings extends Component {
  state = {
    openTab: 0,
  };

  switchTab = this.switchTab.bind(this);

  switchTab(index) {
    this.setState({ openTab: index });
  }

  render() {
    const { openTab } = this.state;

    return (
      <div className="settings-body">
        <div className="settings-container">
          <div className="left-column">
            <ul>
              <li onClick={this.switchTab.bind(this, 0)}>
                <i className="fas fa-user" />
                General
              </li>
              <li onClick={this.switchTab.bind(this, 3)}>
                <i className="fas fa-minus-circle" />
                Notifications
              </li>
            </ul>
          </div>
          <div className="settings-tab">
            {openTab === 0 && (
              <form>
                <h1>General Settings</h1>
              </form>
            )}
            {openTab === 3 && (
              <form>
                <h1>Disable Notification</h1>
                <div className="onoffswitch">
                  <input
                    type="checkbox"
                    name="onoffswitch"
                    className="onoffswitch-checkbox"
                    id="myonoffswitch"
                    // onChange={this.handleChange}
                    // checked={allowNotifications}
                  />
                  <label className="onoffswitch-label" htmlFor="myonoffswitch">
                    <span className="onoffswitch-inner" />
                    <span className="onoffswitch-switch" />
                  </label>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
