import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Operations from "./Operations";
import NumberOfProblems from "./NumberOfProblems";
import Constraints from "./Constraints";
import Shuffle from "./Shuffle";
import * as Validation from "../validation/validation";

const ControlPanel = ({ state, stateSetters }) => {
  const {
    setOperations,
    setNumberOfProblems,
    setOperandConstraints,
    setResultConstraints,
    setShuffle,
  } = stateSetters;

  const submitToState = (formdata) => {
    // TODO: finish all state submissions.
    const numProbsValue = parseInt(formdata.get("numberOfProblemsInput"));
    setNumberOfProblems(numProbsValue);

    setShuffle(formdata.get("shuffleCheckbox") === "shuffle" ? true : false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formdata = new FormData(form);

    if (Validation.validate(form, formdata)) {
      submitToState(formdata);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit} className="was-validated" noValidate>
          <div className="row justify-content-center">
            <div className="col-md-9 col-lg-3">
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
            <div className="col-md-9 col-lg-5 col-xl-4">
              <Constraints
                operandConstraints={state.operandConstraints}
                resultConstraints={state.resultConstraints}
              />
              <button type="submit" className="btn btn-primary mt-2">
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
