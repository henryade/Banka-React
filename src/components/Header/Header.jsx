import React from 'react';
import Nav from '../Nav/Nav';
import { logout } from '../../utils/NavData';
import Logo from '../Common/Logo';

const Header = () => (
  <div>
    <header className="otherHeader">
      <Logo className="white" />
      <Nav customClass="navlinks bluelink" links={logout} />
    </header>
  </div>
);

export default Header;
