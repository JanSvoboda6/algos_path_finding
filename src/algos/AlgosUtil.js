export function getNeighboursOf(square, squares) {
    let squarePosition = square.position;
    let neighbours = [];
  
    const ROWS = squares.length;
    const COLS = squares[0].length;
  
    //TODO: Refactor
    if (squarePosition.row + 1 !== ROWS) {
      if (!squares[squarePosition.row + 1][squarePosition.col].isBarrier) {
        neighbours.push(squares[squarePosition.row + 1][squarePosition.col]);
      }
    }
  
    if (squarePosition.row - 1 >= 0) {
      if (!squares[squarePosition.row - 1][squarePosition.col].isBarrier) {
        neighbours.push(squares[squarePosition.row - 1][squarePosition.col]);
      }
    }
  
    if (squarePosition.col + 1 !== COLS) {
      if (!squares[squarePosition.row][squarePosition.col + 1].isBarrier) {
        neighbours.push(squares[squarePosition.row][squarePosition.col + 1]);
      }
    }
  
    if (squarePosition.col - 1 >= 0) {
      if (!squares[squarePosition.row][squarePosition.col - 1].isBarrier) {
        neighbours.push(squares[squarePosition.row][squarePosition.col - 1]);
      }
    }
  
    return neighbours;
  }
  
  export function constructShortestPath(startingSquare, finishSquare) {
    let shortestPath = [];
    let tempSquare = finishSquare;
    if (!finishSquare.previousSquare) {
      return;
    }
    while (tempSquare !== startingSquare) {
      shortestPath.push(tempSquare);
      tempSquare = tempSquare.previousSquare;
    }
    shortestPath.reverse();
    return shortestPath;
  }
  
  export function setInfiniteDistanceFromStart(squares){
    const ROWS = squares.length;
    const COLS = squares[0].length;
    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j < ROWS; j++) {
        if (squares[i][j].isStart) {
          squares[i][j]["distance"] = 0;
        } else {
          squares[i][j]["distance"] = Number.MAX_VALUE;
        }
        squares[i][j]["previousSquare"] = null;
        squares[i][j]["hasBeenVisited"] = false;
      }
    }
  };