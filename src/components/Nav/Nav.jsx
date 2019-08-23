import React from 'react';
import { NavLink } from 'react-router-dom';
import Links from '../Links/Link';

const Nav = () => {
  const links = [
    { key: 'signup', link: <NavLink to="/signup">SignUp</NavLink> },
    { key: 'signin', link: <NavLink to="/signin">SignIn</NavLink> }
  ];
  return (
    <nav>
      <ul className="navlinks">
        <Links links={links} />
      </ul>
    </nav>
  );
};

export default Nav;
