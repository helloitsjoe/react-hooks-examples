import React, { useState, useEffect, useLayoutEffect, useReducer } from 'react';
import useFetch from './useFetch';
import { fetchImage, getRandom } from './utils';
import './App.css';

// // HOOKS-BASED IMPLEMENTATION, SEE CLASS BELOW FOR REFERENCE
export default function Vacation() {
  const { loading, error, imageData, input, query, handleChange, handleSubmit } = useFetch();

  if (loading || error) return <Fallback error={error} />;

  const { src, hotlink } = imageData;

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        {query && <h1>{query}!</h1>}
        {src ? (
          <a href={hotlink}>
            <img alt={query} src={src} />
          </a>
        ) : (
          <h2>We should go to Rome...</h2>
        )}
        {/* <select onChange={handleChange}>
          <option>Rome</option>
          <option>Paris</option>
          <option>London</option>
          <option>Boston</option>
        </select> */}
        <input
          className="Vacation-input"
          placeholder="Where should we go next?"
          onChange={handleChange}
          value={input}
        />
        <button type="submit">Search</button>
      </form>
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
