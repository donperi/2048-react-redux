import React, { useRef, useEffect, useState } from 'react';
import './BoardCell.scss';

function BoardCell({ rowIndex, cellIndex, data }) {

  const cellRef = useRef();
  const [ cellHeight, setCellHeight ] = useState(null)

  const cell = data.board[rowIndex][cellIndex];

  useEffect(() => {
    function handleResize() {
      if (cellRef.current) {
        setCellHeight(`${cellRef.current.offsetWidth}px`);
      }  
    }

    window.addEventListener('resize', handleResize)
  
    return () => { 
      window.removeEventListener('resize', handleResize)
    };
  }, [cellHeight])


  return (
    <div ref={cellRef} style={{ height: cellHeight }} className="BoardCell">
      <span className={`BoardCell-value color-${cell.value}`}>
        {cell.value !== 0 ? cell.value : null }
      </span>
    </div>
  )
}

export default React.memo(BoardCell);
