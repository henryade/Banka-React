import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from '../Pages/Homepage';
import SignUp from '../Pages/SignUp';
import SignIn from '../Pages/SignIn';
import PasswordReset from '../Pages/PasswordReset';
import PasswordChange from '../Pages/PasswordChange';
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
      <Route path="/reset" component={PasswordReset} />
      <Route path="/changePassword" component={PasswordChange} />
      <Route path="/home" component={Dashboard} />
    </Switch>
  </BrowserRouter>
);

export default App;
