import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import Board from './components/Board';
import store from './app.store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <h1 className="App-title">2048 React Redux</h1>
          <Board />
        </div>
      </Provider>
    );
  }
}

export default App;
