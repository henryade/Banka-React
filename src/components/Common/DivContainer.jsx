import React from 'react';
import PropTypes from 'prop-types';

const DivContainer = ({ images }) => {
  const divs = images.map((x, i) => {
    const alt = x.link.slice(6, x.length - 4);
    const key = `${alt}${i}`;
    return (
      <div key={key} className="circle">
        <img src={x.link} alt={alt} />
        <p>{x.text}</p>
      </div>
    );
  });
  return <div>{divs}</div>;
};

DivContainer.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default DivContainer;
