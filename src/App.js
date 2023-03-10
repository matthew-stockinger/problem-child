import React from "react";
import ProblemsView from "./features/problems/ProblemsView";

function App() {
  const problemsViewProps = {
    operations: ["+"],
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

  return <ProblemsView state={problemsViewProps} />;
}

export default App;
