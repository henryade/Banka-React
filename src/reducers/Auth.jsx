import * as ActionTypes from '../actionTypes';

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: {},
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.data,
        error: null
      };
    case ActionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: action.error
      };
    case ActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.data,
        error: null
      };
    case ActionTypes.SIGNIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: action.error
      };
    case ActionTypes.PROCESSING_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
