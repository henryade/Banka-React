import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from '../Pages/Homepage';
import SignUp from '../../containers/SignUp';
import SignIn from '../Pages/SignIn';
import Dashboard from '../Pages/Dashboard';

/**
 *
 * @name App
 * @extends Component
 * @returns {Node} Node element
 */
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <Route path="/home" component={Dashboard} />
    </Switch>
  </BrowserRouter>
);

export default App;
