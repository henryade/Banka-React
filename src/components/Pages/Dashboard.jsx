import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../Header/Header';

const Dashboard = () => (
  <>
    <Header />
    <div>Welcome man</div>
  </>
);

export default withRouter(Dashboard);
