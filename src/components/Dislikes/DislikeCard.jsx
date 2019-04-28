import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import defaultAvatar from '../../assets/images/avatar.png';

const DislikeCard = ({ dislike }) => (
  <div className="rating-card">
    <div className="rating-card__left">
      <div className="rating-icon-wrapper">
        <i className="fa fa-thumbs-down like-icon" />
      </div>
      <div className="rating-date">{moment(dislike.updatedAt).fromNow()}</div>
    </div>
    <div className="rating-card__right">
      <img
        className="rating-card__avatar"
        src={dislike.author.image || defaultAvatar}
        alt="avatar"
      />
      <div className="rating-card__names">
        {`${dislike.author.firstName} ${dislike.author.lastName}`}
      </div>
    </div>
  </div>
);

DislikeCard.propTypes = {
  dislike: PropTypes.object.isRequired,
};

export default DislikeCard;
