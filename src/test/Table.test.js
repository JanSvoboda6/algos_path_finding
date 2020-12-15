import React from "react";
import "@testing-library/jest-dom";
import { getAllByTestId, render } from "@testing-library/react";
import Table from "../Table";

describe("When Squares are passed then Table is properly rendered", () => {
  const ROWS = 2;
  const COLS = 2;
  let squares = createSquares(ROWS, COLS);

  test("rendering Table with Squares", () => {
    const { container } = render(<Table squares={squares} />);
    const squaresFromTable = getAllByTestId(container, "square");
    expect(squaresFromTable.length).toEqual(ROWS * COLS);
  });
});

function createSquares(rows, cols) {
  let squares = [];
  for (let i = 0; i < rows; i++) {
    let squaresInRow = [];
    for (let j = 0; j < cols; j++) {
      const square = {
        position: { row: i, col: j },
      };
      squaresInRow.push(square);
    }
    squares.push(squaresInRow);
  }
  return squares;
}
