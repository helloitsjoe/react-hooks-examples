import React, { useState, useEffect } from 'react';
import './App.css';

// HOOKS-BASED IMPLEMENTATION - SEE CLASS BELOW FOR REFERENCE
function Clock() {
  const [count, setCount] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    // This setInterval gets cleaned up and recreated every time useEffect runs
    // (console log `interval` to see the ID changing on every update)
    const interval = setInterval(() => {
      setCount(e => e + 1);
    }, 100);

    if (paused) {
      clearInterval(interval);
    }

    // The function returned from `useEffect` gets called before unmount
    // (in fact, it gets called every time useEffect is called, which you
    // can see by putting a console log in here). To see why we need to
    // clear the interval in unmount, comment out this function.
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
      <h1>{count}</h1>
      <button onClick={() => setPaused(!paused)}>{paused ? 'Resume' : 'Pause'}</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

// CLASS-BASED IMPLEMENTATION

// class Clock extends React.Component {
//   state = {
//     count: 0,
//     five: false,
//   };

//   interval = null;

//   componentDidMount() {
//     this.interval = setInterval(() => {
//       this.setState(prevState => ({ count: prevState.count + 1 }));
//     }, 500);
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.count === this.state.count) return;
//     this.setState(prevState => {
//       if (prevState.count % 5) return { five: false };
//       return { five: true };
//     });
//   }

//   componentWillUnmount() {
//     clearInterval(this.interval);
//   }

//   render() {
//     return (
//       <div className="App">
//         <h2>Count:</h2>
//         <h1>{this.state.count}</h1>
//         {this.state.five && <h4>Five!</h4>}
//       </div>
//     );
//   }
// }

// Notice that we can use hooks and classes together
export default class App extends React.Component {
  state = {
    mounted: false
  };

  toggleMount = () => this.setState(p => ({ mounted: !p.mounted }));

  render() {
    return (
      <div className="App">
        <button onClick={this.toggleMount}>Mount/Unmount</button>
        {this.state.mounted && <Clock />}
      </div>
    );
  }
}
