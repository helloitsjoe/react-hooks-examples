const KEY = 'c0648e21b8bdf72b429ede45bb96e71d1788888bd05b8c41e5347f1396f4e0d9';
const BASE_URL = `https://api.unsplash.com/search/photos?client_id=${KEY}`;

const wait = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchPhoto = query =>
  wait(1000)
    .then(() => fetch(`${BASE_URL}&query=${query}`))
    .then(res => res.json());

export const placeMap = {
  Paris: [
    'Ate a baguette',
    'Said "merci" a lot',
    'Wore a beret',
    'Ate a croissant',
    'Changed diapers',
  ],
  Rome: [
    'Ate a pizza',
    'Ate gelato every day',
    'Fought a gladiator',
    'Said "grazie" a lot',
    'Changed diapers',
  ],
  Boston: [
    'Ate a lobster roll',
    'Did not say "cah"',
    'Went to Harvard Yard',
    'Changed diapers',
    'Rode a Swan Boat',
  ],
  Tokyo: [
    'Ate a tuna roll',
    'Said "arigato" a lot',
    'Ate a mochi',
    'Did not watch anime',
    'Changed diapers',
  ],
};

export function fetchData(place, ms = 500) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.1) {
        return reject('Something went wrong!');
      }

      resolve(placeMap[place]);
    }, ms);
  });
}

export function getRandom(items, currItem) {
  const item = items[Math.floor(Math.random() * items.length)];
  if (currItem && item === currItem) return getRandom(items, currItem);
  return item;
}
