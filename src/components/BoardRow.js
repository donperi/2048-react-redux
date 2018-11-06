import React from  'react';
import BoardCell from './BoardCell';
import './BoardRow.scss';

function BoardRow({ row }) {
  return (
    <div className="BoardRow">
      {row.map((value, i) => (<BoardCell value={value} key={i} />))}
    </div>
  )
}

export default BoardRow;
