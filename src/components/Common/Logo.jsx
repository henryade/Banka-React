import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Logo = ({ className, linkClass }) => {
  const custClass = `${className} title`;
  return (
    <div className={linkClass}>
      <Link to="/">
        <img className="logo" src="assets/banka.png" alt="banka logo" />
        <h1 className={custClass}>Banka</h1>
      </Link>
    </div>
  );
};

Logo.propTypes = {
  className: PropTypes.string.isRequired,
  linkClass: PropTypes.string,
};

Logo.defaultProps = {
  linkClass: ''
};

export default Logo;
