const initialState = {
  board: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  settings: {
    gridSize: 4
  }
}

export function moveArray(array, reverse) {
  const originalSize = array.length;
  if (reverse) {
    array.reverse()
  }

  array = array.filter((i) => i !== 0);
  let skip = false;

  for (let currentPos = array.length - 1; currentPos >= 0; currentPos--) {
    let value = array[currentPos];
    let next = array[currentPos - 1];
  
    if (value === next && skip === false) {
      array = [
        ...array.slice(0, currentPos-1),
        value + next,
        ...array.slice(currentPos+1),
      ];
      skip = true;
    }  else {
      skip = false;
    }
  }

  if (reverse) {
    array.reverse()
    return [
      ...array,
      ...Array(originalSize - array.length).fill(0)
    ];
  }

  return [
    ...Array(originalSize - array.length).fill(0),
    ...array
  ];
}

function mergeRow(board, index, direction) {
  let row = board[index];

  board[index] = moveArray(row, direction === 'LEFT');
}

function mergeColumn(board, index, direction) {
  let column = board.map((row) => { 
    return row[index] 
  });

  const merged = moveArray(column, direction === 'UP');

  board.forEach((_, i) => {
    board[i][index] = merged[i];
  });
}

export function moveBoard(state, direction) {
  const newBoard = [
    ...state.board
  ]

  Array.from(Array(state.settings.gridSize)).forEach((_, i) => {
    if (['UP', 'DOWN'].indexOf(direction) >= 0) {
      mergeColumn(newBoard, i, direction);
    } else {
      mergeRow(newBoard, i, direction);
    }
  })

  return newBoard;
}

function fillBoard(state) {
  const newBoard = [
    ...state.board
  ]

  const emptyCells = []
  
  Array.from(Array(4)).forEach((_, x) => {
    Array.from(Array(4)).forEach((_, y) => {
      if (newBoard[x][y] === 0) {
        emptyCells.push([x, y]);
      }
    })  
  })

  if (emptyCells.length) {
    const random = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    newBoard[random[0]][random[1]] = [2,4][Math.floor(Math.random() * 2)];
  }

  return newBoard;
}

function getRandomPair(max = 4) {
  return [
    Math.floor(Math.random() * max), Math.floor(Math.random() * max)];
}

function newGame(state) {
  const newBoard = initialState.board;
  
  const random1 = getRandomPair();
  let random2 = random1;

  while (JSON.stringify(random1) === JSON.stringify(random2)) {
    random2 = getRandomPair();
  }

  newBoard[random1[0]][random1[1]] = 2;
  newBoard[random2[0]][random2[1]] = 2;
  
  return newBoard;
} 

export default function (state = initialState, action) {
  if (action.type === 'MOVE') {
    return {
      ...state,
      board: [
        ...moveBoard(state, action.direction)
      ]
    }
  }

  if (action.type === 'FILL') {
    return {
      ...state,
      board: [
        ...fillBoard(state)
      ]
    }
  }

  if (action.type === 'NEW_GAME') {
    return {
      ...state,
      board: [
        ...newGame(state)
      ]
    }
  }

  return state;
}
