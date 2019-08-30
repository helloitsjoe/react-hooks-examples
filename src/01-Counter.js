import React, { useState, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

// useState: Used for holding state
// 1. returns [value, setter], takes initial value
// 2. Most common hook
// 3. State object doesn't merge previous state
// 4. Complex state: React recommends useReducer

// Note:
// • No `this`
// • No hooks inside loops or conditionals

export default function Counter({ count, increment, decrement }) {
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
