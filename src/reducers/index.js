import { combineReducers } from 'redux';
import Auth from './Auth';
import CreateAccount from './CreateAccount';
import Home from './Home';
import ResetPassword from './ResetPassword';
import ChangePassword from './ChangePassword';

export default combineReducers({
  Auth,
  CreateAccount,
  ResetPassword,
  ChangePassword,
  Home
});
