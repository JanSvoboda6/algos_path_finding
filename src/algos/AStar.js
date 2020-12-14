import{setInfiniteDistanceFromStart, getNeighboursOf} from "./AlgosUtil";

export function aStar(squares, startingSquare, finishSquare) {
  const POWER_OF_HEURISTICS = 4;
  let visitedSquares = [];
  setInfiniteDistanceFromStart(squares);
  let priorityQueue = [];
  priorityQueue.push(startingSquare);
  let isFinished = false;
  while (priorityQueue.length && !isFinished) {
    priorityQueue.sort((a, b) => {
      if (a.distance <= b.distance) {
        return -1;
      }
      return 1;
    });
    let currentSquare = priorityQueue[0];
    //TODO: Remove exists?
    priorityQueue.shift();
    let neighbours = getNeighboursOf(currentSquare, squares);
    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];
      let computedDistanceOfNeighbour = currentSquare.distance + 1;
      let heuristics = getDistanceHeuristics(neighbour, finishSquare, POWER_OF_HEURISTICS);
      if (computedDistanceOfNeighbour + heuristics < neighbour.distance) {
        neighbour.distance = computedDistanceOfNeighbour + heuristics;
        neighbour.previousSquare = currentSquare;
      }

      if (neighbour === finishSquare) {
        isFinished = true;
        break;
      }

      if (!neighbour.hasBeenVisited) {
        priorityQueue.push(neighbour);
        neighbour.hasBeenVisited = true;
        visitedSquares.push(neighbour);
      }
      squares[neighbour.position.row][neighbour.position.col] = neighbour;
    }
  }
  return visitedSquares;
}

function getDistanceHeuristics (square, finishSquare, power){
  const squareRow = square.position.row;
  const squareCol = square.position.col;
  const finishRow = finishSquare.position.row;
  const finishCol = finishSquare.position.col;
  return Math.pow(Math.abs(finishRow - squareRow) + Math.abs(finishCol - squareCol), power);
};
