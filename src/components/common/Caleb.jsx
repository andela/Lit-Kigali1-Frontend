import React from 'react';
import PropTypes from 'prop-types';

const Caleb = (props) => {
  const { className, content, id } = props;
  return (
    <div id={id} className={className}>
      {content}
    </div>
  );
};
Caleb.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  content: PropTypes.element.isRequired,
};

Caleb.defaultProps = {
  className: 'cool',
};
export { Caleb };
