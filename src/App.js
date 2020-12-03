import React from "react";
import "./App.css";
import Table from "./Table";

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {selectedSquareType: "start"};
  }

  handleSquareTypeChoice = (event) => {
    this.setState({selectedSquareType: event.target.value})
  }

  render() {
  return (
    <div className="App">
      <div className="navbar">
        <ul>
          <li>Algo Visualizer</li>
          <li>Shortest Path</li>
        </ul>
      </div>
      <div className="solve-section">
        <div>
          <button className="solve-button">Find shortest path </button>
        </div>
        <div className="select-box">
          <label>Choose type: </label>
          <select className="select" onChange={this.handleSquareTypeChoice}>
            <option value="start">Start</option>
            <option value="finish">Finish</option>
            <option value="barrier">Barrier</option>
          </select>
        </div>
      </div>

      <div className="tablePosition">
        <Table selectedSquareType={this.state.selectedSquareType}/>
      </div>
    </div>
  );
}
}

export default App;
