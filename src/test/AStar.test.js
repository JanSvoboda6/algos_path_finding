import { getDistanceHeuristics } from "../algos/AStar";

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
