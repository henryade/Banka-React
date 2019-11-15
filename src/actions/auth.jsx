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
