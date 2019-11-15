import React, { Component } from 'react';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import UserForm from '../Form/UserForm';
import {
  name, email, password, confirmPassword
} from '../../utils/AuthValidation';
import { checkErrorState, checkUserState } from '../../utils/validationHelper';
import { Capitalize } from '../../utils/StringFormatter';
import { signUpData } from '../../utils/FormData';
import { AUTH_REQUEST } from '../../actions/auth';
import HocConnect from '../../utils/HocConnect';

/**
 *
 *
 * @export
 * @class SignUp
 * @extends {Component}
 */
class SignUp extends Component {
  state = {
    firstName: '',
    firstNameError: '',
    lastName: '',
    lastNameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    confirmPassword: '',
    confirmPasswordError: '',
    showTooltip: false
  };

  static propTypes = {
    SignUpUser: PropTypes.func.isRequired,
    data: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.object, PropTypes.bool, PropTypes.array, PropTypes.string, PropTypes.func
      ])
    ).isRequired,
    history: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.func, PropTypes.number, PropTypes.string, PropTypes.object
      ])
    ).isRequired
  }

  /**
  * @description handleSubmit
  * @param {object} event field input
  * @memberof SignUp
  * @returns {null} returns null
  */
  handleSubmit = async (event) => {
    event.preventDefault();

    if (checkErrorState(this.state).length || checkUserState(this.state).length) {
      this.setState({ showTooltip: true });
      return;
    }

    const {
      firstName, lastName, email: userEmail,
      password: userPassword, confirmPassword: userConfirmPassword
    } = this.state;
    const { SignUpUser } = this.props;
    await SignUpUser({
      firstName,
      lastName,
      email: userEmail,
      password: userPassword,
      confirmPassword: userConfirmPassword,
      action: 'signup'
    });
    await Swal.fire({
      title: 'Now loading',
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 2000,
      onOpen: () => {
        Swal.showLoading();
      }
    });
    const { data: { Auth }, history: { push } } = this.props;
    const title = Auth.error !== null ? Capitalize(Auth.error) : 'Error Occured';
    const alertText = Auth.error || !Auth.user.id
      ? { type: 'error', title }
      : { type: 'success', title: 'Sign Up Successful' };

    await Swal.fire({
      ...alertText,
      showConfirmButton: false,
      timer: 1500
    });
    if (Auth.isAuthenticated) {
      push('/home');
    }
  }

  /**
  * @description handleChange
  * @param {string} input field input
  * @memberof SignUp
  * @returns {null} returns null
  */
  handleChange = input => (e) => {
    const { value } = e.target;
    this.setState({ [input]: value });
  }

  /**
  * @description handleBlur
  * @param {string} input field input
  * @memberof SignUp
  * @returns {null} returns null
  */
  handleBlur = input => (e) => {
    const errorState = this.updateErrorState(input, e);
    this.setState({ ...errorState });
  }

  /**
  * @description showError
  * @memberof SignUp
  * @returns {boolean} returns true or false
  */
  showError = () => checkErrorState(this.state).length || checkUserState(this.state);

  /**
  * @description handleFocus
  * @param {string} input field input
  * @memberof SignUp
  * @returns {null} returns null
  */
  handleFocus = input => () => {
    this.setState({ [`${input}Error`]: '' });
  }

  /**
  * @description handleMouseOut
  * @param {string} input field input
  * @memberof SignUp
  * @returns {null} returns null
  */
  handleMouseOut = () => {
    this.setState({ showTooltip: false });
  }


  /**
  * @description updateErrorState
  * @param {string} input field input
  * @param {object} event object
  * @memberof SignUp
  * @returns {null} returns null
  */
  updateErrorState = (input, event) => {
    const { password: pass } = this.state;
    switch (input) {
      case 'firstName':
        return (event.target.value === '') ? { firstNameError: '' } : { firstNameError: name(event.target.value) };
      case 'lastName':
        return (event.target.value === '') ? { lastNameError: '' } : { lastNameError: name(event.target.value) };
      case 'email':
        return (event.target.value === '') ? { emailError: '' } : { emailError: email(event.target.value) };
      case 'password':
        return (event.target.value === '') ? { passwordError: '' } : { passwordError: password(event.target.value) };
      case 'confirmPassword':
        return (event.target.value === '') ? { confirmPasswordError: '' } : { confirmPasswordError: confirmPassword(pass, event.target.value) };
      default:
        return '';
    }
  }


  /**
  * @description handleChange changes
  * @param {string} input field input
  * @memberof SignUp
  * @returns {null} returns null
  */
  render() {
    return (
      <UserForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleBlur={this.handleBlur}
        handleFocus={this.handleFocus}
        handleMouseOut={this.handleMouseOut}
        values={this.state}
        componentProps={this.props}
        data={signUpData}
        formtype="Sign Up"
      />
    );
  }
}

export default HocConnect(SignUp, 'SignUpUser', AUTH_REQUEST);
