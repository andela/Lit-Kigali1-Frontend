import React from 'react';
import PropTypes from 'prop-types';

const SocialLoginIcon = (props) => {
  const {
    id, icon, alt, onClick, dataTest,
  } = props;

  return (
    <div id={id} data-test={dataTest.div} onClick={onClick}>
      <img src={icon} alt={alt} data-test={dataTest.img} />
    </div>
  );
};

SocialLoginIcon.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
  alt: PropTypes.string.isRequired,
  dataTest: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default SocialLoginIcon;
