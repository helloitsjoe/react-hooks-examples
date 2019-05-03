import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppWithState from './useState';
import AppWithContainer from './useState-container';
import AppWithReducer from './useReducer';
import AppWithEffect from './useEffect';
import AppWithEffectReducer from './useEffectReducer';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<AppWithEffectReducer />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
