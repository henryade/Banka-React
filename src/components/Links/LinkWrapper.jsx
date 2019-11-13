import React from 'react';

const LinkWapper = ({ links }) => {
  const Links = links.map(({ key, link, className }) => (
    <li className={className} key={key}>
      {link}
    </li>
  ));
  return Links;
};

export default LinkWapper;
