import React from "react";
import ProblemsView from "./features/problems/ProblemsView";
import ControlPanel from "./features/controlPanel/ControlPanel";
import "./App.css";

const ProblemChild = () => {
  const [operations, setOperations] = React.useState(["+"]);
  const [numberOfProblems, setNumberOfProblems] = React.useState(24);
  const [operandConstraints, setOperandConstraints] = React.useState({
    min1: 10,
    max1: 19,
    min2: 0,
    max2: 9,
  });
  const [resultConstraints, setResultConstraints] = React.useState({
    min: undefined,
    max: undefined,
  });
  const [shuffle, setShuffle] = React.useState(false);

  const state = {
    operations,
    numberOfProblems,
    operandConstraints,
    resultConstraints,
    shuffle,
  };

  const stateSetters = {
    setOperations,
    setNumberOfProblems,
    setOperandConstraints,
    setResultConstraints,
    setShuffle,
  };

  return (
    <div className="container pt-4">
      <div className="print-hide">
        <ControlPanel state={state} stateSetters={stateSetters} />
      </div>
      <div className="query-container">
        <ProblemsView state={state} />
      </div>
      {/* <Instructions /> */}
    </div>
  );
};

function App() {
  return <ProblemChild />;
}

export default App;
