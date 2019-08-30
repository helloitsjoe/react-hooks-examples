import React from 'react';
import ReactDOM from 'react-dom';
import render from './naive-useState';

import App from './App';

const REAL_RENDER = true;

if (REAL_RENDER) {
  ReactDOM.render(<App />, document.getElementById('root'));
} else {
  render();
}
