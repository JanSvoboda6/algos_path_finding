import React from "react";
import "./PathFinder.css";
import Table from "./Table";

const COLS = 20;
const ROWS = 20;

class PathFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: [],
      selectedSquareType: "start",
      wasSolved: false,
      visitedSquares: [],
      shortestPath: [],
    };
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
          //isInSearchArea: false,
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

  solve = (squares) => {
    let visitedSquares = [];
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
      for (let i = 0; i < neighbours.length; i++) {
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
          visitedSquares.push(neighbour);
        }
        squares[neighbour.id.row][neighbour.id.col] = neighbour;
      }
    }
    //this.animateSolving(squaresForAnimation);
    //TODO Not run when path can not be made
    //this.animateShortestPath(this.getFinishSquare(squares), squares);
    //this.setState({ wasSolved: true });
    return visitedSquares;
  };

  getNeighboursOf = (square, squares) => {
    let squarePosition = square.id;
    let neighbours = [];

    //TODO: Refactor
    if (squarePosition.row + 1 !== ROWS) {
      if (!squares[squarePosition.row + 1][squarePosition.col].isBarrier) {
        neighbours.push(squares[squarePosition.row + 1][squarePosition.col]);
      }
    }

    if (squarePosition.col + 1 !== COLS) {
      if (!squares[squarePosition.row][squarePosition.col + 1].isBarrier) {
        neighbours.push(squares[squarePosition.row][squarePosition.col + 1]);
      }
    }

    if (squarePosition.row - 1 >= 0) {
      if (!squares[squarePosition.row - 1][squarePosition.col].isBarrier) {
        neighbours.push(squares[squarePosition.row - 1][squarePosition.col]);
      }
    }

    if (squarePosition.col - 1 >= 0) {
      if (!squares[squarePosition.row][squarePosition.col - 1].isBarrier) {
        neighbours.push(squares[squarePosition.row][squarePosition.col - 1]);
      }
    }

    return neighbours;
  };

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

  constructShortestPath = (startingSquare, finishSquare) => {
    let shortestPath = [];
    let tempSquare = finishSquare;
    if(!finishSquare.previousSquare){
      return;
    }
    while (tempSquare !== startingSquare) {
      shortestPath.push(tempSquare);
      tempSquare = tempSquare.previousSquare;
    }
    shortestPath.reverse();
    return shortestPath;
  };

  handleSolveClick = () => {
    let squares = this.state.squares;
    const startingSquare = this.getStartingSquare(squares);
    const finishSquare = this.getFinishSquare(squares);
    const visitedSquares = this.solve(squares);
    this.animateSolving(squares, visitedSquares).then(() => {
      const shortestPath = this.constructShortestPath(
        startingSquare,
        finishSquare
      );

      if(shortestPath){
        this.animateShortestPath(squares, shortestPath);
      }
    });

  };


  handleSquareTypeChoice = (event) => {
    this.setState({ selectedSquareType: event.target.value });
  };

  animateSolving = async (squares, visitedSquares) => {
    const DELAY_BETWEEN_SQUARE_ANIMATION = 3;
    return new Promise((resolve) => {
      for (let i = 0; i < visitedSquares.length; i++) {
        let currentSquare = visitedSquares[i];
        setTimeout(() => {
          squares[currentSquare.id.row][
            currentSquare.id.col
          ].isInSearchArea = true;
          this.setState({ squares: squares });
        }, DELAY_BETWEEN_SQUARE_ANIMATION * (i + 1));
        setTimeout(
          resolve,
          DELAY_BETWEEN_SQUARE_ANIMATION * visitedSquares.length
        );
      }
    });
  };

  animateShortestPath = (squares, shortestPath) => {
    const DELAY_BETWEEN_SQUARE_ANIMATION = 100;
    for (let i = 0; i < shortestPath.length - 1; i++) {
      setTimeout(() => {
        let currentSquare = shortestPath[i];
        //TODO: Timeout not working properly? Maybe problem with this.state.squares?
        squares[currentSquare.id.row][
          currentSquare.id.col
        ].isOnShortestPath = true;
        this.setState({ squares });
      }, DELAY_BETWEEN_SQUARE_ANIMATION * (i + 1));
    }
  };

  handleResetClick = () => {
    let squares = this.state.squares;
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        squares[i][j].hasBeenVisited = false;
        squares[i][j].isInSearchArea = false;
        squares[i][j].isOnShortestPath = false;
      }
    }
    this.setState({ squares: squares });
  };

  handleClickOnSquare = (idOfClickedSquare) => {
    let squares = this.state.squares;
    //TODO: ADD start node and finish node from start
    const oldStartingSquare = this.getStartingSquare(squares);
    const oldFinishSquare = this.getFinishSquare(squares);
    //TODO: Proper refactoring needed
    if (
      idOfClickedSquare !== oldStartingSquare.id &&
      idOfClickedSquare !== oldFinishSquare.id
    ) {
      if (this.state.selectedSquareType === "start") {
        squares[oldStartingSquare.id.row][
          oldStartingSquare.id.col
        ].isStart = false;
      }
      if (this.state.selectedSquareType === "finish") {
        squares[oldFinishSquare.id.row][
          oldFinishSquare.id.col
        ].isFinish = false;
      }

      squares[idOfClickedSquare.row][idOfClickedSquare.col] = {
        id: { row: idOfClickedSquare.row, col: idOfClickedSquare.col },
        isStart: this.state.selectedSquareType === "start" ? true : false,
        isFinish: this.state.selectedSquareType === "finish" ? true : false,
        isBarrier: this.state.selectedSquareType === "barrier" ? true : false,
      };
    }
    this.setState({ squares: squares });
  };

  render() {
    const {
      squares,
      selectedSquareType,
      wasSolved,
      squaresForAnimation,
      shortestPath,
    } = this.state;
    return (
      <div className="App">
        <div className="navbar">
          <ul>
            <li>Algo Visualizer</li>
            <li>Shortest Path</li>
          </ul>
        </div>
        <div className="solve-section">
          <div className="select-box">
            <label>Choose type: </label>
            <select className="select" onChange={this.handleSquareTypeChoice}>
              <option value="start">Start</option>
              <option value="finish">Finish</option>
              <option value="barrier">Barrier</option>
            </select>
          </div>
        </div>
        <div>
          <button className="solve-button" onClick={this.handleSolveClick}>
            Find shortest path
          </button>
        </div>
        <div>
          <button onClick={this.handleResetClick}>Reset</button>
        </div>
        <div className="tablePosition">
          <Table
            squares={squares}
            selectedSquareType={selectedSquareType}
            wasSolved={wasSolved}
            squaresForAnimation={squaresForAnimation}
            shortestPath={shortestPath}
            setInSearchAreaPropertyOfSquare={
              this.setInSearchAreaPropertyOfSquare
            }
            handleClickOnSquare={this.handleClickOnSquare}
          />
        </div>
      </div>
    );
  }
}

export default PathFinder;
