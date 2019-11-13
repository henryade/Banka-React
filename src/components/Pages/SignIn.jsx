/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */
/* eslint-disable require-jsdoc */
import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { AuthenticateUser } from '../../actions/auth';

const style = {
  border: '1px solid green',
};

class SignUp extends Component {
  state = {
    email: '',
    password: ''
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // const { auth, authenticateUser } = this.props;
    // const { email: newEmail, password: newPassword } = this.state;
    // if (newEmail === email && newPassword === password) {
    //   history.push('/home');
    // } else {
    // }
  }

  handleChange = input => (e) => {
    this.setState({
      [input]: e.target.value
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h5>Sign In</h5>
          <p>
            <label id="" htmlFor="email">
              Email
              <input style={style} type="text" name="email" id="email" onChange={this.handleChange('email')} />
            </label>

          </p>
          <p>
            <label id="" htmlFor="password">
              Password
              <input style={style} type="password" name="password" id="password" onChange={this.handleChange('password')} />
            </label>

          </p>
          <button style={style} type="submit">LogIn</button>
        </form>
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   auth: state.Auth[0]
// });

// const mapDispatchToProps = dispatch => ({
//   authenticateUser: userDetail => dispatch(AuthenticateUser(userDetail))
// });

export default SignUp;
// export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
