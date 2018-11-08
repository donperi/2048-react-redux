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

          <div className="App-info">
            <strong>How to play:</strong>
            <p>Use the arrow keys or swipe on mobile</p>
            <p>
              <a href="https://github.com/donperi/2048-react-redux">View on Github</a>
            </p>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;
