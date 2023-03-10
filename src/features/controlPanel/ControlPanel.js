import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Operations from "./Operations";

const ControlPanel = (props) => {
  return (
    <div className="card">
      <div className="card-header">Problems Setup</div>
      <div className="card-body">
        <div className="d-flex">
          <Operations state={props.state.operations} />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
