import React from 'react';

export const placeMap = {
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
  ],
  'Tokyo': [
    'Ate a tuna roll',
    'Said "arigato" a lot',
    'Ate a mochi',
    'Did not watch anime',
    'Changed diapers'
  ]
}

export function fetchData(place, ms = 500) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.8) {
        return reject('Something went wrong!');
      }

      resolve(placeMap[place]);
    }, ms);
  });
}

export function getRandom(items, currItem) {
  const item = items[Math.floor(Math.random() * items.length)];
  if (item === currItem) return getRandom(items, currItem);
  return item;
}

export const Fallback = ({ loading, error }) => (
  <div className="App">
    {loading ? <h1>Loading...</h1> : <h1 style={{color: 'red'}}>Error! {error}</h1>}
  </div>
);

