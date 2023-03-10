import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./problemsView.css";

const ProblemsView = () => {
  const [problemsArray, setProblemsArray] = useState([
    { operand1: 8, operand2: 7, operation: "+" },
  ]);

  const operations = ["+"];
  const operand1Constraints = {
    min: 0,
    max: 10,
  };
  const operand2Constraints = {
    min: 0,
    max: 10,
  };
  const resultConstraints = {
    min: undefined,
    max: undefined,
  };
  const numberOfProblems = 30;
  const shuffle = false;

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };

  // write map or loop that generates problems from dummy state vars above.
  const allProblems = [];
  for (let probNum = 0; probNum < numberOfProblems; probNum++) {
    allProblems.push({
      operand1: getRandomInt(operand1Constraints.min, operand1Constraints.max),
      operand2: getRandomInt(operand2Constraints.min, operand2Constraints.max),
      operation: operations[getRandomInt(0, operations.length)],
    });
  }
  const numProblems = allProblems.length;
  const numRows = Math.ceil(numProblems / 6);
  let allProblemsJSX = [];
  for (let currRow = 0; currRow < numRows; currRow++) {
    allProblemsJSX.push(
      <div className="row my-4">
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

  return <div className="container">{allProblemsJSX}</div>;
};

export default ProblemsView;
