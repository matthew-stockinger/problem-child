import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Operations from "./Operations";
import NumberOfProblems from "./NumberOfProblems";

const ControlPanel = ({ state }) => {
  return (
    <div className="card">
      <div className="card-header">Problems Setup</div>
      <div className="card-body">
        <div className="d-flex flex-wrap align-items-start">
          <Operations operations={state.operations} />
          <NumberOfProblems numberOfProblems={state.numberOfProblems} />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
