import React, { useState, useLayoutEffect, useEffect, useReducer } from 'react';
import { getRandom, fetchData, placeMap } from './utils';

import './App.css';

// Hooks-based implementation, see class below for reference
export default function Vacation() {
  const {
    loading,
    error,
    place,
    activity,
    setRandomActivity,
    setRandomPlace
  } = useFetchWithState();
  // You can swap out the useFetch implementations, they expose the same API
  // } = useFetchWithReducer();

  if (loading || error) return <Fallback loading={loading} error={error} />;

  return (
    <div className="App">
      <h1 data-testid="vacation-title">
        What I did on my <span style={{ color: 'purple' }}>{place}</span>{' '}
        vacation:
      </h1>
      <h2>{activity}</h2>
      <button onClick={setRandomActivity}>What else?</button>
      <button onClick={setRandomPlace}>Where else?</button>
    </div>
  );
}

// Custom hook using useState to fetch data
function useFetchWithState() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [activity, setActivity] = useState('');
  const [place, setPlace] = useState(getRandom(Object.keys(placeMap)));

  // useEffect flashes before data fetching, useLayoutEffect runs before browser paint
  useLayoutEffect(() => {
    setLoading(true);
    setError(false);
    fetchData(place)
      .then(data => {
        setLoading(false);
        setActivity(getRandom(data));
        setData(data);
      })
      .catch(err => {
        setLoading(false);
        setError(true);
      });
  }, [place]);

  const setRandomPlace = () => setPlace(Object.keys(placeMap));
  const setRandomActivity = () => setActivity(getRandom(data, activity));

  return { loading, error, place, activity, setRandomActivity, setRandomPlace };
}

// Custom hook using useReducer to fetch data
function useFetchWithReducer() {
  const initialState = {
    loading: false,
    error: false,
    data: [],
    activity: '',
    place: getRandom(Object.keys(placeMap))
  };

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'FETCHING':
        return {
          ...state,
          loading: true,
          error: false
        };
      case 'SUCCESS':
        return {
          ...state,
          loading: false,
          data: action.data,
          activity: getRandom(action.data)
        };
      case 'ERROR':
        return {
          ...state,
          loading: false,
          error: true
        };
      case 'NEW_ACTIVITY':
        return {
          ...state,
          activity: getRandom(state.data, state.activity)
        };
      case 'NEW_PLACE':
        return {
          ...state,
          place: getRandom(Object.keys(placeMap), state.place)
        };
      default:
        return state;
    }
  }, initialState);

  useLayoutEffect(() => {
    dispatch({ type: 'FETCHING' });
    fetchData(state.place)
      .then(data => {
        dispatch({ type: 'SUCCESS', data });
      })
      .catch(err => {
        dispatch({ type: 'ERROR' });
      });
  }, [state.place]);

  const setRandomPlace = () => dispatch({ type: 'NEW_PLACE' });
  const setRandomActivity = () => dispatch({ type: 'NEW_ACTIVITY' });
  const { loading, error, place, activity } = state;

  return { loading, error, place, activity, setRandomActivity, setRandomPlace };
}

// Class-based implementation

// export default class Vacation extends React.Component {
//   state = {
//     loading: false,
//     error: false,
//     data: [],
//     activity: '',
//     place: getRandom(Object.keys(placeMap)),
//   };

//   componentDidMount() {
//     this.fetch(this.state.place);
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.place !== prevState.place) {
//       this.fetch(this.state.place);
//     }
//   }

//   fetch = place => {
//     this.setState({ loading: true, error: false });
//     fetchData(place)
//       .then(data => {
//         this.setState({
//           loading: false,
//           activity: getRandom(data),
//           data,
//         });
//       })
//       .catch(err => {
//         this.setState({ loading: false, error: true });
//       });
//   };

//   setRandomActivity = () =>
//     this.setState(state => ({
//       activity: getRandom(state.data, state.activity),
//     }));

//   setRandomPlace = () =>
//     this.setState(state => ({
//       place: getRandom(Object.keys(placeMap), state.place),
//     }));

//   render() {
//     const { loading, error, activity, place } = this.state;

//     if (loading || error) return <Fallback loading={loading} error={error} />;

//     return (
//       <div className="App">
//         <h1>
//           What I did on my <span style={{ color: 'purple' }}>{place}</span>{' '}
//           vacation:
//         </h1>
//         <h2>{activity}</h2>
//         <button onClick={this.setRandomActivity}>What else?</button>
//         <button onClick={this.setRandomPlace}>Where else?</button>
//       </div>
//     );
//   }
// }

const Fallback = ({ loading, error }) => {
  return (
    <div data-testid="fallback" className="App">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <h1 style={{ color: 'red' }}>Error! {error}</h1>
      )}
    </div>
  );
};
