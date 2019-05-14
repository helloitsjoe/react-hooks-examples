import React, { useState } from 'react';
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

//export default function Counter() {
//  const [count, setCount] = useState(0);
//  const [step, setStep] = useState(1);
//
//  return (
//    <div className="App">
//      <h1>Current count:</h1>
//      <h1>{count}</h1>
//      <button onClick={() => setCount(c => c + step)}>+</button>
//      <button onClick={() => setCount(c => c - step)}>-</button>
//      <div>
//        <h2>Current step: {step}</h2>
//        <button onClick={() => setStep(s => s + 1)}>Step +</button>
//        <button onClick={() => setStep(s => s - 1)}>Step -</button>
//      </div>
//    </div>
//  );
//}
//
