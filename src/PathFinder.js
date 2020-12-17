import React from "react";
import "./styles/PathFinder.css";
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
        };
        squaresInRow.push(square);
      }
      squares.push(squaresInRow);
    }
    this.setState({ squares }, this.createStartingTemplate);
  }

  createStartingTemplate() {
    const squares = this.state.squares;
    const START_ROW = 9;
    const START_COL = 5;
    const FINISH_ROW = 9;
    const FINISH_COL = 13;
    const BARRIERS_POSITION = [
      [8, 9],
      [9, 9],
      [10, 9],
    ];

    squares[START_ROW][START_COL] = {
      ...squares[START_ROW][START_COL],
      position: { row: START_ROW, col: START_COL },
      isStart: true,
    };

    squares[FINISH_ROW][FINISH_COL] = {
      ...squares[FINISH_ROW][FINISH_COL],
      position: { row: FINISH_ROW, col: FINISH_COL },
      isFinish: true,
    };

    for (let i = 0; i < BARRIERS_POSITION.length; i++) {
      let row = BARRIERS_POSITION[i][0];
      let col = BARRIERS_POSITION[i][1];
      squares[row][col] = {
        ...squares[BARRIERS_POSITION[i][0]][BARRIERS_POSITION[i][1]],
        isBarrier: true,
      };
    }

    this.setState({ squares });
  }

  getStartingSquare = (squares) => {
    let startingSquare = {};
    outerloop: for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if (squares[i][j].isStart) {
          startingSquare = squares[i][j];
          break outerloop;
        }
      }
    }
    return startingSquare;
  };

  getFinishSquare = (squares) => {
    let finishSquare = {};
    outerloop: for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if (squares[i][j].isFinish) {
          finishSquare = squares[i][j];
          break outerloop;
        }
      }
    }
    return finishSquare;
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
      }
    }
    this.setState({ squares: squares });
  };

  handleSolveClick = () => {
    this.eraseSearchAreaWithShortestPath();
    let squares = this.state.squares;
    let visitedSquares = [];
    const startingSquare = this.getStartingSquare(squares);
    const finishSquare = this.getFinishSquare(squares);

    switch (this.state.algorithmType) {
      case "dijkstra":
        visitedSquares = dijkstra(squares, startingSquare, finishSquare);
        break;
      case "a_star":
        visitedSquares = aStar(squares, startingSquare, finishSquare);
        break;
      default:
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

  handleClickOnSquare = (clickedSquarePosition) => {
    this.eraseSearchAreaWithShortestPath();
    let squares = this.state.squares;
    const oldStartingSquare = this.getStartingSquare(squares);
    const oldFinishSquare = this.getFinishSquare(squares);

    const isClickedSquareStartingSquare = clickedSquarePosition === oldStartingSquare.position;
    const isClickedSquareFinishSquare = clickedSquarePosition === oldFinishSquare.position;

    if (isClickedSquareStartingSquare || isClickedSquareFinishSquare) {
      return;
    }

    let updatedSquare = squares[clickedSquarePosition.row][clickedSquarePosition.col];

    switch (this.state.selectedSquareType) {
      case "start":
        squares[oldStartingSquare.position.row][oldStartingSquare.position.col].isStart = false;
        updatedSquare.isStart = true;
        updatedSquare.isBarrier = false;
        break;
      case "finish":
        squares[oldFinishSquare.position.row][oldFinishSquare.position.col].isFinish = false;
        updatedSquare.isFinish = true;
        updatedSquare.isBarrier = false;
        break;
      case "barrier":
        let isSquareBarrier = squares[clickedSquarePosition.row][clickedSquarePosition.col].isBarrier;
        updatedSquare.isBarrier = !isSquareBarrier;
        break;
      default:
        return;
    }

    this.setState({ squares: squares });
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
      <div className="path-finder">
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
