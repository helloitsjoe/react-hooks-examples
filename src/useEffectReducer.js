import React, { useReducer, useEffect } from 'react';

function fakeFetch() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.8) {
        return reject('Something went wrong!');
      }

      resolve([
        'Ate a baguette',
        'Wore a baret',
        'Changed diapers'
      ]);
    }, 1000);
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
      default: return state
    }
  }, {
    loading: true,
    error: null,
    data: []
  });

  const { loading, error, data } = state;

  useEffect(() => {
    dispatch({ type: 'FETCH_START' });
    fakeFetch()
      .then(data => {
        dispatch({ type: 'FETCH_SUCCESS', data });
      })
      .catch(error => {
        dispatch({ type: 'FETCH_FAILURE', error });
      });
  }, []);

  return { data, loading, error };
}

export default function App() {
  const { data, loading, error } = useFetch();
  
  if (loading) return <h1>Loading...</h1>
  if (error) return <h1 style={{color: 'red'}}>Error! {error}</h1>

  return (
    <div className="App">
      <h1>Things I did on vacation:</h1>
      <ul>
        {data.map(thing => <li key={thing} >{thing}</li>)}
      </ul>
    </div>
  );
}
