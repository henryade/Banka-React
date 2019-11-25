import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper, Typography, Container, Grid, CircularProgress, TextField, Tooltip, Button
} from '@material-ui/core';
import Logo from '../Common/Logo';

const useStylesCustom = makeStyles(theme => ({
  root: {
    border: '1px solid #1d5ab2',
    overflow: 'hidden',
    margin: '5px 0',
    borderRadius: 4,
    backgroundColor: '#fcfcfb',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover': {
      backgroundColor: '#fff',
    },
  }
}));

/**
 *
 *
 * @export
 * @class UserForm
 * @extends {Component}
 */
class UserForm extends Component {
  static propTypes = {
    values: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleFocus: PropTypes.func.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleMouseOut: PropTypes.func.isRequired,
    formtype: PropTypes.string.isRequired,
    componentProps: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.func, PropTypes.number, PropTypes.string, PropTypes.object
      ])
    ).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    isLoading: PropTypes.bool.isRequired
  }

  /**
  * @description Custom Text Field
  * @param {Object} props input props
  * @memberof UserForm
  * @returns {JSX} returns HTML element
  */
  CustomTextField = (props) => {
    const classes = useStylesCustom();
    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
  };

  /**
  * @description handle Click
  * @param {string} input field input
  * @memberof SignUp
  * @returns {null} returns null
  */
  handleClick = input => () => {
    const { componentProps: { history: { push } } } = this.props;
    push(input);
  }

  render() {
    const {
      values, handleChange, handleSubmit,
      data, formtype, handleFocus, handleBlur,
      handleMouseOut, isLoading
    } = this.props;
    const { CustomTextField } = this;
    const action = {
      'Sign In': 'Login',
      'Sign Up': 'Register',
      'Reset Password': 'Reset'
    };
    return (
      <Container className={`paper-container${(formtype === 'Sign Up') ? '' : '-signin'} text-center`} maxWidth="md">
        {isLoading && (
        <SweetAlert
          title="Now Loading"
          onConfirm={() => null}
        >
          <CircularProgress size={110} className="loader" />
        </SweetAlert>
        )}
        <Logo className="white" linkClass="mobile-only auth-brand-logo" />
        <Paper>
          <Grid direction={(formtype === 'Sign In') ? 'row-reverse' : 'row'} container spacing={2}>
            <Grid className="desktop-only nopaddingmargin" item sm={6} md={6}>
              <div className="fullheightwidth blue-background curved-edge">
                <Logo className="white" linkClass="desktop-only auth-brand-logo" />
                <div className="box-center white">
                  <Typography variant="h3" component="h2">
                    { (formtype === 'Sign In') ? 'Hello Friend!' : 'Welcome Back!'}
                  </Typography>
                  <p className="medium-text medium-width">
                    { (formtype === 'Sign In') ? 'Enter your personal details and start banking with us' : 'To continue our awesome journey together, login with your personal details' }
                  </p>
                  <Button variant="outlined" size="large" className="white-border" onClick={this.handleClick((formtype === 'Sign In') ? 'signup' : 'signin')}>{(formtype === 'Sign In') ? 'Sign Up' : 'Sign In'}</Button>
                </div>
              </div>
            </Grid>
            <Grid className="form-width" item sm={6} md={6}>
              <Typography variant="h4" className="blue" component="h2">
                {formtype}
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                  {data.map(({
                    name, placeholder, required, screenPortion, type, autoComplete
                  }) => (
                    <Grid item xs={12} sm={screenPortion} key={name}>
                      <CustomTextField
                        id={name}
                        label={placeholder}
                        onChange={handleChange(name)}
                        type={type || 'text'}
                        autoComplete={autoComplete || ''}
                        fullWidth
                        onBlur={handleBlur(name)}
                        onFocus={handleFocus(name)}
                        variant="filled"
                        required={required}
                        helperText={values[`${name}Error`]}
                        defaultValue={values[name]}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Grid item xs={12}>
                  <Tooltip title="Fill All Fields Appropriately" open={values.showTooltip}>
                    <Button type="submit" variant="contained" className="btn-size" size="large" color="primary" onMouseLeave={handleMouseOut} onBlur={handleMouseOut}>
                      { action[formtype] }
                    </Button>
                  </Tooltip>
                </Grid>
                { (formtype === 'Sign In')
                  ? (
                    <div className="mobile-links">
                      <span className="mobile-span block">
                        Forgot Password?
                        {'   '}
                        <Link to="/reset">Reset Password</Link>
                      </span>
                      <span className="mobile-only mobile-span">
                        New User?
                        {'   '}
                        <Link to="/signup">Register</Link>
                      </span>
                    </div>
                  )
                  : (
                    <div className="mobile-links">
                      <span className="mobile-only mobile-span">
                        {(formtype === 'Reset Password') ? 'Remember Password?' : 'Already Registered?' }
                        {'   '}
                        <Link to="/signin">Log In</Link>
                      </span>
                    </div>
                  )
                  }
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

export default UserForm;
