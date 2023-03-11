import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const NumberOfProblems = ({ numberOfProblems }) => {
  return (
    <div className="card mx-2">
      <div className="card-body">
        <label htmlFor="numberOfProblemsInput" className="form-label">
          Number of Problems:
          <input
            id="numberOfProblemsInput"
            name="numberOfProblemsInput"
            type="number"
            className="form-control"
            style={{ width: "9rem" }}
            value={numberOfProblems}
            step="6"
            min="6"
            required
          />
        </label>
      </div>
    </div>
  );
};

export default NumberOfProblems;
