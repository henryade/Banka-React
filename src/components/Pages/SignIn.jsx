import React, { Component } from 'react';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import UserForm from '../Form/UserForm';
import { email } from '../../utils/AuthValidation';
import { Capitalize } from '../../utils/StringFormatter';
import { checkUserState } from '../../utils/validationHelper';
import { signInData } from '../../utils/FormData';
import { AUTH_REQUEST } from '../../actions/auth';
import HocConnect from '../../utils/HocConnect';

/**
 *
 *
 * @export
 * @class SignIn
 * @extends {Component}
 */
class SignIn extends Component {
  state = {
    email: '',
    emailError: '',
    password: '',
    showTooltip: false
  };

  static propTypes = {
    SignInUser: PropTypes.func.isRequired,
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
  * @memberof SignIn
  * @returns {null} returns null
  */
  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      email: userEmail, password: userPassword, emailError
    } = this.state;

    if ((emailError && emailError.length) || checkUserState(this.state).length) {
      this.setState({ showTooltip: true });
      return;
    }

    const { SignInUser } = this.props;
    await SignInUser({
      email: userEmail,
      password: userPassword,
      action: 'signin'
    });
    await Swal.fire({
      title: 'Now loading',
      allowEscapeKey: false,
      allowOutsideClick: false,
      timer: 1000,
      onOpen: () => {
        Swal.showLoading();
      }
    });
    const { data: { Auth }, history: { push } } = this.props;
    const title = Auth.error !== null && Auth.error !== undefined ? Capitalize(Auth.error) : 'Error Occured';
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
  * @memberof SignIn
  * @returns {null} returns null
  */
  handleChange = input => (e) => {
    const { value } = e.target;
    this.setState({ [input]: value });
  }

  /**
  * @description handleBlur
  * @param {string} input field input
  * @memberof SignIn
  * @returns {null} returns null
  */
  handleBlur = input => (e) => {
    if (input === 'email') {
      const error = (e.target.value === '') ? { emailError: '' } : { emailError: email(e.target.value) };
      this.setState(error);
    }
  }

  /**
  * @description handleFocus
  * @param {string} input field input
  * @memberof SignIn
  * @returns {null} returns null
  */
  handleFocus = () => () => {
    this.setState({ emailError: '' });
  }

  /**
  * @description handleMouseOut
  * @param {string} input field input
  * @memberof SignIn
  * @returns {null} returns null
  */
  handleMouseOut = () => {
    this.setState({ showTooltip: false });
  }


  /**
  * @description handleChange changes
  * @param {string} input field input
  * @memberof SignIn
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
        data={signInData}
        formtype="Sign In"
      />
    );
  }
}

export default HocConnect(SignIn, 'SignInUser', AUTH_REQUEST);
