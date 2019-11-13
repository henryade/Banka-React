import React from 'react';
import Nav from '../Nav/Nav';
import Landing from '../Landing/Landing';
import { authlinks } from '../../utils/NavData';
import Logo from '../Common/Logo';

const HeaderContainer = () => (
  <div className="landing">
    <header className="landingHeader">
      <Logo className="white" />
      <Nav customClass="navlinks whitelink" links={authlinks} />
    </header>
    <Landing />
    <div className="scrolldown">
      <img src="assets/angle-double-down-solid.svg" alt="scrolldown" />
    </div>
  </div>
);

export default HeaderContainer;
