import React, { useState, useReducer } from 'react';

const LOW_END = -100;
const HIGH_END = 100;

const isValid = (count) => count < HIGH_END && count > LOW_END;
const capLow = (count) => count < LOW_END ? LOW_END : count;
const capHigh = (count) => count > HIGH_END ? HIGH_END : count;
const validateStep = (step) => step < 1 ? 1 : step;

function useCount(startCount = 0, startStep = 1) {
  const [state, dispatch] = useReducer((state, action) => {
    const { count, step } = state;
    switch (action.type) {
      case 'ADD': return {
        ...state,
        error: !isValid(count + step) ? `Count must be ${HIGH_END} or less!` : '',
        count: capHigh(count + step)
      }
      case 'SUBTRACT': return {
        ...state,
        error: !isValid(count - step) ? `Count must be ${LOW_END} or more!` : '',
        count: capLow(count - step)
      }
      case 'CHANGE_STEP': return {
        ...state,
        step: validateStep(action.value)
      }
      default: return state;
    }
  }, {
    count: startCount,
    step: startStep,
    error: ''
  })

  const add = () => dispatch({ type: 'ADD' });
  const subtract = () => dispatch({ type: 'SUBTRACT' });
  const handleChangeStep = e => dispatch({ type: 'CHANGE_STEP', value: parseInt(e.target.value) });

  return { add, subtract, handleChangeStep, ...state };
}

export default function App() {
  const { count, add, subtract, step, handleChangeStep, error } = useCount();

  return (
    <div className="App">
      <h1>Current Count: {count}</h1>
      <button className="App-counter-button" onClick={subtract}>-</button>
      <button className="App-counter-button" onClick={add}>+</button>
      <div>
        Step: <input type="number" value={step} onChange={handleChangeStep} />
      </div>
    {error && <span style={{color: 'red'}}>Error: {error}</span>}
    </div>
  );
}
