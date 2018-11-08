import React, { useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import TweenLite from 'gsap';

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
    window.dispatchEvent(new Event('resize'));

    return () => { 
      window.removeEventListener('resize', handleResize)
    };
  }, [cellHeight])

  useEffect(() => {
    if (cell.merged) {
      TweenLite.to(cellRef.current, 0.3, { transform: 'scale(1)' });
    }
    
    if (cell.is_new) {
      TweenLite.to(cellRef.current, 0.3, { transform: 'scale(1)' });
    }
  });

  const classes = classNames({
    'merged': cell.merged,
    'new': cell.is_new && cell.value,
  })

  return (
    <div 
      key={JSON.stringify(cell)}
      ref={cellRef} 
      style={{ height: cellHeight }} 
      className={`BoardCell number-${cell.value} ${classes}`}
    >
    <span className={`BoardCell-value`}>
      {cell.value !== 0 ? cell.value : null }
    </span>
  </div>
  )
}

export default BoardCell;
