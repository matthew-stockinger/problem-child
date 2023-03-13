import React from "react";
import ProblemsView from "./features/problems/ProblemsView";
import ControlPanel from "./features/controlPanel/ControlPanel";

const ProblemChild = () => {
  const [operations, setOperations] = React.useState(["-", "+"]);
  const [numberOfProblems, setNumberOfProblems] = React.useState(18);
  const [operandConstraints, setOperandConstraints] = React.useState({
    min1: 0,
    max1: 10,
    min2: 0,
    max2: 10,
  });
  const [resultConstraints, setResultConstraints] = React.useState({
    min: -5,
    max: 8,
  });
  const [shuffle, setShuffle] = React.useState(false);

  const state = {
    operations,
    numberOfProblems,
    operandConstraints,
    resultConstraints,
    shuffle,
  };

  return (
    <div className="container pt-4">
      <ControlPanel state={state} />
      <ProblemsView state={state} />
      {/* <Instructions /> */}
    </div>
  );
};

// const DATAMODEL = {
//   operations: ["+", "-"], // must be characters +, -, *, or /
//   numberOfProblems: 30,
//   operandConstraints: {
//     min1: 0,
//     max1: 10,
//     min2: 0,
//     max2: 10,
//   },
//   resultConstraints: {
//     min: undefined,
//     max: undefined,
//   },
//   shuffle: false,
//   instructionsVisible: false,
// };

function App() {
  return <ProblemChild />;
}

export default App;
