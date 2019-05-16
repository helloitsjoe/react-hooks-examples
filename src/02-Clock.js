import React, { useState, useEffect } from 'react';
import './App.css';

// HOOKS-BASED IMPLEMENTATION - SEE CLASS BELOW FOR REFERENCE
function Clock() {
  const [elapsed, setElapsed] = useState(0);
  const [five, setFive] = useState(false);

  useEffect(() => {
    // This setInterval gets cleaned up and recreated every time useEffect runs
    // (console log `interval` to see the ID changing on every update)
    const interval = setInterval(() => {
      setElapsed(e => e + 1);
    }, 500);

    setFive(elapsed % 5 ? false : true);

    // The function returned from `useEffect` gets called before unmount
    // (in fact, it gets called every time useEffect is called, which you
    // can see by putting a console log in here)
    return () => {
      clearInterval(interval);
    };

    // Adding `elapsed` to deps array makes this useEffect function like
    // componentDidUpdate. With an empty array, it would be closer to
    // componentDidMount
  }, [elapsed]);

  return (
    <div className="App">
      <h2>Elapsed:</h2>
      <h1>{elapsed}</h1>
      {five && <h4>Five!</h4>}
    </div>
  );
}

// CLASS-BASED IMPLEMENTATION

// class Clock extends React.Component {
//   state = {
//     elapsed: 0,
//     five: false,
//   };

//   interval = null;

//   componentDidMount() {
//     this.interval = setInterval(() => {
//       this.setState(prevState => ({ elapsed: prevState.elapsed + 1 }));
//     }, 500);
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.elapsed === this.state.elapsed) return;
//     this.setState(prevState => {
//       if (prevState.elapsed % 5) return { five: false };
//       return { five: true };
//     });
//   }

//   componentWillUnmount() {
//     clearInterval(this.interval);
//   }

//   render() {
//     return (
//       <div className="App">
//         <h2>Elapsed:</h2>
//         <h1>{this.state.elapsed}</h1>
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
