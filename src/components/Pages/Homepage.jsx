import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from '@material-ui/core';
import { connect } from 'react-redux';
import HeaderContainer from '../Header/HeaderContainer';
import Footer from '../Footer/Footer';
import Body from '../Landing/Body';
import { removeError } from '../../actions';

/**
 *
 *
 * @class Homepage
 * @extends {Component}
 */
class Homepage extends Component {
  state = {
    show: false
  }

  /**
   *
   * @returns {null} returns null
   * @memberof Homepage
   */
  componentDidMount() {
    this.onMount();
  }

  onMount() {
    const { Home } = this.props;
    this.setState({ show: !!Home.error });
  }

  /**
   *
   * @description Render JSX
   * @returns {JSX} HTML element
   * @memberof Homepage
   */
  render() {
    const { Home, removeError: clearError } = this.props;
    const { show } = this.state;
    return (
      <>
        <HeaderContainer />
        { Home.error
        && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          key="topcenter"
          open={show}
          autoHideDuration={3000}
          onClose={() => { this.setState({ show: false }); clearError(); }}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{Home.error}</span>}
        />
        )
        }
        <Body />
        <Footer />
      </>
    );
  }
}

export default connect(state => state, { removeError })(Homepage);

Homepage.propTypes = {
  Home: PropTypes.objectOf(PropTypes.string).isRequired,
  removeError: PropTypes.func.isRequired,
};
