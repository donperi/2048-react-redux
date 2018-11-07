import { connect } from 'react-redux';
import React from 'react';
import Swipeable from 'react-swipeable';
import BoardRow from './BoardRow';
import actions from '../actions';
import './Board.scss';
class Board extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      prevBoard: props.board,
    }
  }

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

    if (directions[e.keyCode] && !this.props.game_over) {
      this.props.dispatch(actions.moveBoard(directions[e.keyCode]));
    }
  }

  createNewGame = () => {
    this.props.dispatch({ type: 'NEW_GAME'});
  }
  
  render() {
    const { board, game_over } = this.props;

    return (
      <div className="Board">
        {game_over && <div className="Board-game-over">
          <h2>Game Over</h2>
        </div>}

        <Swipeable
          onSwipedUp={() => { this.props.dispatch(actions.moveBoard("UP")); }}
          onSwipedDown={() => { this.props.dispatch(actions.moveBoard("DOWN")); }}
          onSwipedLeft={() => { this.props.dispatch(actions.moveBoard("LEFT")); }}
          onSwipedRight={() => { this.props.dispatch(actions.moveBoard("RIGHT")); }}
        >
          <div className="Board-content">
            {board.map((row, i) => { 
              return (<BoardRow 
                key={i}
                rowIndex={i}
                data={this.props}
              />) 
            })}
          </div>
        </Swipeable>
        
        
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
