import { useEffect, useState, useReducer } from 'react';
import { getRandom, fetchImage } from './utils';

const INITIAL_QUERY = 'Boston';

// Here are 3 different implementations of a custom hook that exposes the same API.
// Swap them with the default export at the bottom of the file.

// Custom hook using useState to fetch data
function useFetchWithState() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageData, setImageData] = useState();
  const [query, setQuery] = useState(INITIAL_QUERY);

  useEffect(() => {
    let didCancel = false;

    setLoading(true);
    setError(false);
    fetchImage(query)
      .then(data => {
        if (didCancel) return;

        setImageData(getRandom(data));
        setLoading(false);
        setError(false);
      })
      .catch(err => {
        if (didCancel) return;

        setLoading(false);
        setError(true);
      });

    // This prevents setting state on an unmounted component. To see the failure,
    // comment out this return function, then in the browser: open dev tools, fetch
    // data and switch to another example (e.g. Clock) while the data is still loading.
    return () => {
      didCancel = true;
    };
  }, [query]);

  const handleChange = e => setQuery(e.target.value);

  return {
    loading,
    error,
    imageData,
    query,
    handleChange,
  };
}

// Custom hook using useState to fetch data, storing all state in a single object.
function useFetchWithSingleState() {
  // Note: this is closer to how setState works in class components, but note that
  // useState doesn't automatically merge with the existing state so you must do
  // it manually. The React docs recommend either splitting state into variables
  // that tend to change together, or using useReducer hook (see below).
  // https://reactjs.org/docs/hooks-faq.html#should-i-use-one-or-many-state-variables
  const initialState = {
    loading: true,
    error: false,
    imageData: null,
    query: INITIAL_QUERY,
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    setState(s => ({ ...s, loading: true, error: false }));
    fetchImage(state.query)
      .then(data => {
        setState(s => ({
          ...s,
          loading: false,
          error: false,
          imageData: getRandom(data),
        }));
      })
      .catch(
        err =>
          console.error(err) ||
          setState(s => ({ ...s, loading: false, error: true }))
      );
  }, [state.query]);

  const handleChange = e => {
    const { value } = e.target;
    setState(s => ({
      ...s,
      query: value,
    }));
  };

  return { ...state, handleChange };
}

// Custom hook using useReducer to fetch data
function useFetchWithReducer() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'FETCH':
          return { ...state, loading: true, error: false };
        case 'FETCH_SUCCESS':
          const imageData = getRandom(action.payload);
          return { ...state, loading: false, error: false, imageData };
        case 'FETCH_FAIL':
          return { ...state, loading: false, error: true };
        case 'QUERY_CHANGE':
          return { ...state, query: action.payload };
        default:
          return state;
      }
    },
    {
      loading: true,
      error: false,
      imageData: null,
      query: INITIAL_QUERY,
    }
  );

  const { loading, error, imageData, query } = state;

  useEffect(() => {
    let didCancel = false;

    dispatch({ type: 'FETCH' });
    fetchImage(query)
      .then(res => {
        if (didCancel) return;

        dispatch({ type: 'FETCH_SUCCESS', payload: res });
      })
      .catch(err => {
        if (didCancel) return;

        console.error(err);
        dispatch({ type: 'FETCH_FAIL' });
      });

    // This prevents setting state on an unmounted component. To see the failure,
    // comment out this return function, then in the browser: open dev tools, fetch
    // data and switch to another example (e.g. Clock) while the data is still loading.
    return () => {
      didCancel = true;
    };
  }, [query]);

  const handleChange = e =>
    dispatch({ type: 'QUERY_CHANGE', payload: e.target.value });

  return {
    loading,
    imageData,
    error,
    query,
    handleChange,
  };
}

// export default useFetchWithState;
export default useFetchWithReducer;
// export default useFetchWithSingleState;
