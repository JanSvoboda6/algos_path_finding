import React from "react";
import "./styles/Square.css";

class Square extends React.Component {
  
  getMainStylingClass(isStart, isFinish, isBarrier) {
    return isStart ? "start" : isFinish ? "finish" : isBarrier ? "barrier" : "";
  }

  getSearchAreaStylingClass(isInSearchArea, hasMainStylingClass) {
    if (isInSearchArea && !hasMainStylingClass) {
      return "search-area";
    } else {
      return "";
    }
  }

  getOnShortestPathStylingClass(isOnShortestPath, hasMainStylingClass) {
    if (isOnShortestPath && !hasMainStylingClass) {
      return "shortest-path";
    } else {
      return "";
    }
  }

  render() {
    const { isStart, isFinish, isBarrier, isInSearchArea, isOnShortestPath } = this.props;

    const mainStylingClass = this.getMainStylingClass(isStart, isFinish, isBarrier);

    const hasMainStylingClass = mainStylingClass ? true : false;

    const searchAreaClass = this.getSearchAreaStylingClass(isInSearchArea, hasMainStylingClass);

    const shortestPathClass = this.getOnShortestPathStylingClass(isOnShortestPath, hasMainStylingClass);

    return (
      <button
        className={`square ${mainStylingClass} ${searchAreaClass} ${shortestPathClass}`}
        onClick={() => this.props.handleClickOnSquare(this.props.position)}
        data-testid="square"
      ></button>
    );
  }
}

export default Square;
