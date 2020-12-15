export function getNeighboursOf(square, squares) {
    let squarePosition = square.position;
    let neighbours = [];
  
    const ROWS = squares.length;
    const COLS = squares[0].length;
  
    const isCurrentSquareOnBottomBorder = squarePosition.row + 1 === ROWS ? true : false;
    const isCurrentSquareOnTopBorder = squarePosition.row - 1 < 0 ? true : false;
    const isCurrentSquareOnRightBorder = squarePosition.col + 1 === COLS ? true : false;
    const isCurrentSquareOnLeftBorder = squarePosition.col - 1 < 0 ? true : false;

    if (!isCurrentSquareOnBottomBorder) {
      if (!squares[squarePosition.row + 1][squarePosition.col].isBarrier) {
        neighbours.push(squares[squarePosition.row + 1][squarePosition.col]);
      }
    }
  
    if (!isCurrentSquareOnTopBorder) {
      if (!squares[squarePosition.row - 1][squarePosition.col].isBarrier) {
        neighbours.push(squares[squarePosition.row - 1][squarePosition.col]);
      }
    }
  
    if (!isCurrentSquareOnRightBorder) {
      if (!squares[squarePosition.row][squarePosition.col + 1].isBarrier) {
        neighbours.push(squares[squarePosition.row][squarePosition.col + 1]);
      }
    }
  
    if (!isCurrentSquareOnLeftBorder) {
      if (!squares[squarePosition.row][squarePosition.col - 1].isBarrier) {
        neighbours.push(squares[squarePosition.row][squarePosition.col - 1]);
      }
    }
  
    return neighbours;
  }
  
  export function constructShortestPath(startingSquare, finishSquare) {
    let shortestPath = [];
    let tempSquare = finishSquare;

    const isPossibleToConstructPath = finishSquare.previousSquare ? true : false;
    if (!isPossibleToConstructPath) {
      return;
    }

    while (tempSquare !== startingSquare) {
      shortestPath.push(tempSquare);
      tempSquare = tempSquare.previousSquare;
    }  

    shortestPath.push(startingSquare);
    shortestPath.reverse();

    return shortestPath;
  }
  
  export function setInfiniteDistanceFromStart(squares){
    const rows = squares.length;
    const cols = squares[0].length;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (squares[i][j].isStart) {
          squares[i][j]["distance"] = 0;
        } else {
          squares[i][j]["distance"] = Number.MAX_VALUE;
        }
      }
    }
  };