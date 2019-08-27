import React, { useState, useEffect, useLayoutEffect, useReducer } from 'react';
import useFetch from './useFetch';
import { fetchPhoto, getRandom, getImgAttrs } from './utils';
import './App.css';

// // HOOKS-BASED IMPLEMENTATION, SEE CLASS BELOW FOR REFERENCE
export default function Vacation() {
  const { loading, error, imageData, input, query, handleChange, handleSubmit } = useFetch();

  const { alt, src, hotlink } = getImgAttrs(imageData);

  if (loading || error) return <Fallback error={error} />;

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        {query && <h1>{query}!</h1>}
        {src ? (
          <a href={hotlink}>
            <img alt={alt} src={src} />
          </a>
        ) : (
          <h2>We should go to Rome...</h2>
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
//     fetchPhoto(query)
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
