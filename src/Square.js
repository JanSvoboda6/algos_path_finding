import React from "react";
import "./Square.css";

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick() {}

  render() {
    const { isStart, isFinish, isBarrier } = this.props;

    let btnClass = isStart
      ? "start"
      : isFinish
      ? "finish"
      : isBarrier
      ? "barrier"
      : "";

    // if (btnClass === "start"){
    //     console.log("START");
    // }

    return <button className={`square ${btnClass}`} onClick={this.handleClick}></button>;
  }
}

export default Square;
