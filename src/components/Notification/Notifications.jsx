import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NotificationCard from './NotificationCard';
import { markAllAsRead, readNotification } from '../../redux/actions/currentUserActions';

export class Notifications extends Component {
  onMarkAllAsReadClicked = (e) => {
    const { onMarkAllAsRead } = this.props;
    onMarkAllAsRead();
    e.preventDefault();
  };

  render() {
    const { notifications, onReadNotification } = this.props;
    return (
      <ul className="dropdown top-navbar__notification">
        {notifications.notificationList.length > 0 ? (
          <li className="notification-header">
            <button onClick={this.onMarkAllAsReadClicked}>Mark All as Read</button>
          </li>
        ) : (
          ''
        )}
        {notifications.notificationList.length > 0 ? (
          notifications.notificationList
            .slice(0, 10)
            .map(notification => (
              <NotificationCard
                notification={notification}
                key={notifications.notificationList.indexOf(notification)}
                onReadNotification={onReadNotification}
              />
            ))
        ) : (
          <li className="content-center">
            <span className="content-center">0 Notification</span>
          </li>
        )}
        {notifications.notificationList.length > 0 ? (
          <li className="notification-footer">
            <a href="/notifications">See All</a>
          </li>
        ) : (
          ''
        )}
      </ul>
    );
  }
}

Notifications.propTypes = {
  notifications: PropTypes.object,
  onMarkAllAsRead: PropTypes.func.isRequired,
  onReadNotification: PropTypes.func.isRequired,
};

Notifications.defaultProps = {
  notifications: {},
};

export const mapStateToProps = ({ currentUser: { notifications } }) => ({
  notifications,
});

export const mapDispatchToProps = dispatch => ({
  onReadNotification: id => dispatch(readNotification(id)),
  onMarkAllAsRead: () => dispatch(markAllAsRead()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifications);
