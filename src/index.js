import React from 'react';
import ReactDOM from 'react-dom';
import components from './components';

const { App } = components;
const display = document.getElementById('root');

ReactDOM.render(<App />, display);

module.hot.accept();
