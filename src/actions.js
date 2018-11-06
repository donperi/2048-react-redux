
export const moveBoard = (direction) => (dispatch, getState) => {
  const oldBoard = getState().board;

  dispatch({ type: 'MOVE', direction});
  
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
}
