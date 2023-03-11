import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./problemsView.css";

const Problem = ({ state }) => {
  // utility functions for generating the Problem
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const evaluateProblem = ({ operand1, operand2, operation }) => {
    switch (operation) {
      case "+":
        return operand1 + operand2;
      case "-":
        return operand1 - operand2;
      case "*":
        return operand1 * operand2;
      case "/":
        return operand1 / operand2;
      default:
        throw new Error("runtime error: invalid operation string.");
    }
  };

  // generate operands according to constraints.
  const [
    resultMin,
    resultMax,
    operand1Min,
    operand1Max,
    operand2Min,
    operand2Max,
    operations,
  ] = [
    state.resultConstraints.min,
    state.resultConstraints.max,
    state.operandConstraints.min1,
    state.operandConstraints.max1,
    state.operandConstraints.min2,
    state.operandConstraints.max2,
    state.operations,
  ];

  do {
    var operand1 = getRandomIntInclusive(operand1Min, operand1Max);
    var operand2 = getRandomIntInclusive(operand2Min, operand2Max);
    var operation = operations[getRandomIntInclusive(0, operations.length - 1)];
    var result = evaluateProblem({
      operand1: operand1,
      operand2: operand2,
      operation: operation,
    });
  } while (
    resultMin &&
    resultMax &&
    (result < resultMin || result > resultMax)
  );

  return (
    <div className="col-md-2">
      <div className="problemBox">
        <p className="h3 text-end">{operand1}</p>
        <p className="h3 text-end">
          {operation} {operand2}
        </p>
        <hr />
      </div>
    </div>
  );
};

const ProblemsRow = ({ state }) => {
  // hard-coded setting: 6 problems per row.
  const problemComponents = Array(6)
    .fill(undefined)
    .map((elt, index) => <Problem key={index} state={state} />);
  return <div className="row my-4">{problemComponents}</div>;
};

const ProblemsView = ({ state }) => {
  const numRows = Math.ceil(state.numberOfProblems / 6);
  const rowComponents = Array(numRows)
    .fill(undefined)
    .map((elt, index) => <ProblemsRow key={index} state={state} />);
  return <div>{rowComponents}</div>;
};

export default ProblemsView;
