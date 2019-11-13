/* eslint-disable react/prop-types */
import React from 'react';
// import PropTypes from 'prop-types';
import LinkWapper from '../Links/LinkWrapper';

const Nav = ({ customClass, links }) => (
  <nav>
    <ul className={customClass}>
      <LinkWapper links={links} />
    </ul>
  </nav>
);

// Nav.propTypes = {
//   customClass: PropTypes.string,
//   links: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.node])).isRequired
// };

// Nav.defaultProps = {
//   customClass: ''
// };

export default Nav;
