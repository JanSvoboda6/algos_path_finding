import React from "react";
import PathFinder from "./PathFinder";

const COLS = 20;
const ROWS = 20;

class App extends React.Component{

  render() {
    return(
    <div>
      <PathFinder></PathFinder>
    </div>
  );
}
}

export default App;
