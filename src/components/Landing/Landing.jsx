import React from 'react';
import ButtonContainer from '../Button/ButtonContainer';

const Landing = () => (
  <section className="col">
    <main className="col-5">
      <article>
        Bank with Banka Today and discovery a Fast and Easier way to perform
        banking operations from any locations on any modern device.
        <ButtonContainer btnClass="btn btn-bg btn-curve" text="GET STARTED" link="/signup" />
      </article>
    </main>
    <aside className="col-5 con-center">
      <img
        className="landing-img"
        src="assets/undraw_Savings_dwkw.svg"
        alt="display"
      />
    </aside>
  </section>
);
export default Landing;
