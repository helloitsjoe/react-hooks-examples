import React, { useState, useLayoutEffect } from 'react';
import { fetchData, placeMap, getRandom } from './services';
import './App.css';

function useFetch() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [place, setPlace] = useState(getRandom(Object.keys(placeMap)));
  const [thing, setThing] = useState('');

  const setRandomThing = () => setThing(getRandom(data, thing));
  const setRandomPlace = () => setPlace(getRandom(Object.keys(placeMap)));

  useLayoutEffect(() => {
    setLoading(true);
    setError(false);
    fetchData(place)
      .then(data => {
        setData(data);
        setThing(getRandom(data));
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [place]);

  return { loading, error, place, thing, setRandomPlace, setRandomThing };
}

const Fallback = ({ loading, error }) => (
  <div className="App">
    {loading ? <h1>Loading...</h1> : <h1 style={{color: 'red'}}>Error! {error}</h1>}
  </div>
);

export default function App() {
  const { loading, error, place, thing, setRandomThing, setRandomPlace } = useFetch();

  if (loading || error) return <Fallback loading={loading} error={error} />
  
  return (
    <div className="App">
      <h1>What I did on my <span style={{color: 'purple' }}>{place}</span> vacation:</h1>
      <h2>{thing}</h2>
      <button onClick={setRandomThing}>What else?</button>
      <button onClick={setRandomPlace}>Where else?</button>
    </div>
  );
}
