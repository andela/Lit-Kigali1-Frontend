/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import userAvatar from '../../assets/images/avatar.png';

export class NotificationCard extends Component {
  render() {
    const { notification, onReadNotification } = this.props;
    return (
      <li className={notification.status === 'unread' ? 'notification-unread' : ''}>
        <a onClick={() => onReadNotification(notification.id)} href={notification.link}>
          <img
            src={notification.involved.image || userAvatar}
            alt="avatar"
            className="notification__avatar"
          />
          <span>{notification.notification}</span>
          <span className="notification__time">{moment(notification.updatedAt).fromNow()}</span>
        </a>
      </li>
    );
  }
}

NotificationCard.propTypes = {
  notification: PropTypes.object.isRequired,
  onReadNotification: PropTypes.func.isRequired,
};

export default connect(null)(NotificationCard);
