import React from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../Header/Header';

const Dashboard = props => (
  <>
    <Header />
    <div>Welcome man</div>
    <div>{console.log(props)}</div>
  </>
);

export default withRouter(Dashboard);
