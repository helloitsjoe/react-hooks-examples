import React, { useLayoutEffect, useReducer } from 'react';
import { fetchData, placeMap, getRandom } from './services';
import './App.css';

function useFetch() {
  const initialState = {
    loading: true,
    error: null,
    data: [],
    place: getRandom(Object.keys(placeMap)),
    thing: ''
  }

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'FETCH_START': return {
        ...state,
        loading: true,
        error: null
      }
      case 'FETCH_SUCCESS': return {
        ...state,
        loading: false,
        error: null,
        data: action.data,
        thing: getRandom(action.data)
      }
      case 'FETCH_FAILURE': return {
        ...state,
        loading: false,
        error: action.error
      }
      case 'NEW_THING': return {
        ...state,
        thing: getRandom(state.data, state.thing)
      }
      case 'CHANGE_PLACE': return {
        ...state,
        place: getRandom(Object.keys(placeMap), state.place)
      }
      default: return state
    }
  }, initialState);
  
  // useLayoutEffect to avoid a flash
  useLayoutEffect(() => {
    dispatch({ type: 'FETCH_START' });
    fetchData(state.place)
      .then(data => {
        dispatch({ type: 'FETCH_SUCCESS', data });
      })
      .catch(error => {
        dispatch({ type: 'FETCH_FAILURE', error });
      });
  }, [state.place]);

  const { loading, error, place, thing } = state;
  return { loading, error, place, thing, dispatch };
}

const Fallback = ({ loading, error }) => (
  <div data-testid="fallback" className="App">
    {loading ? <h1>Loading...</h1> : <h1 style={{color: 'red'}}>Error! {error}</h1>}
  </div>
);

export default function App() {
  const { loading, error, place, thing, dispatch } = useFetch();
 
  if (loading || error) {
    return <Fallback loading={loading} error={error} />
  }
  
  return (
    <div className="App">
      <h1 data-testid="vacation-title" >Things I did on my {place} vacation:</h1>
      <h2>{thing}</h2>
      <button onClick={() => dispatch({ type: 'NEW_THING' })}>What else?</button>
      <button onClick={() => dispatch({ type: 'CHANGE_PLACE' })}>Where else?</button>
    </div>
  );
}
