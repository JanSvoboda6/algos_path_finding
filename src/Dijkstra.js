import{setInfiniteDistanceFromStart, getNeighboursOf} from "./Util";

export function dijkstra(squares, startingSquare, finishSquare) {
  let visitedSquares = [];
  let priorityQueue = [];
  let isFinished = false;
  setInfiniteDistanceFromStart(squares);
  priorityQueue.push(startingSquare);
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
    let neighbours = getNeighboursOf(currentSquare, squares);
    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];
      let computedDistanceOfNeighbour = currentSquare.distance + 1;

      if (computedDistanceOfNeighbour < neighbour.distance) {
        neighbour.distance = computedDistanceOfNeighbour;
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
