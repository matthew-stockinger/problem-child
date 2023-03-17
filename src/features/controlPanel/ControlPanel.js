import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Operations from "./Operations";
import NumberOfProblems from "./NumberOfProblems";
import Constraints from "./Constraints";
import Shuffle from "./Shuffle";

const ControlPanel = ({ state, stateSetters }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="row justify-content-center">
          <div className="col-md-3">
            <Operations
              operations={state.operations}
              setOperations={stateSetters.setOperations}
            />
            <div className="mt-2">
              <NumberOfProblems
                numberOfProblems={state.numberOfProblems}
                setNumberOfProblems={stateSetters.setNumberOfProblems}
              />
            </div>
            <div className="mt-2">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
