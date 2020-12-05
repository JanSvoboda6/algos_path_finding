import React from "react";
import "./Square.css";

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  
  handleMouseDown = () => {
    console.log("working");
  }

  render() {
    const { isStart, isFinish, isBarrier, hasBeenVisited, isOnShortestPath } = this.props;

    let btnClass = isStart
      ? "start"
      : isFinish
      ? "finish"
      : isBarrier
      ? "barrier"
      : "";

    let hasBeenVisitedClass = "";
    //TODO: Refactor
    if (btnClass === "") {
      hasBeenVisitedClass = hasBeenVisited ? "visited" : "";
    }
    let isOnShortestPathClass = ""; 
    if(isOnShortestPath){
      isOnShortestPathClass = "shortestPath";
    }

    return (
      <button
        className={`square ${btnClass} ${hasBeenVisitedClass} ${isOnShortestPathClass}`}
        onClick={() => this.props.handleClick(this.props.id)}
        onMouseDown={ () => this.handleMouseDown()}
      ></button>
    );
  }
}

export default Square;
