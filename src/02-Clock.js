import React, { useState, useEffect } from 'react';
import './App.css';

// useEffect: Used to control side effects
// • Async behavior, direct DOM manipulation, etc
// • Dependency array: a gate for restricting useEffect calls
// • Replaces many lifecycle methods

// 1. setInterval in render
// 2. Move inside useEffect
// 3. Add dependency array
// 4. return clearInterval
// 5. Add pause
// 6. Compare to lifecycle methods
// 7. console.log in cleanup function
// 8. Show flow diagram

export default function Clock({ count, paused, setPaused, setCount }) {
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
