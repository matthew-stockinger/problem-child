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
          step="1"
          min="6"
          max="100"
          ref={numberOfProblemsInput}
          required
        />
        <div className="invalid-feedback"></div>
      </label>
    </>
  );
};

export default NumberOfProblems;
