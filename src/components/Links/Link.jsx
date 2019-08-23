import React from 'react';

const Link = ({ links }) => {
  const Links = links.map(x => <li key={x.key}>{x.link}</li>);
  return Links;
};

export default Link;
