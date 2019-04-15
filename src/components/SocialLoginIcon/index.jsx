import React from 'react';
import PropTypes from 'prop-types';

const SocialLoginIcon = ({
  id,
  icon,
  alt,
  href,
  dataTest,
}) => (
  <div id={id} data-test={dataTest.div}>
    <a href={href} data-test={dataTest.a}>
      <img src={icon} alt={alt} data-test={dataTest.img} />
    </a>
  </div>
);

SocialLoginIcon.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.any.isRequired,
  alt: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  dataTest: PropTypes.object.isRequired,
};

export default SocialLoginIcon;
