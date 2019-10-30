import React, { useState, useEffect, useLayoutEffect, useReducer } from 'react';
import useFetch from './useFetch';
import { fetchImage, getRandom } from './utils';
import './App.css';

export default function Vacation() {
  const { loading, error, imageData, query, handleChange } = useFetch();

  if (loading || error) return <Fallback error={error} />;

  const { src, hotlink } = imageData;

  return (
    <div className="App">
      {query && <h1>{query}!</h1>}
      <a href={hotlink}>
        <img alt={query} src={src} />
      </a>
      <select onChange={handleChange}>
        <option>Where do you want to go?</option>
        <option>Rome</option>
        <option>Paris</option>
        <option>London</option>
        <option>Boston</option>
      </select>
    </div>
  );
}

Vacation.displayName = 'Vacation';

const Fallback = ({ loading, error }) => {
  return (
    <div data-testid="fallback" className="App">
      {error ? (
        <div className="error">
          <h1>Error!</h1>
          <p>See devtools for more information</p>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};
