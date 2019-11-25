/* eslint-disable import/prefer-default-export */
import * as ActionTypes from '../actionTypes';

export const SHOW_ERROR = error => ({
  type: ActionTypes.SHOW_ERROR,
  error
});

export const CLEAR_ERROR = () => ({
  type: ActionTypes.CLEAR_ERROR
});

export const SetError = error => (dispatch) => {
  dispatch(SHOW_ERROR(error));
};

export const removeError = () => (dispatch) => {
  dispatch(CLEAR_ERROR());
};
