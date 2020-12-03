import React from "react";
import Square from "./Square";

const COLS = 10;
const ROWS = 10;

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
      for (let j = 0; j < ROWS; j++) {
        const square = {
          id: { row: i, col: j },
          isStart: false,
          isFinish: false,
          isBarrier: false,
        };
        squaresInRow.push(square);
      }
      squares.push(squaresInRow);
    }
    this.setState({ squares }, this.chooseSquares);
  }

  chooseSquares() {
    const START_ROW = 5;
    const START_COL = 1;

    const FINISH_ROW = 5;
    const FINISH_COL = 8;

    const squares = this.state.squares;

    squares[START_ROW][START_COL] = {
      id: { row: START_ROW, col: START_COL },
      isStart: true,
      isFinish: false,
      isBarrier: false,
    };

    squares[FINISH_ROW][FINISH_COL] = {
      id: { row: FINISH_ROW, col: FINISH_COL },
      isStart: false,
      isFinish: true,
      isBarrier: false,
    };

    this.setState({ squares });
  }

  handleClick = (idOfClickedSquare) => {
    const squares = this.state.squares;

    const oldStartingSquare = this.getStartingSquare();
    const oldFinishSquare = this.getFinishSquare();
    //TODO: Proper refactoring needed
    if (
      idOfClickedSquare !== oldStartingSquare.id &&
      idOfClickedSquare !== oldFinishSquare.id
    ) {
      if (this.props.selectedSquareType === "start") {
        squares[oldStartingSquare.id.row][
          oldStartingSquare.id.col
        ].isStart = false;
      }
      if (this.props.selectedSquareType === "finish") {
        squares[oldFinishSquare.id.row][
          oldFinishSquare.id.col
        ].isFinish = false;
      }

      squares[idOfClickedSquare.row][idOfClickedSquare.col] = {
        id: { row: idOfClickedSquare.row, col: idOfClickedSquare.col },
        isStart: this.props.selectedSquareType === "start" ? true : false,
        isFinish: this.props.selectedSquareType === "finish" ? true : false,
        isBarrier: this.props.selectedSquareType === "barrier" ? true : false,
      };
    }

    this.setState({ squares });
  };

  getStartingSquare = () => {
    //TODO: Refactor
    let startingSquare = {};
    this.state.squares.filter((squaresInRow) => {
      let squareRow = squaresInRow.filter((square) => {
        if (square.isStart === true) {
          startingSquare = square;
        }
      });
    });
    return startingSquare;
  };

  getFinishSquare = () => {
    //TODO: Refactor
    let finishSquare = {};
    this.state.squares.filter((squaresInRow) => {
      let squareRow = squaresInRow.filter((square) => {
        if (square.isFinish === true) {
          finishSquare = square;
        }
      });
    });
    return finishSquare;
  };

  render() {
    const { squares } = this.state;
    return (
      <div className="table">
        {squares.map((row, rowIndex) => {
          return (
            <div key={rowIndex}>
              {row.map((square, squareIndex) => {
                const { isStart, isFinish, isBarrier } = square;
                return (
                  <Square
                    key={squareIndex}
                    id={square.id}
                    isStart={isStart}
                    isFinish={isFinish}
                    isBarrier={isBarrier}
                    handleClick={this.handleClick}
                  ></Square>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Table;
