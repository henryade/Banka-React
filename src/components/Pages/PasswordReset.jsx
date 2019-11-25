import React, { Component } from 'react';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import UserForm from '../Form/UserForm';
import { email } from '../../utils/AuthValidation';
import { Capitalize } from '../../utils/StringFormatter';
import { checkUserState } from '../../utils/validationHelper';
import { resetPasswordData } from '../../utils/FormData';
import { RESET_PASSWORD_REQUEST } from '../../actions/auth';
import HocConnect from '../../utils/HocConnect';

/**
 *
 *
 * @export
 * @class PasswordReset
 * @extends {Component}
 */
class PasswordReset extends Component {
  state = {
    email: '',
    emailError: '',
    showTooltip: false,
  };

  static propTypes = {
    dispatchRequest: PropTypes.func.isRequired,
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
  * @memberof PasswordReset
  * @returns {null} returns null
  */
  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      email: userEmail, emailError
    } = this.state;

    if ((emailError && emailError.length) || checkUserState(this.state).length) {
      this.setState({ showTooltip: true });
      return;
    }

    const { dispatchRequest: RequestPasswordReset } = this.props;
    await RequestPasswordReset({
      email: userEmail,
      homeLink: 'https://banka-app-in-react.herokuapp.com/',
      redirectLink: 'second',
    });
    const { data: { ResetPassword }, history: { push } } = this.props;

    const title = typeof ResetPassword.error === 'string' ? Capitalize(ResetPassword.error) : 'Error Occured';
    const alertText = ResetPassword.error || !ResetPassword.data.message
      ? { type: 'error', title }
      : { type: 'success', title: `${ResetPassword.data.message}. Link expires in an hour.` };

    await Swal.fire({
      ...alertText,
      showConfirmButton: false,
      timer: 2500
    });

    if (ResetPassword.data.message) {
      push('/signin');
    }
  }

  /**
  * @description handleChange
  * @param {string} input field input
  * @memberof PasswordReset
  * @returns {null} returns null
  */
  handleChange = input => (e) => {
    const { value } = e.target;
    this.setState({ [input]: value });
  }

  /**
  * @description handleBlur
  * @param {string} input field input
  * @memberof PasswordReset
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
  * @memberof PasswordReset
  * @returns {null} returns null
  */
  handleFocus = () => () => {
    this.setState({ emailError: '' });
  }

  /**
  * @description handleMouseOut
  * @param {string} input field input
  * @memberof PasswordReset
  * @returns {null} returns null
  */
  handleMouseOut = () => {
    this.setState({ showTooltip: false });
  }


  /**
  * @description handleChange changes
  * @param {string} input field input
  * @memberof PasswordReset
  * @returns {null} returns null
  */
  render() {
    const { data: { ResetPassword: { isLoading } } } = this.props;
    return (
      <UserForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleBlur={this.handleBlur}
        handleFocus={this.handleFocus}
        handleMouseOut={this.handleMouseOut}
        values={this.state}
        componentProps={this.props}
        data={resetPasswordData}
        formtype="Reset Password"
        isLoading={isLoading}
      />
    );
  }
}

export default HocConnect(PasswordReset, RESET_PASSWORD_REQUEST);
