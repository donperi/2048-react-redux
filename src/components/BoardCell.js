import React from 'react';

import './BoardCell.scss';

function BoardCell({ value }) {
    return (
        <div className="BoardCell">
            <span className="BoardCell-value">
            {value !== 0 ? value : null }
            </span>
        </div>
    )
}

export default BoardCell
