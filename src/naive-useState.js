import React from 'react';
import ReactDOM from 'react-dom';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);
  const decrement = () => setCount(prev => prev - 1);

  return (
    <div className="App">
      <h1>Current count:</h1>
      <h1 data-testid="count">{count}</h1>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </div>
  );
}

// NAIVE `useState` HOOK IMPLEMENTATION
const statesArray = [];
let useStateCallIndex = -1;

function useState(initialValue) {
  const currentCall = useStateCallIndex++;
  const existing = statesArray[currentCall];

  if (existing) return existing;

  function setValue(newValue) {
    if (typeof newValue !== 'function') {
      statesArray[currentCall][0] = newValue;
    } else {
      const oldValue = statesArray[currentCall][0];
      statesArray[currentCall][0] = newValue(oldValue);
    }
    render();
  }

  const state = [initialValue, setValue];
  statesArray[currentCall] = state;
  return state;
}

export default function render() {
  useStateCallIndex = -1;
  ReactDOM.render(<Counter />, document.getElementById('root'));
}
