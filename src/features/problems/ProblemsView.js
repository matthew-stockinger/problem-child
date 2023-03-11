import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./problemsView.css";

// restructure this to have a <Problem /> child component.
// use the {children} thing to achieve this.

const ProblemsView = ({ state }) => {
  const {
    operations,
    operandConstraints,
    resultConstraints,
    numberOfProblems,
    shuffle,
  } = state;

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };

  // generate array of problem objects
  const allProblems = [];
  for (let probNum = 0; probNum < numberOfProblems; probNum++) {
    allProblems.push({
      operand1: getRandomInt(operandConstraints.min1, operandConstraints.max1),
      operand2: getRandomInt(operandConstraints.min2, operandConstraints.max2),
      operation: operations[getRandomInt(0, operations.length)],
    });
  }

  // generate JSX from allProblems array.
  const numProblems = allProblems.length;
  const numRows = Math.ceil(numProblems / 6);
  let allProblemsJSX = [];
  for (let currRow = 0; currRow < numRows; currRow++) {
    allProblemsJSX.push(
      <div className="row my-4" key={Math.random()}>
        {allProblems.slice(currRow * 6, currRow * 6 + 6).map((problem) => {
          return (
            <div className="col-2" key={Math.random()}>
              <div className="problemBox">
                <p className="h3 text-end">{problem.operand1}</p>
                <p className="h3 text-end">
                  {problem.operation} {problem.operand2}
                </p>
                <hr />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return <div>{allProblemsJSX}</div>;
};

export default ProblemsView;
