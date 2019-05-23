import React, { useState } from 'react';
import Counter from './01-Counter';
import Clock from './02-Clock';
import Vacation from './03-Vacation';
import './App.css';

function Button({ app, current, setCurrent }) {
  return (
    <button
      className="global-button"
      disabled={current.app === app}
      onClick={() => setCurrent({ app })}
    >
      {app.name}
    </button>
  )
}

export default function App() {
  const [current, setCurrent] = useState({ app: Counter });

  return (
    <div className="App">
      <Button app={Counter} setCurrent={setCurrent} current={current} /> 
      <Button app={Clock} setCurrent={setCurrent} current={current} /> 
      <Button app={Vacation} setCurrent={setCurrent} current={current} /> 
      <current.app />
    </div>
  );
}
