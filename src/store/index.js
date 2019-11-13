import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const composeEnhansers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const customEnhancer = process.env.NODE_ENV === 'development'
  ? composeEnhansers(applyMiddleware(thunk)) : applyMiddleware(thunk);
const store = createStore(reducer, customEnhancer);

export default store;
