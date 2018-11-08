import Logger from "../Logger";
import cloneDeep from 'lodash/cloneDeep';
import BoardUtils from "../lib/BoardUtils";

export function createCell(value = 0, is_new = true, merged = false, moved_pos = 0) {
  return  {
    value,
    is_new,
    merged,
    moved_pos
  }
}

export const createEmptyBoard = () => [
  [createCell(), createCell(), createCell(), createCell()],
  [createCell(), createCell(), createCell(), createCell()],
  [createCell(), createCell(), createCell(), createCell()],
  [createCell(), createCell(), createCell(), createCell()],
];

const initialState = {
  board: createEmptyBoard(),
  prev_board: createEmptyBoard(),
  game_over: false,
  last_move: null,
  settings: {
    gridSize: 4
  }
}

export function moveArray(array, reverse) {
  let newArray = [...array];
  
  const size = newArray.length;

  if (reverse) {
    newArray.reverse()
  }

  Logger.debug('Initial Array', newArray);

  for (let rootPosition = size -1; rootPosition >= 0; rootPosition--) {
    Logger.debug('Root Position', rootPosition);

    for (let innerPosition = rootPosition; innerPosition <= size - 1; innerPosition++) {
      Logger.debug('Inner Position', rootPosition);

      let current = newArray[innerPosition];
      let next = newArray[innerPosition + 1];

      Logger.debug("Current: ", current);
      Logger.debug("Next: ", next);

      if (next === undefined || current.value === 0) {
        Logger.debug('Breaking');
        break;
      }

      if (next.value === 0 || (next.value === current.value && !current.merged && !next.merged)) {    
        newArray[innerPosition + 1] = createCell(
          newArray[innerPosition].value + newArray[innerPosition + 1].value,
          false,
          newArray[innerPosition].value === newArray[innerPosition + 1].value,
          newArray[innerPosition].moved_pos + 1
        );

        newArray[innerPosition] = createCell();

        Logger.debug('Moved', newArray)
        }
    }
  }

  if (reverse) {
    newArray.reverse()
  }

  return newArray;
}

export function moveBoard(state, direction) {
  const newBoard = cloneDeep(state.board).map((row, x) => {
    return row.map((cell, y) => {
      return createCell(cell.value, false, false);
    });
  });

  Array.from(Array(newBoard.length)).forEach((_, i) => {
    if (['UP', 'DOWN'].indexOf(direction) >= 0) {
      mergeColumn(newBoard, i, direction);
    } else {
      mergeRow(newBoard, i, direction);
    }
  })

  return newBoard;
}

function mergeRow(board, index, direction) {
  let row = board[index];

  board[index] = moveArray(row, direction === 'LEFT');
}

function mergeColumn(board, index, direction) {
  let column = board.map((row) => { 
    return row[index];
  });

  const merged = moveArray(column, direction === 'UP');

  board.forEach((_, i) => {
    board[i][index] = merged[i];
  });
}

function fillBoard(state) {
  const newBoard = cloneDeep(state.board);

  const emptyCells = []
  
  Array.from(Array(4)).forEach((_, x) => {
    Array.from(Array(4)).forEach((_, y) => {
      if (newBoard[x][y].value === 0) {
        emptyCells.push([x, y]);
      }
    })  
  })

  if (emptyCells.length) {
    const random = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    newBoard[random[0]][random[1]] = createCell([2,4][Math.floor(Math.random() * 2)], true);
  }

  return newBoard;
}

function newGame(state) {
  const newBoard = [...createEmptyBoard()];
  
  const random1 = BoardUtils.getRandomPair(newBoard.length);
  let random2 = random1;

  while (JSON.stringify(random1) === JSON.stringify(random2)) {
    random2 = BoardUtils.getRandomPair(newBoard.length);
  }

  newBoard[random1[0]][random1[1]] = createCell(2, true);
  newBoard[random2[0]][random2[1]] = createCell(2, true);
  
  return newBoard;
}

export default function (state = initialState, action) {
  if (action.type === 'MOVE') {
    return {
      ...state,
      moving: false,
      last_move: action.direction,
      prev_board: [
        ...state.board
      ],
      board: [
        ...moveBoard(state, action.direction)
      ]
    }
  }

  if (action.type === 'FILL') {
    return {
      ...state,
      prev_board: [
        ...state.board
      ],
      board: [
        ...fillBoard(state)
      ]
    }
  }

  if (action.type === 'NEW_GAME') {
    return {
      ...state,
      last_move: null,
      game_over: false,
      prev_board: createEmptyBoard(),
      board: [
        ...newGame(state)
      ]
    }
  }

  if (action.type === 'GAME_OVER') {
    return {
      ...state,
      game_over: true,
    }
  }

  return { ...state };
}
