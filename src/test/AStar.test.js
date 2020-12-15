import { aStar, getDistanceHeuristics } from "../algos/AStar";

const ROWS = 3;
const COLS = 3;

describe("When aStar is called then visitedSquares are returned", () => {
  test("aStar test", () => {
    let squares = createSquares();
    let startingSquare = squares[2][0];
    let finishSquare = squares[0][2];
    let visitedSquares = aStar(squares, startingSquare, finishSquare);
    
    const NUM_OF_SQUARES_MINUS_STARTING_SQUARE = ROWS * COLS - 1;
    expect(visitedSquares.length).toBe(NUM_OF_SQUARES_MINUS_STARTING_SQUARE);
  });
});

describe("When getDistanceHeuristics is called then distance is computed according to power", () => {
  test("getDistanceHeuristics test", () => {
    let currentSquare = {
      position: {
        row: 1,
        col: 1,
      },
    };

    let finishSquare = {
      position: {
        row: 3,
        col: 3,
      },
    };

    const power = 1;
    const heuristicsDistance = getDistanceHeuristics(currentSquare, finishSquare, power);

    const rowDistance = finishSquare.position.row - currentSquare.position.row;
    const colDistance = finishSquare.position.col - currentSquare.position.col;
    const expectedHeuristicsDistance = rowDistance + colDistance;

    expect(heuristicsDistance).toBe(expectedHeuristicsDistance);
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