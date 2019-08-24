import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Landing from '../Landing/Landing';

const HeaderContainer = () => (
  <div className="landing">
    <header>
      <Link to="/">
        <img src="assets/banka.png" alt="banka logo" />
        <h1 className="white">Banka</h1>
      </Link>
      <Nav />
    </header>
    <Landing />
    <div className="scrolldown">
      <img src="assets/angle-double-down-solid.svg" alt="scrolldown" />
    </div>
  </div>
);

export default HeaderContainer;
