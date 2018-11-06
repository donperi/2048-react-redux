import boardReducer, { moveArray } from "./boardReducer";

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
    ])("should move the array elements", (input, output, reverse) => {
        expect(moveArray(input, reverse)).toEqual(output);
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
        board: input,
        settings: { gridSize: 4 }
      }

      const final = {
        board: output,
        settings: { gridSize: 4 }
      }

      const afterState = boardReducer(beforeState, action);

      const actual = afterState;
      const expected = final;

      expect(actual).toEqual(expected);
    })
    
  })
});
