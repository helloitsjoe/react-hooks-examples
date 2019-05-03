import React, { useState, useEffect } from 'react';

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fakeFetch()
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
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
