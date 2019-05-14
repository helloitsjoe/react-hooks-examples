import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import App from './useState';
// import App from './useState-container';
// import App from './useReducer';
// import App from './useEffect';
// import App from './useEffectReducer';
// import App from './useContext';
// import App from './useEffectClock';
import App from './Vacation';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
