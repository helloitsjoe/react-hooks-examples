import React, { useState } from 'react';
import './App.css';

export default function AppWithState() {
  const [count, setCount] = useState(0);

  const add = () => setCount(count => count + 1);
  const subtract = () => setCount(count => count - 1);

  return (
    <div className="App">
      <h1>Current count: {count}</h1>
      <button onClick={subtract}>-</button>
      <button onClick={add}>+</button>
    </div>
  );
}
