import React, { useState, useEffect } from 'react';
import './App.css';

// 1. setInterval on mount
// 2. return clearInterval
// 3. Add pause
// 4. Compare to lifecycle methods
// 5. Show logs
// 6. Show flow diagram

// HOOKS-BASED IMPLEMENTATION - SEE CLASS BELOW FOR REFERENCE
function MountedClock() {
  let count, paused, setPaused, setCount;

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

// class MountedClock extends React.Component {
//   state = {
//     count: 0,
//     paused: false,
//   };

//   interval = null;

//   startCount = () =>
//     setInterval(() => {
//       this.setState(prevState => ({ count: prevState.count + 1 }));
//     }, 250);

//   componentDidMount() {
//     this.interval = this.startCount();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.paused === this.state.paused) return;
//     this.setState(prevState => {
//       if (this.state.paused) {
//         clearInterval(this.interval);
//       } else {
//         this.interval = this.startCount();
//       }
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
//         <button
//           onClick={() =>
//             this.setState(prev => ({
//               paused: !prev.paused,
//             }))
//           }
//         >
//           {this.state.paused ? 'Resume' : 'Pause'}
//         </button>
//         <button onClick={() => this.setState({ count: 0 })}>Reset</button>
//       </div>
//     );
//   }
// }

// Notice that we can use hooks and classes together
export default class Clock extends React.Component {
  state = {
    mounted: true,
  };

  toggleMount = () => this.setState(p => ({ mounted: !p.mounted }));

  render() {
    return (
      <div className="App">
        <button onClick={this.toggleMount}>Mount/Unmount</button>
        {this.state.mounted && <MountedClock />}
      </div>
    );
  }
}

Clock.displayName = 'Clock';
