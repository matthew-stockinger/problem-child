import React from "react";
import ProblemsView from "./features/problems/ProblemsView";
import ControlPanel from "./features/controlPanel/ControlPanel";

const ProblemChild = ({ state }) => {
  return (
    <div className="container pt-4">
      <ControlPanel state={state} />
      <ProblemsView state={state} />
      {/* <Instructions /> */}
    </div>
  );
};

const DATAMODEL = {
  operations: ["+", "-"],
  numberOfProblems: 30,
  operandConstraints: {
    min1: 0,
    max1: 10,
    min2: 10,
    max2: 20,
  },
  resultConstraints: {
    min: undefined,
    max: undefined,
  },
  shuffle: true,
  instructionsVisible: false,
};

function App() {
  return <ProblemChild state={DATAMODEL} />;
}

export default App;
