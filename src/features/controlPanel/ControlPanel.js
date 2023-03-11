import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Operations from "./Operations";
import NumberOfProblems from "./NumberOfProblems";
import Constraints from "./Constraints";

const ControlPanel = ({ state }) => {
  return (
    <div className="card">
      <div className="card-header">Problems Setup</div>
      <div className="card-body">
        <div className="d-flex flex-wrap align-items-start">
          <Operations operations={state.operations} />
          <NumberOfProblems numberOfProblems={state.numberOfProblems} />
          <Constraints
            operandConstraints={state.operandConstraints}
            resultConstraints={state.resultConstraints}
          />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
