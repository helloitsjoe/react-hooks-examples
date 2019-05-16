import React, { useState, useLayoutEffect, useEffect, useReducer } from 'react';
import { getRandom, fetchData, placeMap, Fallback } from './services';

import './App.css';

export default class Vacation extends React.Component {
  state = {
    loading: false,
    error: false,
    data: [],
    activity: '',
    place: getRandom(Object.keys(placeMap)),
  };

  componentDidMount() {
    this.fetch(this.state.place);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.place !== prevState.place) {
      this.fetch(this.state.place);
    }
  }

  fetch = place => {
    this.setState({ loading: true, error: false });
    fetchData(place)
      .then(data => {
        this.setState({
          loading: false,
          activity: getRandom(data),
          data,
        });
      })
      .catch(err => {
        this.setState({ loading: false, error: true });
      });
  };

  setRandomActivity = () =>
    this.setState(state => ({
      activity: getRandom(state.data, state.activity),
    }));

  setRandomPlace = () =>
    this.setState(state => ({
      place: getRandom(Object.keys(placeMap), state.place),
    }));

  render() {
    const { loading, error, activity, place } = this.state;

    if (loading || error) return <Fallback loading={loading} error={error} />;

    return (
      <div className="App">
        <h1>
          What I did on my <span style={{ color: 'purple' }}>{place}</span>{' '}
          vacation:
        </h1>
        <h2>{activity}</h2>
        <button onClick={this.setRandomActivity}>What else?</button>
        <button onClick={this.setRandomPlace}>Where else?</button>
      </div>
    );
  }
}

// const initialState = {
//   loading: false,
//   error: false,
//   data: [],
//   activity: '',
//   place: getRandom(Object.keys(placeMap)),
// };

// const [state, dispatch] = useReducer((state, action) => {
//   switch (action.type) {
//     case 'FETCHING':
//       return {
//         ...state,
//         loading: true,
//         error: false,
//       };
//     case 'SUCCESS':
//       return {
//         ...state,
//         loading: false,
//         data: action.data,
//         activity: getRandom(action.data),
//       };
//     case 'ERROR':
//       return {
//         ...state,
//         loading: false,
//         error: true,
//       };
//     case 'NEW_ACTIVITY':
//       return {
//         ...state,
//         activity: getRandom(state.data, state.activity),
//       };
//     case 'NEW_PLACE':
//       return {
//         ...state,
//         place: getRandom(Object.keys(placeMap), state.place),
//       };
//     default:
//       return state;
//   }
// }, initialState);
