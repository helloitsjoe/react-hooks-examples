import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

// HOOKS-BASED IMPLEMENTATION - SEE CLASS BELOW FOR REFERENCE
export default function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increment = () => setCount(c => c + step);
  const decrement = () => setCount(c => c - step);
  const incrementStep = () => setStep(s => s + 1);
  const decrementStep = () => setStep(s => s - 1);

  return (
    <div className="App">
      <h1>Current count:</h1>
      <h1>{count}</h1>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <div>
        <h2>Current step: {step}</h2>
        <button onClick={decrementStep}>Step -</button>
        <button onClick={incrementStep}>Step +</button>
      </div>
    </div>
  );
}

Counter.displayName = 'Counter';

////////////////////////////////////////////
// NAIVE `useState` HOOK IMPLEMENTATION
// (comment out the `useState` import and uncomment this to see it in action)

// const statesArray = [];
// let useStateCallIndex = -1;

// function useState(initialValue) {
//   const currentCall = useStateCallIndex++;
//   const existing = statesArray[currentCall];

//   if (existing) return existing;

//   function setValue(newValue) {
//     if (typeof newValue !== 'function') {
//       statesArray[currentCall][0] = newValue;
//     } else {
//       const oldValue = statesArray[currentCall][0];
//       statesArray[currentCall][0] = newValue(oldValue);
//     }
//     render();
//   }

//   const state = [initialValue, setValue];
//   statesArray[currentCall] = state;
//   return state;
// }

// function render() {
//   useStateCallIndex = -1;
//   ReactDOM.render(<Counter />, document.getElementById('root'));
// }

// render();

////////////////////////////////////////////
// CLASS-BASED IMPLEMENTATION

// export default class Counter extends React.Component {
//   static displayName = 'Counter';

//   state = {
//     count: 0,
//     step: 1
//   };

//   increment = () => this.setState(prev => ({ count: prev.count + prev.step }));
//   decrement = () => this.setState(prev => ({ count: prev.count - prev.step }));
//   incrementStep = () => this.setState(prev => ({ step: prev.step + 1 }));
//   decrementStep = () => this.setState(prev => ({ step: prev.step - 1 }));

//   render() {
//     return (
//       <div className="App">
//         <h1>Current count:</h1>
//         <h1>{this.state.count}</h1>
//         <button onClick={this.increment}>+</button>
//         <button onClick={this.decrement}>-</button>
//         <div>
//           <h2>Current step: {this.state.step}</h2>
//           <button onClick={this.incrementStep}>Step +</button>
//           <button onClick={this.decrementStep}>Step -</button>
//         </div>
//       </div>
//     );
//   }
// }
