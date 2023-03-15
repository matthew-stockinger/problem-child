import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const NumberOfProblems = ({ numberOfProblems, setNumberOfProblems }) => {
  return (
    <label htmlFor="numberOfProblemsInput" className="form-label">
      Number of Problems: {numberOfProblems}
      <input
        id="numberOfProblemsInput"
        name="numberOfProblemsInput"
        type="range"
        className="form-range"
        value={numberOfProblems}
        step="6"
        min="6"
        max="60"
        required
        onChange={(e) => {
          setNumberOfProblems(parseInt(e.target.value));
        }}
      />
    </label>
  );
};

export default NumberOfProblems;
