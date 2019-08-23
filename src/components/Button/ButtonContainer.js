import React from 'react';
import PropTypes from 'prop-types';

const ButtonContainer = ({ btnClass, text }) => (
  <button type="submit" className={btnClass}>{text}</button>
);

ButtonContainer.propTypes = {
  btnClass: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default ButtonContainer;
