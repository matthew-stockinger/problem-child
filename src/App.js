import React from "react";
import ProblemsView from "./features/problems/ProblemsView";
import ControlPanel from "./features/controlPanel/ControlPanel";

function App() {
  const [operations, setOperations] = React.useState(["+"]);
  const stateProps = {
    operations: operations,
    operand1Constraints: {
      min: 0,
      max: 10,
    },
    operand2Constraints: {
      min: 0,
      max: 10,
    },
    resultConstraints: {
      min: undefined,
      max: undefined,
    },
    numberOfProblems: 30,
    shuffle: false,
  };

  return (
    <div className="container pt-4">
      <ControlPanel state={stateProps} />
      <ProblemsView state={stateProps} />
    </div>
  );
}

export default App;
