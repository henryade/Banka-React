import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import SweetAlert from 'react-bootstrap-sweetalert';
import {
  Paper, Typography, CircularProgress, Container, Grid, TextField, Tooltip, Button
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
      backgroundColor: '#fff'
    }
  }
}));

/**
 * @description Custom Text Field
 * @param {Object} props input props
 * @memberof UserForm
 * @returns {JSX} returns HTML element
 */
const CustomTextField = (props) => {
  const classes = useStylesCustom();
  return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
};

const Form = ({
  handleBlur,
  handleChange,
  handleSubmit,
  formtype,
  data,
  handleMouseOut,
  handleFocus,
  isLoading,
  values
}) => (
  <Container>
    {isLoading && (
    <SweetAlert
      title="Now Loading"
      onConfirm={() => null}
    >
      <CircularProgress size={110} className="loader" />
    </SweetAlert>
    )}
    <Logo className="white" linkClass="mobile-only center-text auth-brand-logo" />
    <Paper className="half-width">
      <Grid container className="form-width" item sm={12} md={12}>
        <Typography variant="h4" className="blue fullheightwidth" component="h2">
          {formtype}
        </Typography>
        <form onSubmit={handleSubmit} className="fullheightwidth">
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
                  disabled={isLoading}
                />
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Tooltip title="Fill All Fields Appropriately" open={values.showTooltip}>
              <Button
                type="submit"
                variant="contained"
                className="btn-size"
                size="large"
                color="primary"
                onMouseLeave={handleMouseOut}
                onBlur={handleMouseOut}
                disabled={isLoading}
              >
                Submit
              </Button>
            </Tooltip>
          </Grid>
        </form>
      </Grid>
    </Paper>
  </Container>
);
export default Form;

Form.propTypes = {
  values: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleMouseOut: PropTypes.func.isRequired,
  formtype: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired
};
