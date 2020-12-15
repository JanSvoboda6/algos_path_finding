import{setInfiniteDistanceFromStart, getNeighboursOf} from "./AlgosUtil";

const POWER_OF_HEURISTICS = 4;

export function aStar(squares, startingSquare, finishSquare) {
  setInfiniteDistanceFromStart(squares);
  let visitedSquares = [];
  let priorityQueue = [];
  let isFinished = false;
  priorityQueue.push(startingSquare);

  while (priorityQueue.length && !isFinished) {

    priorityQueue.sort((a, b) => {
      if (a.distance <= b.distance) {
        return -1;
      }
      return 1;
    });

    let currentSquare = priorityQueue[0];
    priorityQueue.shift();
    let neighbours = getNeighboursOf(currentSquare, squares);

    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];
      let distanceOfNeighbourInheritedFromCurrentSquare = currentSquare.distance + 1;
      let heuristics = getDistanceHeuristics(neighbour, finishSquare, POWER_OF_HEURISTICS);

      if (distanceOfNeighbourInheritedFromCurrentSquare + heuristics < neighbour.distance) {
        neighbour.distance = distanceOfNeighbourInheritedFromCurrentSquare + heuristics;
        neighbour.previousSquare = currentSquare;
      }

      if (neighbour === finishSquare) {
        isFinished = true;
        break;
      }

      if (!neighbour.hasBeenVisited) {
        neighbour.hasBeenVisited = true;
        priorityQueue.push(neighbour);
        visitedSquares.push(neighbour);
      }

    }
  }
  return visitedSquares;
}

export function getDistanceHeuristics (square, finishSquare, power){
  const squareRow = square.position.row;
  const squareCol = square.position.col;
  const finishRow = finishSquare.position.row;
  const finishCol = finishSquare.position.col;
  return Math.pow(Math.abs(finishRow - squareRow) + Math.abs(finishCol - squareCol), power);
};
