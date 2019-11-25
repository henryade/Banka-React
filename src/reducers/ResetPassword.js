import * as ActionTypes from '../actionTypes';

const initialState = {
  isLoading: false,
  data: {},
  error: null
};

const ResetPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.data,
        error: null
      };
    case ActionTypes.RESET_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case ActionTypes.PROCESSING_PASSWORD_RESET:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default ResetPasswordReducer;
