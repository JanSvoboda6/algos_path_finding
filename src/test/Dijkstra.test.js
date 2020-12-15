import { dijkstra } from "../algos/Dijkstra";

const ROWS = 3;
const COLS = 3;

describe("When dijsktra is called then visitedSquares are returned", () => {
  test("dijsktra test", () => {
    let squares = createSquares();
    let startingSquare = squares[2][0];
    let finishSquare = squares[0][2];
    let visitedSquares = dijkstra(squares, startingSquare, finishSquare);
    
    const NUM_OF_SQUARES_MINUS_STARTING_SQUARE = ROWS * COLS - 1;
    expect(visitedSquares.length).toBe(NUM_OF_SQUARES_MINUS_STARTING_SQUARE);
  });
});

function createSquares() {
  let squares = [];
  for (let i = 0; i < ROWS; i++) {
    let squaresInRow = [];
    for (let j = 0; j < COLS; j++) {
      const square = {
        position: { row: i, col: j },
      };
      squaresInRow.push(square);
    }
    squares.push(squaresInRow);
  }
  return squares;
}
