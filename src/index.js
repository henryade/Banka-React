import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';

const display = document.getElementById('root');

ReactDOM.render(<App />, display);

module.hot.accept();
