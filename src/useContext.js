import React, { useContext, useState } from 'react';
import './App.css';

const ExampleContext = React.createContext();

function App() {
  const { count, setCount } = useContext(ExampleContext);

  return (
    <div className="App">
      <h1>{count}</h1>
      <button className="increment-decrement" onClick={() => setCount(c => c + 1)}>+</button>
      <button className="increment-decrement" onClick={() => setCount(c => c - 1)}>-</button>
    </div>
  )
}

export default function AppWithProvider() {
  const [count, setCount] = useState(0);

  return (
    <ExampleContext.Provider value={{ count, setCount }}>
      <App />
    </ExampleContext.Provider>
  );
}
