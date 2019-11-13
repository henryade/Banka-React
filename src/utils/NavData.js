import React from 'react';
import { NavLink } from 'react-router-dom';

export const authlinks = [
  {
    key: 'signup',
    link: <NavLink to={{ pathname: '/signup', state: { modal: true } }}>Sign Up</NavLink>
  },
  {
    key: 'signin',
    link: <NavLink to={{ pathname: '/signin', state: { modal: true } }}>Sign In</NavLink>
  }
];

export const logout = [
  {
    key: 'logout',
    link: <NavLink to={{ pathname: '/', state: { modal: true } }}>Log Out</NavLink>
  }
];
