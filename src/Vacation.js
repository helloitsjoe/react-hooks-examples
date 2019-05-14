import React, { useState, useEffect, useReducer } from 'react';
import { getRandom, placeMap, Fallback } from './services';

import './App.css';

const initialState = {
  loading: false,
  error: false,
  data: [],
  thing: '',
  place: getRandom(Object.keys(placeMap))
};

export default function Vacation() {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'FETCH': return {
        ...state,
        loading: true,
        error: false,
      }
      case 'ERROR': return {
        ...state,
        loading: false,
        error: true
      }
      case 'SUCCESS': return {
        ...state,
        data: action.data,
        thing: getRandom(action.data),
        loading: false
      }
      case 'NEW_THING': return {
        ...state,
        thing: getRandom(state.data, state.thing)
      }
      case 'NEW_PLACE': return {
        ...state,
        place: getRandom(Object.keys(placeMap))
      }
      default: return state;
    }
  }, initialState);

  const { place, loading, error, thing } = state;
  
  useEffect(() => {
    dispatch({ type: 'FETCH' });
    const timeout = setTimeout(() => {
      if (Math.random() < 0.1)  return dispatch({ type: 'ERROR' });
     
      dispatch({ type: 'SUCCESS', data: placeMap[place]});
    }, 500);

    return () => clearTimeout(timeout)
  }, [place]);

  if (loading || error) return <Fallback loading={loading} error={error} />

  return (
    <div className="App">
      <h1>What I did on my <span style={{color: 'purple' }}>{place}</span> vacation:</h1>
      <h2>{thing}</h2>
      <button onClick={() => dispatch({ type: 'NEW_THING' })}>What else?</button>
      <button onClick={() => dispatch({ type: 'NEW_PLACE' })}>Where else?</button>
    </div>
  );
}

// export default function Vacation() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [data, setData] = useState([]);
//   const [thing, setThing] = useState('');
//   const [place, setPlace] = useState(getRandom(Object.keys(placeMap)));
// 
//   const setRandomThing = () => setThing(getRandom(data, thing))
//   const setRandomPlace = () => setPlace(getRandom(Object.keys(placeMap)))
//   
//   useEffect(() => {
//     setLoading(true);
//     setError(false);
//     const timeout = setTimeout(() => {
//       if (Math.random() < 0.1) {
//         setLoading(false);
//         setError(true);
//         return;
//       }
//      
//       const data = placeMap[place];
//       setData(data);
//       setThing(getRandom(data));
//       setLoading(false);
//     }, 500);
// 
//     return () => clearTimeout(timeout)
//   }, [place]);
// 
//   if (loading || error) return <Fallback loading={loading} error={error} />
// 
//   return (
//     <div className="App">
//     <h1>What I did on my <span style={{color: 'purple' }}>{place}</span> vacation:</h1>
//     <h2>{thing}</h2>
//     <button onClick={setRandomThing}>What else?</button>
//     <button onClick={setRandomPlace}>Where else?</button>
//     </div>
//   );
// }

// export default class Vacation extends React.Component {
// 
//   state = {
//     loading: false,
//     error: false,
//     data: [],
//     thing: '',
//     place: getRandom(Object.keys(placeMap)) 
//   }
// 
//   timeout = null;
// 
//   componentDidMount() {
//     this.fetchData(this.state.place);
//   }
// 
//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.place !== prevState.place) {
//       this.fetchData(this.state.place);
//     }
//   }
// 
//   componentWillUnmount() {
//     clearTimeout(this.timeout);
//   }
// 
//   fetchData = (place) => {
//     this.setState({ loading: true, error: false });
//     setTimeout(() => {
//       if (Math.random() < 0.1) return this.setState({ loading: false, error: true }); 
//       
//       const data = placeMap[place];
//       this.setState({
//         loading: false,
//         thing: getRandom(data),
//         data,
//       });
//     }, 500);
//   }
// 
//   setRandomThing = () => this.setState(state => ({
//     thing: getRandom(state.data, state.thing)
//   }))
// 
//   setRandomPlace = () => this.setState(state => ({
//     place: getRandom(Object.keys(placeMap), state.place)
//   }))
// 
//   render() {
//     const { loading, error, thing, place } = this.state;
// 
//     if (loading || error) return <Fallback loading={loading} error={error} />
// 
//     return (
//       <div className="App">
//       <h1>What I did on my <span style={{color: 'purple' }}>{place}</span> vacation:</h1>
//       <h2>{thing}</h2>
//       <button onClick={this.setRandomThing}>What else?</button>
//       <button onClick={this.setRandomPlace}>Where else?</button>
//       </div>
//     );
//   }
// }
