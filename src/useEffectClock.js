import React, { useState, useEffect } from 'react';
import './App.css';

// export default class App extends React.Component {
// 
//   state = {
//     mounted: false
//   }
// 
//   toggleMount = () => this.setState(p => ({ mounted: !p.mounted }))
// 
//   render() {
//     return (
//       <div className="App">
//         <button onClick={this.toggleMount}>Mount/Unmount</button>
//       {this.state.mounted && <Clock />}
//       </div>
//     );
//   }
// }
// 
// class Clock extends React.Component {
// 
//   state = {
//     elapsed: 0,
//     five: false
//   }
// 
//   interval = null;
// 
//   componentDidMount() {
//     this.interval = setInterval(() => {
//       this.setState(prevState => ({ elapsed: prevState.elapsed + 1 }));
//     }, 1000);
//   }
// 
//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.elapsed === this.state.elapsed) return;
//     this.setState(prevState => {
//       if (prevState.elapsed % 5) return { five: false };
//       return { five: true };
//     });
//   }
// 
//   componentWillUnmount() {
//     clearInterval(this.interval);
//   }
// 
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

export default function App() {
  const [mounted, setMounted] = useState(false);

  const toggleMount = () => setMounted(mounted => !mounted);

  return (
    <div className="App">
      <button onClick={toggleMount}>Mount/Unmount</button>
      {mounted && <Clock />}
    </div>
  );
}

function Clock() {
  const [elapsed, setElapsed] = useState(0);
  const [five, setFive] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(e => e + 1);
    }, 1000);

    setFive(!elapsed || elapsed % 5 ? false : true);

    return () => clearInterval(interval);
  }, [elapsed]);

  return (
    <>
      <h2>Elapsed:</h2>
      <h1>{elapsed}</h1>
      {five && <h4>Five!</h4>}
    </>
  );
}
