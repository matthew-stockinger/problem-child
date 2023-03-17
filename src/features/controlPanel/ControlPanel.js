import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Operations from "./Operations";
import NumberOfProblems from "./NumberOfProblems";
import Constraints from "./Constraints";
import Shuffle from "./Shuffle";

const ControlPanel = ({ state, stateSetters }) => {
  const {
    setOperations,
    setNumberOfProblems,
    setOperandConstraints,
    setResultConstraints,
    setShuffle,
  } = stateSetters;
  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    setNumberOfProblems(parseInt(formdata.get("numberOfProblemsInput")));
    setShuffle(formdata.get("shuffleCheckbox") === "shuffle" ? true : false);

    // TODO: update Constraints to be uncontrolled inputs.
    // TODO: add setter calls for Constraints.

    // for (const key of formdata.keys()) {
    //   console.log(key);
    // }
    // for (const value of formdata.values()) {
    //   console.log(typeof value);
    // }
  };

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row justify-content-center">
            <div className="col-md-3">
              <div className="mb-3">
                <Operations
                  operations={state.operations}
                  setOperations={stateSetters.setOperations}
                />
              </div>
              <div className="mb-1">
                <NumberOfProblems numberOfProblems={state.numberOfProblems} />
              </div>
              <div className="mb-3">
                <Shuffle />
              </div>
            </div>
            <div className="col-md-auto">
              <Constraints
                operandConstraints={state.operandConstraints}
                resultConstraints={state.resultConstraints}
              />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ControlPanel;
