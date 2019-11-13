import axios from 'axios';
import * as ActionTypes from '../actionTypes';

const API_URL = 'http://localhost:3000/api/v1';
// const API_URL = 'https://bankaproject.herokuapp.com/api/v1';

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
    console.log(body);
    const response = await axios.post(`${API_URL}/auth/signup`, body);
    console.log(response);
    return dispatch(SIGNUP_SUCCESS(response.data.data));
  } catch (error) {
    console.log(error.response.data);
    dispatch(SIGNUP_FAILURE(error.response.data.error));
  }
};
