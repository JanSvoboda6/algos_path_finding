import React from "react";
import "./Square.css";

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // handleMouseDown = () => {
  //   console.log("working");
  // }

  render() {
    const { isStart, isFinish, isBarrier, isInSearchArea, isOnShortestPath } = this.props;

    let btnClass = isStart
      ? "start"
      : isFinish
      ? "finish"
      : isBarrier
      ? "barrier"
      : "";

    let searchAreaClass = "";
    //TODO: Refactor
    if (btnClass === "") {
      searchAreaClass = isInSearchArea ? "search-area" : "";
    }

    let isOnShortestPathClass = ""; 
    if(isOnShortestPath){
      isOnShortestPathClass = "shortestPath";
    }

    return (
      <button
        className={`square ${btnClass} ${searchAreaClass} ${isOnShortestPathClass}`}
        onClick={() => this.props.handleClickOnSquare(this.props.id)}
        //onMouseDown={ () => this.handleMouseDown()}
      ></button>
    );
  }
}

export default Square;
