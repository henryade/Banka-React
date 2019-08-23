import React from 'react';
import DivContainer from '../Common/DivContainer';
import BodyData from './BodyData';

const Body = () => {
  const { bodyData } = BodyData;
  return (
    <section className="landing-second-section">
      <DivContainer images={bodyData} />
    </section>
  );
};
export default Body;
