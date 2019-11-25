import * as ActionTypes from '../actionTypes';

const initialState = {
  isLoading: false,
  data: {},
  error: null
};

const ChangePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.data,
        error: null
      };
    case ActionTypes.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case ActionTypes.PROCESSING_PASSWORD_CHANGE:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default ChangePasswordReducer;
