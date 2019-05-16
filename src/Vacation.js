import React, { useState, useLayoutEffect, useEffect, useReducer } from 'react';
import { getRandom, placeMap, Fallback } from './services';

import './App.css';

export default class Vacation extends React.Component {
  state = {
    loading: false,
    error: false,
    data: [],
    activity: '',
    place: getRandom(Object.keys(placeMap)),
  };

  timeout = null;

  componentDidMount() {
    this.fetchData(this.state.place);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.place !== prevState.place) {
      this.fetchData(this.state.place);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  fetchData = place => {
    this.setState({ loading: true, error: false });
    setTimeout(() => {
      if (Math.random() < 0.1)
        return this.setState({ loading: false, error: true });

      const data = placeMap[place];
      this.setState({
        loading: false,
        activity: getRandom(data),
        data,
      });
    }, 500);
  };

  setRandomActivity = () =>
    this.setState(state => ({
      activity: getRandom(state.data, state.activity),
    }));

  setRandomPlace = () =>
    this.setState(state => ({
      place: getRandom(Object.keys(placeMap), state.place),
    }));

  render() {
    const { loading, error, activity, place } = this.state;

    if (loading || error) return <Fallback loading={loading} error={error} />;

    return (
      <div className="App">
        <h1>
          What I did on my <span style={{ color: 'purple' }}>{place}</span>{' '}
          vacation:
        </h1>
        <h2>{activity}</h2>
        <button onClick={this.setRandomActivity}>What else?</button>
        <button onClick={this.setRandomPlace}>Where else?</button>
      </div>
    );
  }
}

// function useFetch() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [data, setData] = useState([]);
//   const [activity, setActivity] = useState('');
//   const [place, setPlace] = useState(getRandom(Object.keys(placeMap)));
//
//   useLayoutEffect(() => {
//     setLoading(true);
//     setError(false);
//     const timeout = setTimeout(() => {
//       if (Math.random() < 0.1) {
//         setError(true);
//         setLoading(false);
//       }
//
//       const data = placeMap[place];
//       setLoading(false);
//       setActivity(getRandom(data));
//       setData(data);
//     }, 500);
//
//     return () => clearTimeout(timeout);
//   }, [place]);
//
//   const setRandomActivity = () => setActivity(getRandom(data, activity));
//   const setRandomPlace = () =>
//     setPlace(getRandom(Object.keys(placeMap), place));
//
//   return { loading, error, activity, place, setRandomActivity, setRandomPlace };
// }

// function useFetch() {
//   const initialState = {
//     loading: false,
//     error: false,
//     data: [],
//     activity: '',
//     place: getRandom(Object.keys(placeMap)),
//   };
//
//   const [state, dispatch] = useReducer((state, action) => {
//     switch (action.type) {
//       case 'LOADING':
//         return {
//           ...state,
//           loading: true,
//           error: false,
//         };
//       case 'ERROR':
//         return {
//           ...state,
//           loading: false,
//           error: true,
//         };
//       case 'SUCCESS':
//         return {
//           ...state,
//           loading: false,
//           activity: getRandom(action.data),
//           data: action.data,
//         };
//       case 'NEW_ACTIVITY':
//         return {
//           ...state,
//           activity: getRandom(state.data, state.activity),
//         };
//       case 'NEW_PLACE':
//         return {
//           ...state,
//           place: getRandom(Object.keys(placeMap), state.place),
//         };
//       default:
//         return state;
//     }
//   }, initialState);
//
//   useLayoutEffect(() => {
//     dispatch({ type: 'LOADING' });
//     const timeout = setTimeout(() => {
//       if (Math.random() < 0.1) {
//         return dispatch({ type: 'ERROR' });
//       }
//
//       const data = placeMap[state.place];
//       dispatch({ type: 'SUCCESS', data });
//     }, 500);
//
//     return () => clearTimeout(timeout);
//   }, [state.place]);
//
//   const setRandomActivity = () => dispatch({ type: 'NEW_ACTIVITY' });
//   const setRandomPlace = () => dispatch({ type: 'NEW_PLACE' });
//
//   const { loading, error, activity, place } = state;
//
//   return { loading, error, activity, place, setRandomActivity, setRandomPlace };
// }

// export default function Vacation() {
//   const {
//     loading,
//     error,
//     activity,
//     place,
//     setRandomActivity,
//     setRandomPlace,
//   } = useFetch();
//
//   if (loading || error) return <Fallback loading={loading} error={error} />;
//
//   return (
//     <div className="App">
//       <h1>
//         What I did on my <span style={{ color: 'purple' }}>{place}</span>{' '}
//         vacation:
//       </h1>
//       <h2>{activity}</h2>
//       <button onClick={setRandomActivity}>What else?</button>
//       <button onClick={setRandomPlace}>Where else?</button>
//     </div>
//   );
// }

// const initialState = {
//   loading: false,
//   error: false,
//   data: [],
//   activity: '',
//   place: getRandom(Object.keys(placeMap))
// };
//
// export default function Vacation() {
//   const [state, dispatch] = useReducer((state, action) => {
//     switch (action.type) {
//       case 'FETCH': return {
//         ...state,
//         loading: true,
//         error: false,
//       }
//       case 'ERROR': return {
//         ...state,
//         loading: false,
//         error: true
//       }
//       case 'SUCCESS': return {
//         ...state,
//         data: action.data,
//         activity: getRandom(action.data),
//         loading: false
//       }
//       case 'NEW_THING': return {
//         ...state,
//         activity: getRandom(state.data, state.activity)
//       }
//       case 'NEW_PLACE': return {
//         ...state,
//         place: getRandom(Object.keys(placeMap))
//       }
//       default: return state;
//     }
//   }, initialState);
//
//   const { place, loading, error, activity } = state;
//
//   useEffect(() => {
//     dispatch({ type: 'FETCH' });
//     const timeout = setTimeout(() => {
//       if (Math.random() < 0.1)  return dispatch({ type: 'ERROR' });
//
//       dispatch({ type: 'SUCCESS', data: placeMap[place]});
//     }, 500);
//
//     return () => clearTimeout(timeout)
//   }, [place]);
//
//   if (loading || error) return <Fallback loading={loading} error={error} />
//
//   return (
//     <div className="App">
//       <h1>What I did on my <span style={{color: 'purple' }}>{place}</span> vacation:</h1>
//       <h2>{activity}</h2>
//       <button onClick={() => dispatch({ type: 'NEW_THING' })}>What else?</button>
//       <button onClick={() => dispatch({ type: 'NEW_PLACE' })}>Where else?</button>
//     </div>
//   );
// }

// export default function Vacation() {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [data, setData] = useState([]);
//   const [activity, setActivity] = useState('');
//   const [place, setPlace] = useState(getRandom(Object.keys(placeMap)));
//
//   const setRandomActivity = () => setActivity(getRandom(data, activity))
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
//       setActivity(getRandom(data));
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
//     <h2>{activity}</h2>
//     <button onClick={setRandomActivity}>What else?</button>
//     <button onClick={setRandomPlace}>Where else?</button>
//     </div>
//   );
// }
