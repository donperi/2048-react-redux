import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Board from './components/Board';
import store from './app.store';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Board />
      </Provider>
    );
  }
}

export default App;
