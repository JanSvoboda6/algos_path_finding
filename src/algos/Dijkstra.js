import { setInfiniteDistanceFromStart, getNeighboursOf } from "./AlgosUtil";

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

    let closestSquare = priorityQueue[0];
    priorityQueue.shift();
    let neighbours = getNeighboursOf(closestSquare, squares);

    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i];
      let distanceOfNeighbourFromStart = closestSquare.distance + 1;

      if (distanceOfNeighbourFromStart < neighbour.distance) {
        neighbour.distance = distanceOfNeighbourFromStart;
        neighbour.previousSquare = closestSquare;
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
