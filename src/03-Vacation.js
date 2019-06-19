import React from 'react';
import useFetch from './useFetch';
import './App.css';

// HOOKS-BASED IMPLEMENTATION, SEE CLASS BELOW FOR REFERENCE
export default function Vacation() {
  const {
    loading,
    error,
    place,
    activity,
    setRandomActivity,
    setRandomPlace,
  } = useFetch();

  if (loading || error) return <Fallback loading={loading} error={error} />;

  return (
    <div className="App">
      <h1 data-testid="vacation-title">
        What I did on my <span style={{ color: 'purple' }}>{place}</span>{' '}
        vacation:
      </h1>
      <h2>{activity}</h2>
      <button onClick={setRandomActivity}>What else?</button>
      <button onClick={setRandomPlace}>Where else?</button>
    </div>
  );
}

Vacation.displayName = 'Vacation';

// CLASS-BASED IMPLEMENTATION

// import { getRandom, fetchData, placeMap } from './utils';

// export default class Vacation extends React.Component {
//   static displayName = 'Vacation';

//   state = {
//     loading: false,
//     error: false,
//     data: [],
//     activity: '',
//     place: getRandom(Object.keys(placeMap)),
//   };

//   componentDidMount() {
//     this.fetch(this.state.place);
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.place !== prevState.place) {
//       this.fetch(this.state.place);
//     }
//   }

//   fetch = place => {
//     this.setState({ loading: true, error: false });
//     fetchData(place)
//       .then(data => {
//         this.setState({
//           loading: false,
//           activity: getRandom(data),
//           data,
//         });
//       })
//       .catch(err => {
//         this.setState({ loading: false, error: true });
//       });
//   };

//   setRandomActivity = () =>
//     this.setState(state => ({
//       activity: getRandom(state.data, state.activity),
//     }));

//   setRandomPlace = () =>
//     this.setState(state => ({
//       place: getRandom(Object.keys(placeMap), state.place),
//     }));

//   render() {
//     const { loading, error, activity, place } = this.state;

//     if (loading || error) return <Fallback loading={loading} error={error} />;

//     return (
//       <div className="App">
//         <h1>
//           What I did on my <span style={{ color: 'purple' }}>{place}</span>{' '}
//           vacation:
//         </h1>
//         <h2>{activity}</h2>
//         <button onClick={this.setRandomActivity}>What else?</button>
//         <button onClick={this.setRandomPlace}>Where else?</button>
//       </div>
//     );
//   }
// }

const Fallback = ({ loading, error }) => {
  return (
    <div data-testid="fallback" className="App">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <h1 style={{ color: 'red' }}>Error! {error}</h1>
      )}
    </div>
  );
};
