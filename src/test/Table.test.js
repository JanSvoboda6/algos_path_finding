import React from "react";
import "@testing-library/jest-dom";
import { getAllByTestId, render } from "@testing-library/react";
import Table from "../Table";

describe("When Squares are passed then Table is properly rendered", () => {
  const COLS = 2;
  const ROWS = 2;
  let squares = createSquares(COLS, ROWS);

  test("rendering Table with Squares", () => {
    const { container } = render(<Table squares={squares} />);
    const squaresFromTable = getAllByTestId(container, "square");
    expect(squaresFromTable.length).toEqual(COLS * ROWS);
  });
});

function createSquares(cols, rows) {
  let squares = [];
  for (let i = 0; i < cols; i++) {
    let squaresInRow = [];
    for (let j = 0; j < rows; j++) {
      const square = {
        id: { row: i, col: j },
      };
      squaresInRow.push(square);
    }
    squares.push(squaresInRow);
  }
  return squares;
}
