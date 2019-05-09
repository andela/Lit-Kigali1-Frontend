/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import userAvatar from '../../assets/images/avatar.png';

export class NotificationView extends Component {
  render() {
    const { notificationList } = this.props;
    console.log(notificationList);
    return (
      <section className="main-content content-margin">
        <div className="container">
          <div className="all-notification-header">
            <div className="all-notification__title">Your Notifications</div>
            <div className="all-notification__links">
              <a href="#">Mark All as Read</a>
            </div>
          </div>
          <div className="all-notification">
            <div className="all-notification__view notification-unread">
              <a href="./articles-view.html">
                <img src={userAvatar} alt="" className="all-notification__avatar" />
                <span>Grace Kimotho posted a new article</span>
              </a>
              <span className="notification__time">2 days ago</span>
            </div>
            <div className="all-notification__view">
              <a href="./articles-view.html">
                <img src={userAvatar} alt="" className="all-notification__avatar" />
                <span>Grace Kimotho posted a new article</span>
              </a>
              <span className="notification__time">2 days ago</span>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

NotificationView.propTypes = {
  notificationList: PropTypes.array,
};

NotificationView.defaultProps = {
  notificationList: [],
};

export const mapStateToProps = ({ notification: { notificationList } }) => ({ notificationList });

export default connect(null)(NotificationView);
