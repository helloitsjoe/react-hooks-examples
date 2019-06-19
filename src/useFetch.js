import { useLayoutEffect, useState, useReducer } from 'react';
import { getRandom, fetchData, placeMap } from './utils';

// Here are 3 different implementations of a custom hook that exposes the same API.
// Swap them with the default export at the bottom of the file.

// Custom hook using useState to fetch data
function useFetchWithState() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [activity, setActivity] = useState('');
  const [place, setPlace] = useState(getRandom(Object.keys(placeMap)));

  // useEffect flashes before data fetching, useLayoutEffect runs before browser paint
  useLayoutEffect(() => {
    setLoading(true);
    setError(false);
    fetchData(place)
      .then(data => {
        setLoading(false);
        setActivity(getRandom(data));
        setData(data);
      })
      .catch(err => {
        setLoading(false);
        setError(true);
      });
  }, [place]);

  const setRandomPlace = () => setPlace(getRandom(Object.keys(placeMap)));
  const setRandomActivity = () => setActivity(getRandom(data, activity));

  return { loading, error, place, activity, setRandomActivity, setRandomPlace };
}

// Custom hook using useState to fetch data, storing all state in a single object.
function useFetchWithSingleState() {
  // Note: this is closer to how setState works in class components, but note that
  // useState doesn't automatically merge with the existing state so you must do
  // it manually. The React docs recommend either splitting state into variables
  // that tend to change together, or using useReducer hook (see below).
  // https://reactjs.org/docs/hooks-faq.html#should-i-use-one-or-many-state-variables
  const initialState = {
    loading: false,
    error: false,
    data: [],
    activity: '',
    place: getRandom(Object.keys(placeMap)),
  };

  const [state, setState] = useState(initialState);
  const updateState = newState => setState(s => ({ ...s, ...newState }));

  useLayoutEffect(() => {
    updateState({ loading: true, error: false });
    fetchData(state.place)
      .then(data => {
        updateState({
          loading: false,
          activity: getRandom(data),
          data,
        });
      })
      .catch(err => updateState({ loading: false, error: true }));
  }, [state.place]);

  const setRandomPlace = () =>
    updateState({ place: getRandom(Object.keys(placeMap)) });
  const setRandomActivity = () =>
    updateState({ activity: getRandom(data, state.activity) });

  const { data, ...rest } = state;
  return { ...rest, setRandomActivity, setRandomPlace };
}

// Custom hook using useReducer to fetch data
function useFetchWithReducer() {
  const initialState = {
    loading: false,
    error: false,
    data: [],
    activity: '',
    place: getRandom(Object.keys(placeMap)),
  };

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'FETCHING':
        return {
          ...state,
          loading: true,
          error: false,
        };
      case 'SUCCESS':
        return {
          ...state,
          loading: false,
          data: action.data,
          activity: getRandom(action.data),
        };
      case 'ERROR':
        return {
          ...state,
          loading: false,
          error: true,
        };
      case 'NEW_ACTIVITY':
        return {
          ...state,
          activity: getRandom(state.data, state.activity),
        };
      case 'NEW_PLACE':
        return {
          ...state,
          place: getRandom(Object.keys(placeMap), state.place),
        };
      default:
        return state;
    }
  }, initialState);

  useLayoutEffect(() => {
    dispatch({ type: 'FETCHING' });
    fetchData(state.place)
      .then(data => {
        dispatch({ type: 'SUCCESS', data });
      })
      .catch(err => {
        dispatch({ type: 'ERROR' });
      });
  }, [state.place]);

  const setRandomPlace = () => dispatch({ type: 'NEW_PLACE' });
  const setRandomActivity = () => dispatch({ type: 'NEW_ACTIVITY' });
  const { data, ...rest } = state;
  return { ...rest, setRandomActivity, setRandomPlace };
}

export default useFetchWithState;
// export default useFetchWithReducer;
// export default useFetchWithSingleState;
