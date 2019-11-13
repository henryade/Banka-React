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

export const SIGNUP_REQUEST = body => async (dispatch) => {
  try {
    const { data: { data } } = await axios.post(`${API_URL}/auth/signup`, body);
    const {
      token, imageurl, firstName, lastName, email
    } = data;
    setItems({
      token,
      img: imageurl,
      fullname: Capitalize(`${firstName} ${lastName}`),
      email
    });
    return dispatch(SIGNUP_SUCCESS(data));
  } catch (error) {
    const message = error.response ? error.response.data.error : error.message;
    dispatch(SIGNUP_FAILURE(message));
  }
};
