import React from "react";
import Square from "./Square";


class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = { squares: [] };
  }



  getStartingSquare = (squares) => {
    //TODO: Refactor
    let startingSquare = {};
    squares.filter((squaresInRow) => {
      let squareRow = squaresInRow.filter((square) => {
        if (square.isStart === true) {
          startingSquare = square;
        }
      });
    });
    return startingSquare;
  };

  getFinishSquare = (squares) => {
    //TODO: Refactor
    let finishSquare = {};
    squares.filter((squaresInRow) => {
      let squareRow = squaresInRow.filter((square) => {
        if (square.isFinish === true) {
          finishSquare = square;
        }
      });
    });
    return finishSquare;
  };


  render() {
    const { squares } = this.props;
    return (
      <div>
        <div className="table">
          {squares.map((row, rowIndex) => {
            return (
              <div key={rowIndex}>
                {row.map((square, squareIndex) => {
                  return (
                    <Square
                      key={squareIndex}
                      id={square.id}
                      isStart={square.isStart}
                      isFinish={square.isFinish}
                      isBarrier={square.isBarrier}
                      isInSearchArea={square.isInSearchArea}
                      isOnShortestPath={square.isOnShortestPath}
                      handleClickOnSquare={this.props.handleClickOnSquare}
                    ></Square>
                  );
                })}
              </div>
            );
          })}
        </div>  
      </div>
    );
  }
}

export default Table;
