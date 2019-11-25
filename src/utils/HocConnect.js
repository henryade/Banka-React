import { connect } from 'react-redux';

const HocConnect = (Component, dispatchRequest) => {
  const mapStateToProps = state => ({
    data: state,
  });

  return connect(
    mapStateToProps,
    { dispatchRequest }
  )(Component);
};

export default HocConnect;
