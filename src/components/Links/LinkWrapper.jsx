import React from 'react';

const LinkWapper = ({ links }) => {
  const Links = links.map(({ key, link }) => <li key={key}>{link}</li>);
  return Links;
};

export default LinkWapper;
