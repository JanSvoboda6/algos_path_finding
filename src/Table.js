import React from "react";
import Square from "./Square";


class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = { squares: [] };
  }

  render() {
    const { squares } = this.props;
    return (
      <div>
        <div className="table">
          {squares.map((row, rowIndex) => {
            return (
              <div key={rowIndex}>
                {row.map((square, squareIndex) => {
                  return (
                    <Square
                      key={squareIndex}
                      id={square.id}
                      isStart={square.isStart}
                      isFinish={square.isFinish}
                      isBarrier={square.isBarrier}
                      isInSearchArea={square.isInSearchArea}
                      isOnShortestPath={square.isOnShortestPath}
                      handleClickOnSquare={this.props.handleClickOnSquare}
                    ></Square>
                  );
                })}
              </div>
            );
          })}
        </div>  
      </div>
    );
  }
}

export default Table;
