import React, { useState, useContext } from 'react';
import Counter from './01-Counter';
import Clock from './02-Clock';
import Vacation from './03-Vacation';
import './App.css';

const AppContext = React.createContext();

function Button({ app }) {
  const { current, setCurrent } = useContext(AppContext);
  return (
    <button
      className="global-button"
      disabled={current.app === app}
      onClick={() => setCurrent({ app })}
    >
      {app.name}
    </button>
  );
}

export default function App() {
  const [current, setCurrent] = useState({ app: Counter });

  return (
    <AppContext.Provider value={{ current, setCurrent }}>
      <div className="App">
        <Button app={Counter} />
        <Button app={Clock} />
        <Button app={Vacation} />
        <current.app />
      </div>
    </AppContext.Provider>
  );
}
