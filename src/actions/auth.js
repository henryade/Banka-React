import axios from 'axios';
import * as ActionTypes from '../actionTypes';
import { setItems } from '../utils/LocalStorage';
import { Capitalize } from '../utils/StringFormatter';

const { API_URL } = process.env;

export const SIGNUP_SUCCESS = data => ({
  type: ActionTypes.SIGNUP_SUCCESS,
  data
});

export const SIGNUP_FAILURE = error => ({
  type: ActionTypes.SIGNUP_FAILURE,
  error
});

export const PROCESSING_REQUEST = () => ({
  type: ActionTypes.PROCESSING_REQUEST
});

export const SIGNIN_SUCCESS = data => ({
  type: ActionTypes.SIGNIN_SUCCESS,
  data
});

export const SIGNIN_FAILURE = error => ({
  type: ActionTypes.SIGNIN_FAILURE,
  error
});

export const RESET_PASSWORD_SUCCESS = data => ({
  type: ActionTypes.RESET_PASSWORD_SUCCESS,
  data
});

export const RESET_PASSWORD_FAILURE = error => ({
  type: ActionTypes.RESET_PASSWORD_FAILURE,
  error
});

export const PROCESSING_PASSWORD_RESET = () => ({
  type: ActionTypes.PROCESSING_PASSWORD_RESET
});


export const CHANGE_PASSWORD_SUCCESS = data => ({
  type: ActionTypes.CHANGE_PASSWORD_SUCCESS,
  data
});

export const CHANGE_PASSWORD_FAILURE = error => ({
  type: ActionTypes.CHANGE_PASSWORD_FAILURE,
  error
});

export const PROCESSING_PASSWORD_CHANGE = () => ({
  type: ActionTypes.PROCESSING_PASSWORD_CHANGE
});

export const AUTH_REQUEST = body => async (dispatch) => {
  const { action, ...requestBody } = body;
  dispatch(PROCESSING_REQUEST());
  try {
    const { data: { data } } = await axios.post(`${API_URL}/auth/${action}`, requestBody);
    const {
      token, imageurl, firstName, lastName, email
    } = data;
    setItems({
      token,
      img: imageurl,
      fullname: Capitalize(`${firstName} ${lastName}`),
      email
    });
    return action === 'signup' ? dispatch(SIGNUP_SUCCESS(data)) : dispatch(SIGNIN_SUCCESS(data));
  } catch (error) {
    const message = error.response ? error.response.data.error : error.message;
    return action === 'signup' ? dispatch(SIGNUP_FAILURE(message)) : dispatch(SIGNIN_FAILURE(message));
  }
};

export const RESET_PASSWORD_REQUEST = body => async (dispatch) => {
  dispatch(PROCESSING_PASSWORD_RESET());
  try {
    const { data } = await axios.post(`${API_URL}/auth/forgotPassword`, body);
    dispatch(RESET_PASSWORD_SUCCESS(data));
  } catch (error) {
    const message = error.response ? error.response.data.error : error.message;
    return dispatch(RESET_PASSWORD_FAILURE(message));
  }
};


export const CHANGE_PASSWORD_REQUEST = body => async (dispatch) => {
  dispatch(PROCESSING_PASSWORD_CHANGE());
  try {
    const { data } = await axios.post(`${API_URL}/auth/reset`, body);
    dispatch(CHANGE_PASSWORD_SUCCESS(data));
  } catch (error) {
    const message = error.response ? error.response.data.error : error.message;
    dispatch(CHANGE_PASSWORD_FAILURE(message));
  }
};
