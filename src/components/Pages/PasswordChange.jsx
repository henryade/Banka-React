/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import decode from 'jwt-decode';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import Form from '../Form/Form';
import { Capitalize } from '../../utils/StringFormatter';
import { changePasswordData } from '../../utils/FormData';
import { password, confirmPassword } from '../../utils/AuthValidation';
import { checkErrorState, checkUserState } from '../../utils/validationHelper';
import { CHANGE_PASSWORD_REQUEST } from '../../actions/auth';
import { SetError } from '../../actions';
import Logo from '../Common/Logo';

/**
 *
 *
 * @class PasswordChange
 * @extends {Component}
 */
class PasswordChange extends Component {
  state = {
    password: '',
    passwordError: '',
    confirmPassword: '',
    confirmPasswordError: '',
    showTooltip: false
  }

  static propTypes = {
    CHANGE_PASSWORD_REQUEST: PropTypes.func.isRequired,
    SetError: PropTypes.func.isRequired,
    data: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.object, PropTypes.bool, PropTypes.array, PropTypes.string, PropTypes.func
      ])
    ).isRequired,
    history: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.func, PropTypes.number, PropTypes.string, PropTypes.object
      ])
    ).isRequired,
    location: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.func, PropTypes.number, PropTypes.string, PropTypes.object
      ])
    ).isRequired
  }

  async componentDidMount() {
    const { history: { push }, location: { search } } = this.props;
    const { SetError: setError } = this.props;
    try {
      if (search !== '') {
        const decoded = decode(search.slice(1));
        const expiryDate = new Date(decoded.exp * 1000);
        const todaysDate = new Date(Date.now());
        if (decoded.id) {
          if (todaysDate < expiryDate) {
            this.details = decoded;
            return null;
          }
          await setError('Link Expired');
        }
      }
      push('/');
    } catch (error) {
      await setError('Link Error. Reset Password Again To Get New Link.');
      push('/');
    }
  }

  /**
  * @description handleSubmit
  * @param {Event} e field input
  * @memberof PasswordChange
  * @returns {null} returns null
  */
  handleSubmit = async (e) => {
    e.preventDefault();

    if (checkErrorState(this.state).length || checkUserState(this.state).length) {
      this.setState({ showTooltip: true });
      return;
    }

    const {
      password: userPassword, confirmPassword: userConfirmPassword
    } = this.state;
    const { CHANGE_PASSWORD_REQUEST: ChangePassword } = this.props;
    const { id, email } = this.details;

    await ChangePassword({
      id,
      email,
      password: userPassword,
      confirmPassword: userConfirmPassword,
    });
    const { data: { ChangePassword: { data, error } }, history: { push } } = this.props;
    const dataLength = Object.keys(data).length;
    const title = error !== null && error !== undefined ? Capitalize(error) : 'Error Occured';
    const alertText = error || !dataLength
      ? { type: 'error', title }
      : { type: 'success', title: 'Password Changed Successfully' };

    await Swal.fire({
      ...alertText,
      showConfirmButton: false,
      timer: 1500
    });
    if (dataLength) {
      push('/signin');
    }
  }

  /**
  * @description handleChange
  * @param {string} input field input
  * @memberof PasswordChange
  * @returns {null} returns null
  */
  handleChange = input => (e) => {
    const { value } = e.target;
    this.setState({ [input]: value });
  }

  /**
  * @description handleBlur
  * @param {string} input field input
  * @memberof PasswordChange
  * @returns {null} returns null
  */
  handleBlur = input => (e) => {
    const { password: pass } = this.state;
    let error;
    if (input === 'password') { error = (e.target.value === '') ? { passwordError: '' } : { passwordError: password(e.target.value) }; }
    if (input === 'confirmPassword') { error = (e.target.value === '') ? { confirmPasswordError: '' } : { confirmPasswordError: confirmPassword(pass, e.target.value) }; }
    this.setState(error);
  }

  /**
  * @description handleFocus
  * @param {string} input field input
  * @memberof PasswordChange
  * @returns {null} returns null
  */
  handleFocus = input => () => {
    this.setState({ [`${input}Error`]: '' });
  }

  /**
  * @description handleMouseOut
  * @param {string} input field input
  * @memberof PasswordChange
  * @returns {null} returns null
  */
  handleMouseOut = () => {
    this.setState({ showTooltip: false });
  }


  /**
  * @description Render JSX
  * @memberof PasswordChange
  * @returns {null} returns null
  */
  render() {
    const { data: { ChangePassword: { isLoading } } } = this.props;
    return (
      <>
        <Logo className="blue" linkClass="desktop-only auth-brand-logo center-text" />
        <Form
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleBlur={this.handleBlur}
          handleFocus={this.handleFocus}
          handleMouseOut={this.handleMouseOut}
          values={this.state}
          isLoading={isLoading}
          data={changePasswordData}
          formtype="Change Password"
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  data: state,
});

export default connect(
  mapStateToProps,
  { CHANGE_PASSWORD_REQUEST, SetError }
)(PasswordChange);
