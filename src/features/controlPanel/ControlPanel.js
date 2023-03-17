import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Operations from "./Operations";
import NumberOfProblems from "./NumberOfProblems";
import Constraints from "./Constraints";
import Shuffle from "./Shuffle";

const ControlPanel = ({ state, stateSetters }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`form submitted`);
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
                <NumberOfProblems
                  numberOfProblems={state.numberOfProblems}
                  setNumberOfProblems={stateSetters.setNumberOfProblems}
                />
              </div>
              <div className="mb-3">
                <Shuffle
                  shuffle={state.shuffle}
                  setShuffle={stateSetters.setShuffle}
                />
              </div>
            </div>
            <div className="col-md-auto">
              <Constraints
                operandConstraints={state.operandConstraints}
                resultConstraints={state.resultConstraints}
                setOperandConstraints={stateSetters.setOperandConstraints}
                setResultConstraints={stateSetters.setResultConstraints}
                operations={state.operations}
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
