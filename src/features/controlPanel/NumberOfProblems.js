import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const NumberOfProblems = ({ numberOfProblems }) => {
  const numberOfProblemsInput = React.useRef(null);

  return (
    <>
      <label htmlFor="numberOfProblemsInput" className="form-label">
        Number of Problems:
        <input
          id="numberOfProblemsInput"
          name="numberOfProblemsInput"
          type="number"
          className="form-control"
          defaultValue={numberOfProblems}
          step="6"
          min="6"
          max="60"
          ref={numberOfProblemsInput}
          required
        />
        <div className="valid-feedback">Valid input div</div>
        <div className="invalid-feedback">Invalid input div</div>
      </label>
    </>
  );
};

export default NumberOfProblems;
