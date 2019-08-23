import React from 'react';
import Nav from '../Nav/Nav';
import Landing from '../Landing/Landing';

const HeaderContainer = () => (
  <div className="landing">
    <header>
      <a href="index.html">
        <img src="assets/banka.png" alt="banka logo" />
        <h1 className="white">Banka</h1>
      </a>
      <Nav />
    </header>
    <Landing />
    <div className="scrolldown">
      <img src="assets/angle-double-down-solid.svg" alt="scrolldown" />
    </div>
  </div>
);

export default HeaderContainer;
