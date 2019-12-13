import React, { useRef, useState, useEffect, useReducer } from 'react';
import useFetch from './useFetch';
import { fetchImage, getRandom, getImgAttrs } from './utils';
import './App.css';

// const { loading, error, imageData, query, handleChange } = useCustomFetch();

// useEffect and data fetching
// 1. Set up state
// 2. Fetch on mount
// 3. Fetch on update
// 4. Clean up before unmount
// 5. Move into custom hook
// 6. Refactor to useReducer
// 7. API, useEffect is declarative, useReducer
// 8. Back to Counter, show useRef, useCallback, useMemo

const INITIAL_QUERY = 'Rome';

export default function Vacation({
  loading,
  error,
  imageData,
  query,
  handleChange
}) {
  if (loading || !imageData || error) return <Fallback error={error} />;

  const { alt, src, hotlink } = imageData;

  return (
    <div className="App">
      {query && <h1>{query}!</h1>}
      <a href={hotlink}>
        <img alt={alt} src={src} />
      </a>
      <select onChange={handleChange}>
        <option>Where do you want to go?</option>
        <option>Boston</option>
        <option>Rome</option>
        <option>Paris</option>
        <option>Tokyo</option>
        <option>London</option>
      </select>
    </div>
  );
}

Vacation.displayName = 'Vacation';

const Fallback = ({ loading, error }) => {
  return (
    <div data-testid="fallback" className="App">
      {error ? (
        <h1 style={{ color: 'red' }}>Error! {error}</h1>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

function useFetchReducer() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'FETCH':
          return { ...state, loading: true, error: false };
        case 'FETCH_SUCCESS':
          const imageData = getRandom(action.payload);
          // console.log(`imageData:`, imageData);
          return { ...state, loading: false, error: false, imageData };
        case 'FETCH_FAIL':
          return { ...state, loading: false, error: true };
        case 'QUERY_CHANGE':
          return {
            ...state,
            query: action.payload
          };
        default:
          return state;
      }
    },
    {
      loading: true,
      error: false,
      imageData: null,
      query: INITIAL_QUERY
    }
  );

  const { loading, error, imageData, query } = state;

  useEffect(() => {
    let isMounted = true;

    dispatch({ type: 'FETCH' });
    fetchImage(query)
      .then(res => {
        if (!isMounted) return;

        dispatch({ type: 'FETCH_SUCCESS', payload: res });
      })
      .catch(err => {
        if (!isMounted) return;

        console.error(err);
        dispatch({ type: 'FETCH_FAIL' });
      });

    return () => {
      isMounted = false;
    };
  }, [query]);

  const handleChange = e =>
    dispatch({ type: 'QUERY_CHANGE', payload: e.target.value });

  return { loading, error, imageData, query, handleChange };
}
