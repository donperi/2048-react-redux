import React from  'react';
import BoardCell from './BoardCell';
import './BoardRow.scss';

function BoardRow({ rowIndex, data }) {
  return (
    <div className="BoardRow">
      {data.board[rowIndex].map((value, i) => (<BoardCell 
        key={i}  
        rowIndex={rowIndex}
        cellIndex={i} 
        data={data}
      />))}
    </div>
  )
}

export default BoardRow;
