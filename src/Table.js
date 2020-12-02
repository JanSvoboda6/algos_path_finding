import React from "react";
import Square from "./Square";

const COLS = 20;
const ROWS = 20;

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = { squares: [] };
  }

  componentDidMount() {
    this.createSquares();
  }

  createSquares() {
    let squares = [];
    for (let i = 0; i < COLS; i++) {
      let squaresInRow = [];
      for (let i = 0; i < ROWS; i++) {
        const square = {
          isStart: "",
        };
        squaresInRow.push(square);
      }
      squares.push(squaresInRow);
    }
    this.setState({ squares }, this.chooseSquares);
  }

  chooseSquares() {
    const START_ROW = 9;
    const START_COL = 1;

    const FINISH_ROW = 9;
    const FINISH_COL = 18;

    const squares = this.state.squares;
    squares[START_ROW][START_COL] = {isStart: true};
    squares[FINISH_ROW][FINISH_COL] = {isFinish: true};

    this.setState({ squares });

  }

  render() {
    const { squares } = this.state;
    return (
      <div className="table">
        {squares.map((row, rowIndex) => {
          return (
            <div key={rowIndex}>
              {row.map((square, squareIndex) => {
                const { isStart, isFinish } = square;
                return <Square key={squareIndex} isStart={isStart} isFinish={isFinish}></Square>;
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Table;
