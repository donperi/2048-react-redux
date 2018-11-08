import React, { useRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import CSSTransition from 'react-transition-group/CSSTransition';

import './BoardCell.scss';

function BoardCell({ rowIndex, cellIndex, data }) {
  const cellRef = useRef();
  const [ cellHeight, setCellHeight ] = useState(null)
  const cell = data.board[rowIndex][cellIndex];
  const animate = useRef(false);

  useEffect(() => {
    animate.current = true;
  }, [cell])

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


  const classes = classNames({
    'merged': cell.merged,
    'new': cell.is_new && cell.value,
  })

  return (
    <CSSTransition 
      in={animate.current} 
      classNames={classes} 
      timeout={300}
      onEntered={() => { animate.current = false; }}
    >
      {(state) => (
        <div 
          ref={cellRef} 
          style={{ height: cellHeight }} 
          className={`BoardCell number-${cell.value}`}
        >
        <span className={`BoardCell-value`}>
          {cell.value !== 0 ? cell.value : null }
        </span>
      </div>
      )}
    </CSSTransition>
  )
}

export default React.memo(BoardCell);
