import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import defaultAvatar from '../../assets/images/avatar.png';

const RatingCard = ({ rate }) => (
  <div className="rating-card">
    <div className="rating-card__left">
      <div className="rating">
        <button className={rate.rating === 5 ? 'selected' : ''} />
        <button className={rate.rating === 4 ? 'selected' : ''} />
        <button title="text" className={rate.rating === 3 ? 'selected' : ''} />
        <button className={rate.rating === 2 ? 'selected' : ''} />
        <button className={rate.rating === 1 ? 'selected' : ''} />
      </div>
      <div className="rating-date">{moment(rate.updatedAt).fromNow()}</div>
    </div>
    <div className="rating-card__right">
      <img className="rating-card__avatar" src={rate.author.image || defaultAvatar} alt="avatar" />
      <div className="rating-card__names">{`${rate.author.firstName} ${rate.author.lastName}`}</div>
    </div>
  </div>
);

RatingCard.propTypes = {
  rate: PropTypes.object.isRequired,
};

export default RatingCard;
