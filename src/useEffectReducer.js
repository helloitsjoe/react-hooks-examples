import React, { useLayoutEffect, useReducer } from 'react';
import './App.css';

const placeMap = {
  'Paris': [
    'Ate a baguette',
    'Said "merci" a lot',
    'Wore a beret',
    'Ate a croissant',
    'Changed diapers'
  ],
  'Rome': [
    'Ate a pizza',
    'Ate gelato every day',
    'Fought a gladiator',
    'Said "grazie" a lot',
    'Changed diapers'
  ],
  'Boston': [
    'Ate a lobster roll',
    'Did not say "cah"',
    'Went to Harvard Yard',
    'Changed diapers',
    'Rode a Swan Boat'
  ]
}

function getRandomPlace() {
  const places = Object.keys(placeMap); 
  return places[Math.floor(Math.random() * places.length)];
}

function fakeFetch(place) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.8) {
        return reject('Something went wrong!');
      }

      resolve(placeMap[place]);
    }, 500);
  });
}

function useFetch() {
  const initialState = {
    loading: true,
    error: null,
    data: [],
    place: 'Paris'
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
        data: action.data
      }
      case 'FETCH_FAILURE': return {
        ...state,
        loading: false,
        error: action.error
      }
      case 'NEW_THING': return {
        ...state
      }
      case 'CHANGE_PLACE': return {
        ...state,
        place: getRandomPlace()
      }
      default: return state
    }
  }, initialState);
  
  // useLayoutEffect to avoid a flash
  useLayoutEffect(() => {
    dispatch({ type: 'FETCH_START' });
    fakeFetch(state.place)
      .then(data => {
        dispatch({ type: 'FETCH_SUCCESS', data });
      })
      .catch(error => {
        dispatch({ type: 'FETCH_FAILURE', error });
      });
  }, [state.place]);

  const { loading, error, data, place } = state;
  return { data, loading, error, place, dispatch };
}

export default function App({ injectedUseFetch = useFetch }) {
  const { data, loading, error, place, dispatch } = injectedUseFetch();

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1 style={{color: 'red'}}>Error! {error}</h1>

  const randomThing = data[Math.floor(Math.random() * data.length)];
  
  return (
    <div className="App">
      <h1>Things I did on my {place} vacation:</h1>
      <h2>{randomThing}</h2>
      <button onClick={() => dispatch({ type: 'NEW_THING' })}>What else?</button>
      <button onClick={() => dispatch({ type: 'CHANGE_PLACE' })}>Where else?</button>
    </div>
  );
}
