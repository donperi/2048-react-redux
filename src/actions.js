import { moveBoard } from "./reducers/boardReducer";
import BoardUtils from "./lib/BoardUtils";

export default {
  moveBoard: (direction) => (dispatch, getState) => {
    const oldBoard = getState().board;

    dispatch({ type: 'MOVE', direction});

    const newBoard =  getState().board;

    if (!BoardUtils.equals(oldBoard, newBoard)) {
      dispatch({ type: 'FILL' }); 
    }

    const isGameOver =  BoardUtils.isFull(newBoard) &&
                        BoardUtils.equals(newBoard, moveBoard({ board: newBoard }, 'UP')) && 
                        BoardUtils.equals(newBoard, moveBoard({ board: newBoard }, 'RIGHT'));
    
    if (isGameOver) {
      dispatch({ type: 'GAME_OVER' });    
    }
  }
}
