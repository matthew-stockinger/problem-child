import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Operations from "./Operations";
import NumberOfProblems from "./NumberOfProblems";
import Constraints from "./Constraints";
import Shuffle from "./Shuffle";

const ControlPanel = ({ state }) => {
  return (
    <div className="card">
      <div className="card-header text-center">Problems Setup</div>
      <div className="card-body">
        <div className="row justify-content-center">
          <div className="col-md-3">
            <Operations operations={state.operations} />
            <div className="mt-2">
              <NumberOfProblems numberOfProblems={state.numberOfProblems} />
            </div>
            <div className="mt-2">
              <Shuffle shuffle={state.shuffle} />
            </div>
          </div>
          <div className="col-md-auto">
            <Constraints
              operandConstraints={state.operandConstraints}
              resultConstraints={state.resultConstraints}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
