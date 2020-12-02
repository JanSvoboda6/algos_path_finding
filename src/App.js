import React from "react";
import "./App.css";
import Table from "./Table";

function App() {
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
          <select className="select">
            <option value="start">Start</option>
            <option value="end">End</option>
            <option value="border">Border</option>
          </select>
        </div>
      </div>

      <div className="tablePosition">
        <Table />
      </div>
    </div>
  );
}

export default App;
