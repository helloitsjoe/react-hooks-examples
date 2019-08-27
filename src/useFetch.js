import { useLayoutEffect, useState, useReducer } from 'react';
import { getRandom, fetchImage } from './utils';

const INITIAL_QUERY = 'Rome';

// Here are 3 different implementations of a custom hook that exposes the same API.
// Swap them with the default export at the bottom of the file.

// Custom hook using useState to fetch data
function useFetchWithState() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [imageData, setImageData] = useState();
  const [input, setInput] = useState('');
  const [query, setQuery] = useState(INITIAL_QUERY);
  const [requestCount, setRequestCount] = useState(0);

  // useEffect flashes before data fetching, useLayoutEffect runs before browser paint
  useLayoutEffect(() => {
    let didCancel = false;

    setLoading(true);
    setError(false);
    fetchImage(query)
      .then(data => {
        if (didCancel) return;

        setLoading(false);
        setError(false);
        setImageData(getRandom(data.results));
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
  }, [query, requestCount]);

  const handleChange = e => setInput(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    setRequestCount(c => c + 1);
    setQuery(input);
  };

  return { loading, error, imageData, input, query, handleChange, handleSubmit };
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
    imageData: null,
    input: '',
    query: INITIAL_QUERY,
    requestCount: 0,
  };

  const [state, setState] = useState(initialState);

  useLayoutEffect(() => {
    setState({ ...state, loading: true, error: false });
    fetchImage(state.query)
      .then(data => {
        const imageData = data.results;
        console.log(`imageData:`, imageData);
        setState({
          ...state,
          loading: false,
          error: false,
          imageData,
        });
      })
      .catch(err => console.error(err) || setState({ ...state, loading: false, error: true }));
  }, [state.query, state.requestCount]);

  const handleChange = e => setState({ ...state, input: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    setState(prev => ({ ...state, requestCount: prev.requestCount + 1, query: prev.input }));
  };

  return { ...state, handleChange, handleSubmit };
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
          console.log(`imageData:`, imageData);
          return { ...state, loading: false, error: false, imageData };
        case 'FETCH_FAIL':
          return { ...state, loading: false, error: true };
        case 'INPUT':
          return { ...state, input: action.payload };
        case 'QUERY':
          return { ...state, query: state.input, requestCount: state.requestCount + 1 };
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
      requestCount: 0,
    }
  );

  const { loading, error, imageData, input, query, requestCount } = state;

  // useEffect flashes before data fetching, useLayoutEffect runs before browser paint
  useLayoutEffect(() => {
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

    // This prevents setting state on an unmounted component. To see the failure,
    // comment out this return function, then in the browser: open dev tools, fetch
    // data and switch to another example (e.g. Clock) while the data is still loading.
    return () => {
      didCancel = true;
    };
  }, [query, requestCount]);

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

// export default useFetchWithState;
export default useFetchWithReducer;
// export default useFetchWithSingleState;
