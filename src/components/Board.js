import { connect } from 'react-redux';
import React from 'react';
import BoardRow from './BoardRow';
import { moveBoard } from '../actions';
import './Board.scss';

class Board extends React.Component {

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyDown);
    this.createNewGame();
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    const directions = {
      37: 'LEFT',
      38: 'UP',
      39: 'RIGHT',
      40: 'DOWN'
    }

    if (directions[e.keyCode]) {
      this.props.dispatch(moveBoard(directions[e.keyCode]));
    }
  }

  createNewGame = () => {
    this.props.dispatch({ type: 'NEW_GAME'});
  }
  
  render() {
    const { board } = this.props;
    return (
      <div className="Board">
        {board.map((row, i) => { 
          return (<BoardRow key={i} row={row} />) 
        })}

        <div>
          <button onClick={this.createNewGame}>New Game</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state
  };
}

export default connect(mapStateToProps)(Board);
