import React, { useRef, useState, useEffect, useReducer } from 'react';
import useFetch from './useFetch';
import { fetchImage, getRandom, getImgAttrs } from './utils';
import './App.css';

// const { loading, error, imageData, input, query, handleChange, handleSubmit } = useCustomFetch();

// useEffect and data fetching
// 1. Set up state
// 2. Fetch on mount
// 3. Fetch on update
// 4. Clean up before unmount
// 5. Move into custom hook
// 6. Refactor to useReducer
// 7. Back to Counter, show useRef, useCallback, useMemo

const INITIAL_QUERY = 'Rome';

export default function Vacation({
  loading,
  error,
  imageData = {},
  input,
  query,
  handleSubmit,
  handleChange,
}) {
  if (loading || error) return <Fallback error={error} />;

  const { alt, src, hotlink } = imageData;

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
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
      </form>
    </div>
  );
}

Vacation.displayName = 'Vacation';

const Fallback = ({ loading, error }) => {
  return (
    <div data-testid="fallback" className="App">
      {error ? <h1 style={{ color: 'red' }}>Error! {error}</h1> : <h1>Loading...</h1>}
    </div>
  );
};

function useFetchWithReducer() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'FETCH':
          return { ...state, loading: true, error: false };
        case 'FETCH_SUCCESS':
          const imageData = getRandom(action.payload);
          console.log(`imageData:`, imageData);
          return { ...state, loading: false, error: false, imageData };
        case 'FETCH_FAIL':
          return { ...state, loading: false, error: true };
        case 'INPUT':
          return { ...state, input: action.payload };
        case 'QUERY':
          return { ...state, query: state.input };
        default:
          return state;
      }
    },
    {
      loading: true,
      error: false,
      imageData: null,
      input: '',
      query: INITIAL_QUERY,
    }
  );

  const { loading, error, imageData, input, query } = state;

  useEffect(() => {
    let didCancel = false;

    dispatch({ type: 'FETCH' });
    fetchImage(query)
      .then(res => {
        if (didCancel) return;

        dispatch({ type: 'FETCH_SUCCESS', payload: res.results });
      })
      .catch(err => {
        if (didCancel) return;

        console.error(err);
        dispatch({ type: 'FETCH_FAIL' });
      });

    return () => {
      didCancel = true;
    };
  }, [query]);

  const handleChange = e => dispatch({ type: 'INPUT', payload: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: 'QUERY' });
  };

  return {
    loading,
    error,
    imageData,
    input,
    query,
    handleChange,
    handleSubmit,
  };
}
