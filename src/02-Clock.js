import React, { useState, useEffect } from 'react';
import './App.css';

// useEffect: Used to control side effects
// • Async behavior, direct DOM manipulation, etc
// • Dependency array: a gate for restricting useEffect calls
// • Replaces many lifecycle methods

// 1. setInterval on mount
// 2. return clearInterval
// 3. Add pause
// 4. Compare to lifecycle methods
// 5. console.log in cleanup function
// 6. Show flow diagram

export default function Clock({ count, setCount, paused, setPaused }) {
  return (
    <div className="App">
      <h2>Count:</h2>
      <h1>{count}</h1>
      <button onClick={() => setPaused(!paused)}>{paused ? 'Resume' : 'Pause'}</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

Clock.displayName = 'Clock';
