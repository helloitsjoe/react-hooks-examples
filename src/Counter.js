import React, { useState, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

export default class Counter extends React.Component {
  state = {
    count: 0,
    step: 1,
  };

  increment = () => this.setState(prev => ({ count: prev.count + prev.step }));
  decrement = () => this.setState(prev => ({ count: prev.count - prev.step }));
  incrementStep = () => this.setState(prev => ({ step: prev.step + 1 }));
  decrementStep = () => this.setState(prev => ({ step: prev.step - 1 }));

  render() {
    return (
      <div className="App">
        <h1>Current count:</h1>
        <h1>{this.state.count}</h1>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
        <div>
          <h2>Current step: {this.state.step}</h2>
          <button onClick={this.incrementStep}>Step +</button>
          <button onClick={this.decrementStep}>Step -</button>
        </div>
      </div>
    );
  }
}

////////////////////////////////////////

// Implementing our own hooks:

// const states = [];
// let calls = -1;

// function useState(defaultValue) {
//   const callId = ++calls;
//   const existing = states[callId];

//   if (existing) {
//     return existing;
//   }

//   function setValue(newValue) {
//     states[callId][0] = newValue;
//     render();
//   }

//   const state = [defaultValue, setValue];
//   states[callId] = state;
//   return state;
// }

// function render() {
//   calls = -1;
//   ReactDOM.render(<Counter />, document.getElementById('root'));
// }

// render();
