import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ButtonContainer = ({ btnClass, text, link }) => (
  <Link to={link}><button type="submit" className={btnClass}>{text}</button></Link>
);

ButtonContainer.propTypes = {
  btnClass: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default ButtonContainer;
