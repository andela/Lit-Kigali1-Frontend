import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrentUser, changeNotificationStatus } from '../../redux/actions/currentUserActions';

export class Settings extends Component {
  state = {
    openTab: 0,
  };

  componentWillMount() {
    const { getCurrentUser } = this.props;
    getCurrentUser();
  }

  switchTab = (index) => {
    this.setState({ openTab: index });
  };

  handleChange = (e) => {
    const { onStatusChange } = this.props;
    onStatusChange();
  };

  render() {
    const { openTab } = this.state;
    const { notification } = this.props;
    return (
      <div className="settings-body">
        <div className="settings-container">
          <div className="left-column">
            <ul>
              <li onClick={() => this.switchTab(0)}>
                <i className="fa fa-globe" aria-hidden="true" />
                General
              </li>
              <li onClick={() => this.switchTab(1)}>
                <i className="fa fa-bell" aria-hidden="true" />
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
            {openTab === 1 && (
              <form>
                <h1>Disable Notification</h1>
                <div className="onoffswitch">
                  <input
                    type="checkbox"
                    name="onoffswitch"
                    className="onoffswitch-checkbox"
                    id="myonoffswitch"
                    checked={notification}
                    onChange={this.handleChange}
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
export const mapDispatchToProps = dispatch => ({
  getCurrentUser: () => dispatch(fetchCurrentUser()),
  onStatusChange: () => dispatch(changeNotificationStatus()),
});

export const mapStateToProps = ({
  currentUser: {
    profile: { notification },
  },
}) => ({ notification });

Settings.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
