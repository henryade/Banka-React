/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles, fade } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
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
    '&$focused': {
      backgroundColor: '#fff',
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  }
}));

const styles = (Top, Left, Buttom, Right) => ({
  button: {
    marginTop: Top,
    marginLeft: Left,
    marginRight: Right,
    marginBottom: Buttom,
  },
});
/**
 *
 *
 * @export
 * @class UserForm
 * @extends {Component}
 */
class UserForm extends Component {
  static propTypes = {
    values: PropTypes.objectOf(PropTypes.string, PropTypes.bool).isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    formtype: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  CustomTextField = (props) => {
    const classes = useStylesCustom();
    return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
  };

  render() {
    const {
      values, handleChange, handleSubmit, data, formtype
    } = this.props;
    const { CustomTextField } = this;
    return (
      <Container maxWidth="md">
        <Logo className="blue" linkClass="auth-link" />
        <Paper className="form-width">
          <Typography variant="h4" component="h2">
            {formtype}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              {data.map(({
                name, placeholder, required, screenPortion, type, autoComplete
              }) => (
                <Grid item xs={12} sm={screenPortion}>
                  <CustomTextField
                    id={name}
                    label={placeholder}
                    onChange={handleChange(name)}
                    type={type || 'text'}
                    autoComplete={autoComplete || ''}
                    fullWidth
                    variant="filled"
                    required={required}
                    helperText={values[`${name}Error`]}
                    defaultValue={values[name]}
                  />
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12}>
              <button type="submit" className="btn btn-lg btn-2 blue-background" style={styles(20, 0, 0, 0).button} disabled={values.disableButton}>
          Submit
              </button>
            </Grid>
          </form>
        </Paper>
      </Container>
    );
  }
}

export default UserForm;
