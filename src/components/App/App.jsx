import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Homepage from '../Pages/Homepage';
import SignUp from '../Pages/SignUp';
import SignIn from '../Pages/SignIn';

/**
 *
 * @name App
 * @extends Component
 */

const App = () => (
  <BrowserRouter>
    <Route exact path="/" component={Homepage} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/signin" component={SignIn} />
  </BrowserRouter>
);

export default App;
