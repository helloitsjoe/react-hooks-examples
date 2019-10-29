import React, { useState, useEffect } from 'react';
import './App.css';

function Clock() {
  const [count, setCount] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    // This setInterval gets cleaned up and recreated every time useEffect runs
    // (console log `interval` to see the ID changing on every update)
    const interval = setInterval(() => {
      setCount(e => e + 1);
    }, 100);

    // The function returned from `useEffect` gets called before unmount
    // (in fact, it gets called every time useEffect is called, which you
    // can see by putting a console log in here). To see why we need to
    // clear the interval in unmount, comment out this function, start
    // the clock, and then unmount it.
    return () => {
      clearInterval(interval);
    };

    // Adding `paused` to deps array makes this useEffect act like
    // componentDidUpdate - it will update every time any values
    // in the array change. With an empty array, it would act like
    // componentDidMount, only getting called once on mount.
  }, [paused]);

  return (
    <div className="App">
      <h2>Count:</h2>
      <div className="Clock-container">
        <h1>{(count / 10).toFixed(1)}</h1>
      </div>
      <button onClick={() => setPaused(!paused)}>
        {paused ? 'Resume' : 'Pause'}
      </button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

Clock.displayName = 'Clock';

export default Clock;
