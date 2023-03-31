import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./problemsView.css";

const Problem = ({ state, printView }) => {
  // utility functions for generating the Problem
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const evaluateProblem = ({ operand1, operand2, operation }) => {
    switch (operation) {
      case "+":
      case "&plus;":
        return operand1 + operand2;
      case "-":
      case "&minus;":
        return operand1 - operand2;
      case "x":
      case "&times;":
      case "*":
        return operand1 * operand2;
      case "/":
      case "&divide;":
        return operand1 / operand2;
      default:
        throw new Error("runtime error: invalid operation string.");
    }
  };

  const operationToStringFromCodePoint = (operation) => {
    switch (operation) {
      case "+":
      case "&plus;":
        return String.fromCodePoint(0x0002b);
      case "-":
      case "&minus;":
        return String.fromCodePoint(0x2212);
      case "x":
      case "&times;":
      case "*":
        return String.fromCodePoint(0x000d7);
      case "/":
      case "&divide;":
        return String.fromCodePoint(0x000f7);
      default:
    }
  };

  // constraints.
  const [
    resultMin,
    resultMax,
    operand1Min,
    operand1Max,
    operand2Min,
    operand2Max,
    operations,
    shuffle,
  ] = [
    state.resultConstraints.min,
    state.resultConstraints.max,
    state.operandConstraints.min1,
    state.operandConstraints.max1,
    state.operandConstraints.min2,
    state.operandConstraints.max2,
    state.operations,
    state.shuffle,
  ];

  // generate operation and operands
  do {
    var operand1 = getRandomIntInclusive(operand1Min, operand1Max);
    var operand2 = getRandomIntInclusive(operand2Min, operand2Max);
    if (shuffle === true && Math.random() < 0.5) {
      [operand1, operand2] = [operand2, operand1];
    }
    var operation = operations[getRandomIntInclusive(0, operations.length - 1)];
    var result = evaluateProblem({
      operand1: operand1,
      operand2: operand2,
      operation: operation,
    });
  } while (
    (resultMin !== undefined && result < resultMin) ||
    (resultMax !== undefined && result > resultMax)
  );

  const operationChar = operationToStringFromCodePoint(operation);

  return (
    <div className={printView ? "col-2" : "col-md-2"}>
      <div className="problemBox">
        <p className="h3 text-end">{operand1}</p>
        <p className="h3 text-end">
          {operationChar} {operand2}
        </p>
        <hr />
      </div>
    </div>
  );
};

const ProblemsRow = ({ state, numberInThisRow, printView }) => {
  const problemIDs = Array(numberInThisRow)
    .fill(undefined)
    .map((elt) => crypto.randomUUID());
  const problemComponents = problemIDs.map((problemID) => (
    <Problem key={problemID} state={state} printView={printView} />
  ));
  return <div className="row my-4">{problemComponents}</div>;
};

const ProblemsView = ({ state }) => {
  // conditionally render Problem components differently for print
  const [printView, setPrintView] = useState(false);

  React.useEffect(() => {
    const handleBeforePrint = () => setPrintView(true);
    const handleAfterPrint = () => setPrintView(false);

    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);
  // end print preview stuff

  const numRows = Math.floor(state.numberOfProblems / 6);
  const numberOfProblemsInLastRow = state.numberOfProblems % 6;
  const rowIDs = Array(numRows)
    .fill(undefined)
    .map((elt) => crypto.randomUUID());
  const rowComponents = rowIDs.map((rowID, index) => (
    <ProblemsRow
      key={rowID}
      state={state}
      numberInThisRow={6}
      printView={printView}
    />
  ));

  return (
    <div id="problems-container">
      {rowComponents}
      <ProblemsRow
        key={crypto.randomUUID()}
        state={state}
        numberInThisRow={numberOfProblemsInLastRow}
        printView={printView}
      />
    </div>
  );
};

export default ProblemsView;
