import React from "react";
import "./PathFinder.css";
import Table from "./Table";
import { dijkstra } from "./algos/Dijkstra";
import { aStar } from "./algos/AStar";
import { constructShortestPath } from "./algos/AlgosUtil";

const ROWS = 19;
const COLS = 19;

class PathFinder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: [],
      selectedSquareType: "start",
      wasSolved: false,
      visitedSquares: [],
      shortestPath: [],
      algorithmType: "dijkstra",
    };
  }

  componentDidMount() {
    this.createSquares();
  }

  createSquares() {
    let squares = [];
    for (let i = 0; i < ROWS; i++) {
      let squaresInRow = [];
      for (let j = 0; j < COLS; j++) {
        const square = {
          position: { row: i, col: j },
          isStart: false,
          isFinish: false,
          isBarrier: false,
          //isInSearchArea: false,
        };
        squaresInRow.push(square);
      }
      squares.push(squaresInRow);
    }
    this.setState({ squares }, this.createStartingTemplate);
  }

  createStartingTemplate() {
    const START_ROW = 9;
    const START_COL = 5;

    const FINISH_ROW = 9;
    const FINISH_COL = 13;

    const BARRIERS_POSITION = [
      [8, 9],
      [9, 9],
      [10, 9],
    ];

    const squares = this.state.squares;

    squares[START_ROW][START_COL] = {
      position: { row: START_ROW, col: START_COL },
      isStart: true,
      isFinish: false,
      isBarrier: false,
    };

    squares[FINISH_ROW][FINISH_COL] = {
      position: { row: FINISH_ROW, col: FINISH_COL },
      isStart: false,
      isFinish: true,
      isBarrier: false,
    };

    squares[FINISH_ROW][FINISH_COL] = {
      position: { row: FINISH_ROW, col: FINISH_COL },
      isStart: false,
      isFinish: true,
      isBarrier: false,
    };

    for (let i = 0; i < BARRIERS_POSITION.length; i++) {
      let row = BARRIERS_POSITION[i][0];
      let col = BARRIERS_POSITION[i][1];
      squares[row][col] = {
        position: { row: BARRIERS_POSITION[i][0], col: BARRIERS_POSITION[i][1] },
        isStart: false,
        isFinish: false,
        isBarrier: true,
      };
    }

    this.setState({ squares });
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

  handleSolveClick = () => {
    this.eraseSearchAreaWithShortestPath();
    let squares = this.state.squares;
    let visitedSquares = [];
    const startingSquare = this.getStartingSquare(squares);
    const finishSquare = this.getFinishSquare(squares);

    if (this.state.algorithmType === "dijkstra") {
      visitedSquares = dijkstra(squares, startingSquare, finishSquare);
    } else if (this.state.algorithmType === "a_star") {
      visitedSquares = aStar(squares, startingSquare, finishSquare);
    } else {
      alert("No algorithm has been chosen!");
      return;
    }

    this.animateSolving(squares, visitedSquares).then(() => {
      const shortestPath = constructShortestPath(startingSquare, finishSquare);
      if (shortestPath) {
        this.animateShortestPath(squares, shortestPath);
      }
    });
  };

  animateSolving = async (squares, visitedSquares) => {
    const DELAY_BETWEEN_SQUARE_ANIMATION = 10;
    return new Promise((resolve) => {
      for (let i = 0; i < visitedSquares.length; i++) {
        let currentSquare = visitedSquares[i];
        setTimeout(() => {
          squares[currentSquare.position.row][currentSquare.position.col].isInSearchArea = true;
          this.setState({ squares: squares });
        }, DELAY_BETWEEN_SQUARE_ANIMATION * (i + 1));
        setTimeout(resolve, DELAY_BETWEEN_SQUARE_ANIMATION * visitedSquares.length);
      }
    });
  };

  animateShortestPath = (squares, shortestPath) => {
    const DELAY_BETWEEN_SQUARE_ON_PATH_ANIMATION = 50;
    for (let i = 0; i < shortestPath.length - 1; i++) {
      setTimeout(() => {
        let currentSquare = shortestPath[i];
        //TODO: Timeout not working properly? Maybe problem with this.state.squares?
        squares[currentSquare.position.row][currentSquare.position.col].isOnShortestPath = true;
        this.setState({ squares });
      }, DELAY_BETWEEN_SQUARE_ON_PATH_ANIMATION * (i + 1));
    }
  };

  eraseSearchAreaWithShortestPath = () => {
    let squares = this.state.squares;
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        squares[i][j].hasBeenVisited = false;
        squares[i][j].isInSearchArea = false;
        squares[i][j].isOnShortestPath = false;
        squares[i][j].previousSquare = null;
        squares[i][j].hasBeenVisited = false;
      }
    }
    this.setState({ squares: squares });
  };

  handleClickOnSquare = (positionOfClickedSquare) => {
    let squares = this.state.squares;
    //TODO: ADD start node and finish node from start
    const oldStartingSquare = this.getStartingSquare(squares);
    const oldFinishSquare = this.getFinishSquare(squares);
    //TODO: Proper refactoring needed
    if (
      positionOfClickedSquare !== oldStartingSquare.position &&
      positionOfClickedSquare !== oldFinishSquare.position
    ) {
      if (this.state.selectedSquareType === "start") {
        squares[oldStartingSquare.position.row][oldStartingSquare.position.col].isStart = false;
      }
      if (this.state.selectedSquareType === "finish") {
        squares[oldFinishSquare.position.row][oldFinishSquare.position.col].isFinish = false;
      }

      squares[positionOfClickedSquare.row][positionOfClickedSquare.col] = {
        ...squares[positionOfClickedSquare.row][positionOfClickedSquare.col],
        position: { row: positionOfClickedSquare.row, col: positionOfClickedSquare.col },
        isStart: this.state.selectedSquareType === "start" ? true : false,
        isFinish: this.state.selectedSquareType === "finish" ? true : false,
      };
    }

    if (this.state.selectedSquareType === "barrier") {
      squares[positionOfClickedSquare.row][positionOfClickedSquare.col].isBarrier = !squares[
        positionOfClickedSquare.row
      ][positionOfClickedSquare.col].isBarrier;
    }

    this.setState({ squares: squares });
    this.eraseSearchAreaWithShortestPath();
  };

  handleSquareTypeChoice = (event) => {
    this.setState({ selectedSquareType: event.target.value });
  };

  handleAlgorithmChange = (event) => {
    this.setState({ algorithmType: event.target.value });
    this.eraseSearchAreaWithShortestPath();
  };

  render() {
    const { squares, selectedSquareType, wasSolved, squaresForAnimation, shortestPath } = this.state;
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
            <label>Square: </label>
            <select className="select" onChange={this.handleSquareTypeChoice}>
              <option value="start">Start</option>
              <option value="finish">Finish</option>
              <option value="barrier">Barrier</option>
            </select>
          </div>
          <div className="select-box">
            <label>Algorithm: </label>
            <select className="select" onChange={this.handleAlgorithmChange}>
              <option value="dijkstra">Dijkstra</option>
              <option value="a_star">A*</option>
            </select>
          </div>
          <div>
            <button className="solve-button" onClick={this.handleSolveClick}>
              Find shortest path
            </button>
          </div>
        </div>
        <div className="tablePosition">
          <Table
            squares={squares}
            selectedSquareType={selectedSquareType}
            wasSolved={wasSolved}
            squaresForAnimation={squaresForAnimation}
            shortestPath={shortestPath}
            setInSearchAreaPropertyOfSquare={this.setInSearchAreaPropertyOfSquare}
            handleClickOnSquare={this.handleClickOnSquare}
          />
        </div>
      </div>
    );
  }
}

export default PathFinder;
