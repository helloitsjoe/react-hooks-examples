import React, { useState } from 'react';
import './App.css';

function useCount(startCount = 0, startStep = 1) {
  const [count, setCount] = useState(startCount);
  const [step, setStep] = useState(startStep);
  const [error, setError] = useState('');
 
  const validateCount = (count) => {
    if (count < -100) {
      setError('Count must be greater than -100!'); 
      return -100;
    }
    if (count > 100) {
      setError('Count must be less than 100!'); 
      return 100;
    }
    if (error) setError('');
    return count;
  }
  const validateStep = (step) => step < 1 ? 1 : step;

  const add = () => setCount(count => validateCount(count + step));
  const subtract = () => setCount(count => validateCount(count - step));
  const handleChangeStep = e => setStep(validateStep(parseInt(e.target.value)));

  return { count, add, subtract, step, handleChangeStep, error };
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
