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

function getRandom(items, currItem) {
  const item = items[Math.floor(Math.random() * items.length)];
  console.log(item, currItem)
  if (item === currItem) return getRandom(items, currItem);
  return item;
}

function fakeFetch(place, ms = 500) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.8) {
        return reject('Something went wrong!');
      }

      resolve(placeMap[place]);
    }, ms);
  });
}

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
    fakeFetch(state.place)
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

export default function App() {
  const { loading, error, place, thing, dispatch } = useFetch();

  if (loading) return <h1>Loading...</h1>
  if (error) return <h1 style={{color: 'red'}}>Error! {error}</h1>
  
  return (
    <div className="App">
      <h1 data-testid="vacation-title" >Things I did on my {place} vacation:</h1>
      <h2>{thing}</h2>
      <button onClick={() => dispatch({ type: 'NEW_THING' })}>What else?</button>
      <button onClick={() => dispatch({ type: 'CHANGE_PLACE' })}>Where else?</button>
    </div>
  );
}
