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

    return <button className={`square ${btnClass}`} onClick={() => this.props.handleClick(this.props.id)}></button>;
  }
}

export default Square;
