import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

// HOOKS-BASED IMPLEMENTATION - SEE CLASS BELOW FOR REFERENCE
export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);

  return (
    <div className="App">
      <h1>Current count:</h1>
      <h1 data-testid="count">{count}</h1>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
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
