import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Homepage from '../Pages/Homepage';
import SignUp from '../Pages/SignUp';

/**
 *
 * @name App
 * @extends Component
 */

const App = () => (
  <BrowserRouter>
    <Route exact path="/" component={Homepage} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/signin" component={SignUp} />
    <Route exact path="/user" component={SignUp} />
    <Route exact path="/admin" component={SignUp} />
    <Route exact path="/staff" component={SignUp} />
  </BrowserRouter>
);


export default App;
