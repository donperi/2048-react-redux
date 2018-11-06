import { connect } from 'react-redux';
import React from 'react';
import BoardRow from './BoardRow';
import './Board.scss';

class Board extends React.Component {

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyDown);
    this.props.dispatch({ type: 'NEW_GAME'});
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
      this.props.dispatch((dispatch, getState) => {
        const oldBoard = getState().board;

        dispatch({ type: 'MOVE', direction: directions[e.keyCode]});
        
        const newBoard = getState().board;

        if (JSON.stringify(newBoard) === JSON.stringify(oldBoard)) {

          let isFull = true;
          newBoard.forEach((row) => {
            if (!isFull) {
              return;
            }
            row.forEach((value) => {
              if (value === 0) {
                isFull = false;
              }
            });
          });

          if (isFull) {
            dispatch({ type: 'NEW_GAME' });    
          }
        } else {
          dispatch({ type: 'FILL' });  
        }
      });
    }
  }
  
  render() {
    const { board } = this.props;
    return (
      <div className="Board">
        {board.map((row, i) => { 
          return (<BoardRow key={i} row={row} />) 
        })}
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
