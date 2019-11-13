/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import UserForm from '../Form/UserForm';
import {
  name, email, password, confirmPassword
} from '../../utils/AuthValidation';
import { checkErrorState, checkUserState } from '../../utils/validationHelper';
import { Capitalize } from '../../utils/StringFormatter';
import { setAuth } from '../../utils/AuthHelper';
import { signUpData } from '../../utils/FormData';
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
    disableButton: true,
  };

  static propTypes = {
    SignUpUser: PropTypes.func.isRequired,
    data: PropTypes.objectOf(PropTypes.objectOf()).isRequired,
    history: PropTypes.objectOf(PropTypes.func).isRequired
  }

  /**
  * @description handleSubmit
  * @param {object} event field input
  * @memberof SignUp
  * @returns {null} returns null
  */
  handleSubmit = async (event) => {
    event.preventDefault();
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
      confirmPassword: userConfirmPassword
    });
    await Swal.fire({
      title: 'Now loading',
      allowEscapeKey: true,
      allowOutsideClick: false,
      timer: 2000,
      onOpen: () => {
        Swal.showLoading();
      }
    });
    const { data: { Auth }, history: { push } } = this.props;

    const alertText = Auth.error
      ? { type: 'error', title: Capitalize(Auth.error) }
      : { type: 'success', title: 'Sign Up Successful' };

    await Swal.fire({
      ...alertText,
      showConfirmButton: false,
      timer: 1500
    });
    // console.log('dfyhfuyuyg', Auth);
    if (Auth.isAuthenticated) {
      setAuth([{ token: Auth.user.token }]);
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
    const errorState = this.updateErrorState(input, e);
    this.setState((prevState) => {
      const newState = {
        ...prevState,
        [input]: value,
        ...errorState,
      };
      return {
        ...newState,
        disableButton: !(!checkErrorState(newState).length && !checkUserState(newState).length)
      };
    });
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
        values={this.state}
        data={signUpData}
        formtype="Sign Up"
      />
    );
  }
}

export default withRouter(SignUp);
