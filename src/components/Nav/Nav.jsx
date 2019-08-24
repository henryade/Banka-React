import React from 'react';
import { NavLink } from 'react-router-dom';
import LinkWapper from '../Links/LinkWrapper';

const links = [
  { key: 'signup', link: <NavLink to="/signup">SignUp</NavLink> },
  { key: 'signin', link: <NavLink to="/signin">SignIn</NavLink> }
];
const Nav = () => (
  <nav>
    <ul className="navlinks">
      <LinkWapper links={links} />
    </ul>
  </nav>
);

export default Nav;
