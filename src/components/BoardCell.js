import React from 'react';

import './BoardCell.scss';

function BoardCell({ rowIndex, cellIndex, data }) {
  const cell = data.board[rowIndex][cellIndex];
  let prevCell = null;
  
  if (data.prev_board) {
    prevCell = data.prev_board[rowIndex][cellIndex];
  }

  if (prevCell) {
    console.log(prevCell);
  }

  return (
    <div className="BoardCell">
      <span className={`BoardCell-value color-${cell.value}`}>
        {cell.value !== 0 ? cell.value : null }
      </span>
    </div>
  )
}

export default BoardCell;
