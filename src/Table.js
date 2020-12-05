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

    const oldStartingSquare = this.getStartingSquare(squares);
    const oldFinishSquare = this.getFinishSquare(squares);
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

  handleSolveClick = (event) => {
    this.solve();
  };

  solve = () => {
    //console.log("START");
    //console.log(this.state.squares);
    console.log(this.state.squares);
    let squares = [...this.state.squares];
    let squaresForAnimation = [];
    this.setInfiniteDistanceFromStart(squares);
    let start = this.getStartingSquare(squares);
    let priorityQueue = [];
    priorityQueue.push(start);
    let isFinished = false;
    while (priorityQueue.length && !isFinished) {
      priorityQueue.sort((a, b) => {
        if (a.distance <= b.distance) {
          return -1;
        }
        return 1;
      });
      let currentSquare = priorityQueue[0];
      //TODO: Remove?
      priorityQueue.shift();
      let neighbours = this.getNeighboursOf(currentSquare, squares);
      for(let i = 0; i < neighbours.length; i++){
        let neighbour = neighbours[i];
        let computedDistanceOfNeighbour = currentSquare.distance + 1;
        
        if (computedDistanceOfNeighbour < neighbour.distance) {
          neighbour.distance = computedDistanceOfNeighbour;
          neighbour.previousSquare = currentSquare;
        }
        
        if (neighbour.isFinish) {
          isFinished = true;
          break;
        }
        
        if (!neighbour.hasBeenVisited) {
          priorityQueue.push(neighbour);
          neighbour.hasBeenVisited = true;
          squaresForAnimation.push(neighbour);
        }
        squares[neighbour.id.row][neighbour.id.col] = neighbour;
      };
    }
    this.animateSolving(squaresForAnimation);
    //TODO Not run when path can not be made
    this.animateShortestPath(this.getFinishSquare(squares), squares);
  };

  animateSolving = (squaresForAnimation) => {
    for(let i = 0; i < squaresForAnimation.length; i++)
    {
        //TODO: Timeout not working properly? Maybe problem with this.state.squares?
        let squares = this.state.squares.slice();
        squares[squaresForAnimation[i].id.row][squaresForAnimation[i].id.col].isVisible = true;
        this.setState({squares});
    }
  }

  animateShortestPath = (finishSquare, squares) => {
    let startingSquare = this.getStartingSquare(squares);
    let tempSquare = finishSquare;
    let path = [];
    while(tempSquare !== startingSquare) {
      path.push(tempSquare);
      tempSquare = tempSquare.previousSquare;
    }
    path.reverse();
    for(let i = 0; i < path.length - 1; i++)
    {
      setTimeout(() => {
        //TODO: Timeout not working properly? Maybe problem with this.state.squares?
        let squares = this.state.squares.slice();
        squares[path[i].id.row][path[i].id.col].isOnShortestPath = true;
        this.setState({squares});
      }, 100 * (i + 1));
    }

    console.log(path);
  }

  setInfiniteDistanceFromStart = (squares) => {
    for (let i = 0; i < COLS; i++) {
      for (let j = 0; j < ROWS; j++) {
        if (squares[i][j].isStart) {
          squares[i][j]["distance"] = 0;
        } else {
          squares[i][j]["distance"] = 999;
        }
        squares[i][j]["previousSquare"] = null;
        squares[i][j]["hasBeenVisited"] = false;
      }
    }
  };

  getNeighboursOf = (square, squares) => {
    let squarePosition = square.id;
    let neighbours = [];

    //TODO: Refactor
    if (squarePosition.row + 1 !== ROWS) {
      if (
        !squares[squarePosition.row + 1][squarePosition.col]
          .isBarrier
      ) {
        neighbours.push(
         squares[squarePosition.row + 1][squarePosition.col]
        );
      }
    }

    if (squarePosition.col + 1 !== COLS) {
      if (
        !squares[squarePosition.row][squarePosition.col + 1]
          .isBarrier
      ) {
        neighbours.push(
          squares[squarePosition.row][squarePosition.col + 1]
        );
      }
    }

    if (squarePosition.row - 1 >= 0) {
      if (
        !squares[squarePosition.row - 1][squarePosition.col]
          .isBarrier
      ) {
        neighbours.push(
          squares[squarePosition.row - 1][squarePosition.col]
        );
      }
    }

    if (squarePosition.col - 1 >= 0) {
      if (
        !squares[squarePosition.row][squarePosition.col - 1]
          .isBarrier
      ) {
        neighbours.push(
          squares[squarePosition.row][squarePosition.col - 1]
        );
      }
    }

    return neighbours;
  };

  render() {
    const { squares } = this.state;
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
                      hasBeenVisited={square.hasBeenVisited}
                      isOnShortestPath={square.isOnShortestPath}
                      handleClick={this.handleClick}
                    ></Square>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div>
          <button className="solve-button" onClick={this.handleSolveClick}>
            Find shortest path{" "}
          </button>
        </div>
      </div>
    );
  }
}

export default Table;
