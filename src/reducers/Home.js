import * as ActionTypes from '../actionTypes';

const initialState = {
  error: null
};

const Home = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_ERROR:
      return {
        ...state,
        error: action.error
      };
    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export default Home;
