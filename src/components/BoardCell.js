import React, { useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import { TweenLite, TimelineLite } from 'gsap';

import './BoardCell.scss';

function BoardCell({ rowIndex, cellIndex, data }) {
  const cellRef = useRef();
  const [ cellHeight, setCellHeight ] = useState(null)
  const cell = data.board[rowIndex][cellIndex];
  const positionProps = {
    "UP": "top",
    "DOWN": "bottom",
    "RIGHT": "right",
    "LEFT": "left"
  }

  useEffect(() => {
    function handleResize() {
      if (cellRef.current) {
        setCellHeight(`${cellRef.current.offsetWidth}`);
      }  
    }

    window.addEventListener('resize', handleResize)
    window.dispatchEvent(new Event('resize'));

    return () => { 
      window.removeEventListener('resize', handleResize)
    };
  }, [cellHeight])

  useEffect(() => {  
    if (cell.is_new) {
      TweenLite.to(cellRef.current, 0.3, { transform: 'scale(1)' });
    }

    if (cell.moved_pos > 0) {
      const timeline = new TimelineLite();



      timeline.add(TweenLite.to(cellRef.current, 0.3, { [positionProps[data.last_move]]: '0px' }));
      
      if (cell.merged) {
        timeline.add(TweenLite.to(cellRef.current, 0.3, { transform: 'scale(1)' }), "-=0.1");
      }
      
      timeline.play();
    }
  });

  let position = null;
  if (cell.moved_pos > 0) {
    position = cellHeight * cell.moved_pos + (cell.moved_pos * 4)
    cellRef.current.style[positionProps[data.last_move]] = `${position}px`
  }

  const classes = classNames({
    'merged': cell.merged,
    'new': cell.is_new && cell.value,
  })

  return (
    <div 
      key={JSON.stringify(cell)}
      ref={cellRef} 
      style={{ height: `${cellHeight}px` }} 
      className={`BoardCell number-${cell.value} ${classes}`}
      data-cell={JSON.stringify(cell)}
    >
    <span className={`BoardCell-value`}>
      {cell.value !== 0 ? cell.value : null }
    </span>
  </div>
  )
}

export default BoardCell;
