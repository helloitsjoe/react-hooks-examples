import React, { useRef, useState, useEffect, useLayoutEffect, useReducer } from 'react';
import useFetch from './useFetch';
import { fetchImage, getRandom, getImgAttrs } from './utils';
import './App.css';
const INITIAL_QUERY = 'Rome';
// const { loading, error, imageData, input, handleChange, handleSubmit } = useFetch();

// 1. Set up state
// 2. Fetch on mount
// 3. Fetch on update
// 4. Clean up before unmount
// 5. Move into custom hook
// 6. Refactor to useReducer
// 7. Back to Counter, show useCallback, useMemo, useRef

const useCustomFetch = () => {
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
          return { ...state, query: state.input };
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
    }
  );

  const { loading, error, imageData, input, query } = state;

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

    return () => {
      didCancel = true;
    };
  }, [query]);

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
};

// HOOKS-BASED IMPLEMENTATION, SEE CLASS BELOW FOR REFERENCE
export default function Vacation() {
  const { loading, error, imageData, query, input, handleChange, handleSubmit } = useCustomFetch();

  if (loading || error) return <Fallback error={error} />;

  const { alt, src, hotlink } = getImgAttrs(imageData);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        {query && <h1>{query}!</h1>}
        {src ? (
          <a href={hotlink}>
            <img alt={alt} src={src} />
          </a>
        ) : (
          <h2>We should to go Rome...</h2>
        )}
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

// CLASS-BASED IMPLEMENTATION

// export default class Vacation extends React.Component {
//   static displayName = 'Vacation';

//   state = {
//     loading: false,
//     error: false,
//     imageData: null,
//     input: '',
//     query: 'Rome',
//   };

//   componentDidMount() {
//     this.fetch(this.state.query);
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.query !== prevState.query) {
//       this.fetch(this.state.query);
//     }
//   }

//   fetch = query => {
//     this.setState({ loading: true, error: false });
//     fetchImage(query)
//       .then(data => {
//         this.setState({
//           loading: false,
//           imageData: getRandom(data.results),
//         });
//       })
//       .catch(err => {
//         this.setState({ loading: false, error: true });
//       });
//   };

//   handleChange = e => this.setState({ input: e.target.value });

//   handleSubmit = e => {
//     e.preventDefault();
//     this.setState(prev => ({ query: prev.input }));
//   };

//   render() {
//     const { loading, error, imageData, query, input } = this.state;
//     const { alt, src, hotlink } = getImgAttrs(imageData);

//     if (loading || error) return <Fallback error={error} />;

//     return (
//       <div className="App">
//         <form onSubmit={this.handleSubmit}>
//           {query && <h1>{query}!</h1>}
//           {src ? (
//             <a href={hotlink}>
//               <img alt={alt} src={src} />
//             </a>
//           ) : (
//             <h2>Where would you like to go?</h2>
//           )}
//           <input
//             className="Vacation-input"
//             placeholder="Where should we go next?"
//             onChange={this.handleChange}
//             value={input}
//           />
//           <button type="submit">Search</button>
//         </form>
//       </div>
//     );
//   }
// }

const Fallback = ({ loading, error }) => {
  return (
    <div data-testid="fallback" className="App">
      {error ? <h1 style={{ color: 'red' }}>Error! {error}</h1> : <h1>Loading...</h1>}
    </div>
  );
};
