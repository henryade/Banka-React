import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import App from './components/App/App';
import store from './store';

const display = document.getElementById('root');
const MasterComponent = <Provider store={store}><App /></Provider>;

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./components/App/App', ReactDOM.render(MasterComponent, display));
}

ReactDOM.render(MasterComponent, display);
