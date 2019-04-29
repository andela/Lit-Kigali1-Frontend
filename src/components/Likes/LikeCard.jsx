import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import defaultAvatar from '../../assets/images/avatar.png';

const LikeCard = ({ like }) => (
  <div className="rating-card">
    <div className="rating-card__left">
      <div className="rating-icon-wrapper">
        <i className="fa fa-thumbs-up like-icon" />
      </div>
      <div className="rating-date">{moment(like.updatedAt).fromNow()}</div>
    </div>
    <div className="rating-card__right">
      <img className="rating-card__avatar" src={like.author.image || defaultAvatar} alt="avatar" />
      <div className="rating-card__names">{`${like.author.firstName} ${like.author.lastName}`}</div>
    </div>
  </div>
);

LikeCard.propTypes = {
  like: PropTypes.object.isRequired,
};

export default LikeCard;
