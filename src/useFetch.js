import { useLayoutEffect, useState, useReducer } from 'react';
import { getRandom, fetchPhoto } from './utils';

// Here are 3 different implementations of a custom hook that exposes the same API.
// Swap them with the default export at the bottom of the file.

// Custom hook using useState to fetch data
function useFetchWithState() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [imageData, setImageData] = useState();
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [requestCount, setRequestCount] = useState(0);

  // useEffect flashes before data fetching, useLayoutEffect runs before browser paint
  useLayoutEffect(() => {
    let isCurrent = true;

    setLoading(true);
    setError(false);
    fetchPhoto(query)
      .then(data => {
        if (!isCurrent) return;

        setLoading(false);
        setError(false);
        setImageData(getRandom(data.results));
      })
      .catch(err => {
        if (!isCurrent) return;

        setLoading(false);
        setError(true);
      });

    // This prevents setting state on an unmounted component. To see the failure,
    // comment out this return function, then in the browser: open dev tools, fetch
    // data and switch to another example (e.g. Clock) while the data is still loading.
    return () => {
      isCurrent = false;
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
    query: '',
    requestCount: 0,
  };

  const [state, setState] = useState(initialState);

  useLayoutEffect(() => {
    setState({ ...state, loading: true, error: false });
    fetchPhoto(state.query)
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
  const [fetchState, fetchDispatch] = useReducer(
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
        default:
          return state;
      }
    },
    {
      loading: true,
      error: false,
      imageData: null,
    }
  );

  const [inputState, inputDispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'INPUT':
          return { ...state, input: action.payload };
        case 'QUERY':
          return { ...state, query: state.input, requestCount: state.requestCount + 1 };
        default:
          return state;
      }
    },
    {
      input: '',
      query: '',
      requestCount: 0,
    }
  );

  // useEffect flashes before data fetching, useLayoutEffect runs before browser paint
  useLayoutEffect(() => {
    let isCurrent = true;
    fetchDispatch({ type: 'FETCH' });
    fetchPhoto(inputState.query)
      .then(res => {
        if (!isCurrent) return;
        fetchDispatch({ type: 'FETCH_SUCCESS', payload: res.results });
      })
      .catch(err => {
        if (!isCurrent) return;
        console.error(err);
        fetchDispatch({ type: 'FETCH_FAIL' });
      });

    // This prevents setting state on an unmounted component. To see the failure,
    // comment out this return function, then in the browser: open dev tools, fetch
    // data and switch to another example (e.g. Clock) while the data is still loading.
    return () => {
      isCurrent = false;
    };
  }, [inputState.query, inputState.requestCount]);

  const handleChange = e => inputDispatch({ type: 'INPUT', payload: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    inputDispatch({ type: 'QUERY' });
  };

  const { loading, error, imageData } = fetchState;
  const { input } = inputState;

  return {
    loading,
    error,
    imageData,
    input,
    handleChange,
    handleSubmit,
  };
}

// export default useFetchWithState;
export default useFetchWithReducer;
// export default useFetchWithSingleState;
