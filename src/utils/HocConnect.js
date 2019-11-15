import { connect } from 'react-redux';


const HocConnect = (Component, dispatchName, dispatchRequest) => {
  const mapDispatchToProps = dispatch => ({
    [dispatchName]: (body) => {
      dispatch(dispatchRequest(body));
    }
  });

  const mapStateToProps = state => ({
    data: state,
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component);
};

export default HocConnect;
