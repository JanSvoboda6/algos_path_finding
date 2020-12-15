import { getNeighboursOf, constructShortestPath, setInfiniteDistanceFromStart } from "../algos/AlgosUtil";

const ROWS = 3;
const COLS = 3;

describe("When getNeighbours is called then neighbours are returned", () => {
  test("getNeighbours test", () => {
    let squares = createSquares();
    let square = squares[1][1];
    let neighbours = getNeighboursOf(square, squares);

    expect(neighbours[0].position).toStrictEqual({row: 2, col: 1});
    expect(neighbours[1].position).toStrictEqual({row: 0, col: 1});
    expect(neighbours[2].position).toStrictEqual({row: 1, col: 2});
    expect(neighbours[3].position).toStrictEqual({row: 1, col: 0});
  });
});

describe("When constructShortestPath is called then path from start to finish is returned ", () => {
  test("constructShortestPath test", () => {
    let squares = createSquares();
    let startingSquare = squares[1][0];
    let  intermediateSquare = squares[1][1];
    let finishSquare = squares[1][2];

    finishSquare.previousSquare = intermediateSquare;
    intermediateSquare.previousSquare = startingSquare;

    let path = constructShortestPath(startingSquare, finishSquare);

    expect(path.length).toBe(3);

    expect(path[0]).toBe(startingSquare);
    expect(path[1]).toBe(intermediateSquare);
    expect(path[2]).toBe(finishSquare);
  });
});

describe("When setInfiniteDistanceFromStart is called then infinite distance from starting Square is set", () => {
  test("setInfiniteDistanceFromStart test", () => {
    let squares = createSquares();
    squares[1][1].isStart = true;
    let startingSquare =  squares[1][1];

    setInfiniteDistanceFromStart(squares);

    expect(squares[0][0].distance).toBe(Number.MAX_VALUE);
    expect(squares[0][1].distance).toBe(Number.MAX_VALUE);
    expect(squares[0][2].distance).toBe(Number.MAX_VALUE);
    expect(squares[1][0].distance).toBe(Number.MAX_VALUE);
    expect(squares[1][2].distance).toBe(Number.MAX_VALUE);
    expect(squares[2][0].distance).toBe(Number.MAX_VALUE);
    expect(squares[2][1].distance).toBe(Number.MAX_VALUE);
    expect(squares[2][2].distance).toBe(Number.MAX_VALUE);

    expect(startingSquare.distance).toBe(0);
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
