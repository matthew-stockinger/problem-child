import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const NumberOfProblems = ({ numberOfProblems }) => {
  return (
    <label htmlFor="numberOfProblemsInput" className="form-label">
      Number of Problems:
      <input
        id="numberOfProblemsInput"
        name="numberOfProblemsInput"
        type="number"
        className="form-control"
        value={numberOfProblems}
        step="6"
        min="6"
        required
      />
    </label>
  );
};

export default NumberOfProblems;
