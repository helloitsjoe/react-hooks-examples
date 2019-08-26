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
      {app.displayName}
    </button>
  );
}

export default function App() {
  // const [current, setCurrent] = useState({ app: Counter });
  const [current, setCurrent] = useState({ app: Vacation });

  return (
    <AppContext.Provider value={{ current, setCurrent }}>
      <div className="App">
        <Button app={Counter} current={current} />
        <Button app={Clock} current={current} />
        <Button app={Vacation} current={current} />
        <current.app />
      </div>
    </AppContext.Provider>
  );
}
