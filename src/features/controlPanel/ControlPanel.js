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
    const form = e.target;
    const formdata = new FormData(form);
    const numProbsValue = parseInt(formdata.get("numberOfProblemsInput"));
    const numProbsInputElt = form.querySelector("#numberOfProblemsInput");
    if (numProbsValue < 15) {
      numProbsInputElt.setCustomValidity("custom validity: less than 15");
    } else {
      numProbsInputElt.setCustomValidity("");
      setNumberOfProblems(numProbsValue);
    }

    setShuffle(formdata.get("shuffleCheckbox") === "shuffle" ? true : false);
    // TODO: add setter calls for Constraints.
  };

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit} className="was-validated" noValidate>
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
