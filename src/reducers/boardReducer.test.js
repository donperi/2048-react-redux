import boardReducer, { moveArray, createCell } from "./boardReducer";

function arrayToCell(array) {
  return array.map((value) => {
    return createCell(value)
  });
}

function cellToArray(array) {
  return array.map((cell) => {
    return cell.value
  });
}

describe('Reducer', () => {
  describe('moveArray', () => {
    test.each([
      [[0,2,0,2], [0,0,0,4], false],
      [[0,0,2,2], [4,0,0,0], true],
      [[0,4,2,2], [0,0,4,4], false],
      [[4,4,2,2], [0,0,8,4], false],
      [[4,4,2,2], [8,4,0,0], true],
      [[32,16,8,4], [32,16,8,4], true],
      [[32,16,8,4], [32,16,8,4], false],
      [[0,0,8,8], [16,0,0,0], true],
      [[64,32,32,64], [64,64,64,0], true]
    ])("should move the array elements", (input, output, reverse) => {
        input = arrayToCell(input);

        expect(cellToArray(moveArray(input, reverse))).toEqual(output);
    })
  })

  describe('MOVE', () => {
    test.each([
      [
        [
          [2,2,2,2],
          [2,2,2,2],
          [2,2,2,2],
          [2,2,2,2],
        ],
        [
          [4,4,4,4],
          [4,4,4,4],
          [0,0,0,0],
          [0,0,0,0]
        ],
        "UP",
      ],
      [
        [
          [2,2,2,2],
          [2,2,2,2],
          [2,2,2,2],
          [2,2,2,2],
        ],
        [
          [0,0,0,0],
          [0,0,0,0],
          [4,4,4,4],
          [4,4,4,4]
        ],
        "DOWN"
      ],
      [
        [
          [2,2,2,2],
          [2,2,2,2],
          [2,2,2,2],
          [2,2,2,2],
        ],
        [
          [0,0,4,4],
          [0,0,4,4],
          [0,0,4,4],
          [0,0,4,4]
        ],
        "RIGHT"
      ],
      [
        [
          [2,2,2,2],
          [2,2,2,2],
          [2,2,2,2],
          [2,2,2,2],
        ],
        [
          [4,4,0,0],
          [4,4,0,0],
          [4,4,0,0],
          [4,4,0,0]
        ],
        "LEFT"
      ]
    ])("should move the board dispatching MOVE action", (input, output, direction) => {
      const action = {
        type: 'MOVE',
        direction
      };
      
      const beforeState = {
        board: input.map(row => arrayToCell(row)),
        settings: { gridSize: 4 },
      }

      const final = {
        board: output,
        settings: { gridSize: 4 }
      }

      const afterState = boardReducer(beforeState, action);
      afterState.board = afterState.board.map(row => cellToArray(row));

      const actual = afterState;
      const expected = final;

      expect(actual).toEqual(expected);
    })
    
  })
});
