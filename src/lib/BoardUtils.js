class BoardUtils {
  static values(array) {
    return array.map((row) => {
      return row.map((cell) => {
        return cell.value    
      })
    })
  }

  static isFull(board) {
    let isFull = true;
    board.forEach((row) => {
      if (!isFull) {
        return;
      }
      row.forEach((cell) => {
        if (cell.value === 0) {
          isFull = false;
        }
      });
    });

    return isFull;
  }

  static equals(board_1, board_2) {
    return JSON.stringify(BoardUtils.values(board_1)) === JSON.stringify(BoardUtils.values(board_2));
  }

  static getRandomPair(max = 4) {
    return [
      Math.floor(Math.random() * max), Math.floor(Math.random() * max)];
  }
}

export default BoardUtils;
