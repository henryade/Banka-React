import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper, Typography, Container, Grid, TextField, Tooltip, Button
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
  * @description handleClickx
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
      handleMouseOut
    } = this.props;
    const { CustomTextField } = this;
    return (
      <Container className="paper-container text-center" maxWidth="md">
        <Logo className="white" linkClass="mobile-only auth-brand-logo" />
        <Paper>
          <Grid container spacing={2}>
            <Grid className="desktop-only nopaddingmargin" item sm={6} md={6}>
              <div className="fullheightwidth blue-background curved-edge">
                <Logo className="white" linkClass="auth-brand-logo" />
                <div className="box-center white">
                  <Typography variant="h3" component="h2">
                    Welcome Back!
                  </Typography>
                  <p className="medium-text medium-width">To continue our awesome journey together, login with your personal details</p>
                  <Button variant="outlined" size="large" className="white-border" onClick={this.handleClick('signin')}>Sign In</Button>
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
                      Register
                    </Button>
                  </Tooltip>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

export default UserForm;
