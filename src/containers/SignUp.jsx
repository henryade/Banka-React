import { connect } from 'react-redux';
import SignUp from '../components/Pages/SignUp';
import { SIGNUP_REQUEST } from '../actions/auth';

const mapDispatchToProps = dispatch => ({
  SignUpUser: (body) => {
    dispatch(SIGNUP_REQUEST(body));
  }
});

const mapStateToProps = state => ({
  data: state,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
