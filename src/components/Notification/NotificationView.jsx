/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import userAvatar from '../../assets/images/avatar.png';
import { markAllAsRead, readNotification } from '../../redux/actions/currentUserActions';

export class NotificationView extends Component {
  onMarkAllAsReadClicked = (e) => {
    const { onMarkAllAsRead } = this.props;
    onMarkAllAsRead();
    e.preventDefault();
  };

  render() {
    const { notificationList, onReadNotification } = this.props;
    return (
      <section className="main-content content-margin">
        <div className="container">
          <div className="all-notification-header">
            <div className="all-notification__title">Your Notifications</div>
            <div className="all-notification__links">
              <button onClick={this.onMarkAllAsReadClicked}>Mark All as Read</button>
            </div>
          </div>
          <div className="all-notification">
            {notificationList.map(notification => (
              <div
                key={notificationList.indexOf(notification)}
                className={
                  notification.status === 'unread'
                    ? 'all-notification__view notification-unread'
                    : 'all-notification__view'
                }
              >
                <a onClick={() => onReadNotification(notification.id)} href={notification.link}>
                  <img
                    src={notification.involved.image || userAvatar}
                    alt=""
                    className="all-notification__avatar"
                  />
                  <span>{notification.notification}</span>

                  <span className="notification__time">
                    {moment(notification.createdAt).fromNow()}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

NotificationView.propTypes = {
  notificationList: PropTypes.array,
  onMarkAllAsRead: PropTypes.func.isRequired,
  onReadNotification: PropTypes.func.isRequired,
};

NotificationView.defaultProps = {
  notificationList: [],
};

export const mapStateToProps = ({
  currentUser: {
    notifications: { notificationList },
  },
}) => ({ notificationList });

export const mapDispatchToProps = dispatch => ({
  onReadNotification: id => dispatch(readNotification(id)),
  onMarkAllAsRead: () => dispatch(markAllAsRead()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationView);
