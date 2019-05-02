import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

const DeleteModal = ({
  title, dataEl, deleting, onDelete, closeModal,
}) => (
  <div className="my-article-modal active">
    <div className="my-article-modal__wrap">
      <div className="my-article-modal__title color-primary">{`"${title}"`}</div>
      <div className="my-article-modal__title">Do you want to delete?</div>
      <div className="my-article-modal__actions">
        <Button
          data-slug={dataEl}
          data-name="yes-btn"
          classes={`primary ${deleting ? 'loading' : ''}`}
          onClick={onDelete}
        >
          Yes
        </Button>
        <Button data-name="no-btn" classes="primary" onClick={closeModal}>
          No
        </Button>
      </div>
    </div>
  </div>
);

DeleteModal.propTypes = {
  title: PropTypes.string.isRequired,
  dataEl: PropTypes.string,
  deleting: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

DeleteModal.defaultProps = {
  dataEl: 'el',
};

export default DeleteModal;
