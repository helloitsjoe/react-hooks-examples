import React, { useReducer, useEffect } from 'react';

function fakeFetch(place) {
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
    ]
  }
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
        place: state.place === 'Paris' ? 'Rome' : 'Paris'
      }
      default: return state
    }
  }, {
    loading: true,
    error: null,
    data: [],
    place: 'Paris'
  });
  
  const { loading, error, data, place } = state;

  useEffect(() => {
    dispatch({ type: 'FETCH_START' });
    fakeFetch(place)
      .then(data => {
        dispatch({ type: 'FETCH_SUCCESS', data });
      })
      .catch(error => {
        dispatch({ type: 'FETCH_FAILURE', error });
      });
  }, [place]);

  return { data, loading, error, place, dispatch };
}

export default function App() {
  const { data, loading, error, place, dispatch } = useFetch();

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
