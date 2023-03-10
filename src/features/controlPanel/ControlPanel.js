import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Operations from "./Operations";

const ControlPanel = () => {
  return (
    <div className="card">
      <div className="card-header">Problems Setup</div>
      <div className="card-body">
        <div className="d-flex">
          <Operations />
          <Operations />
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
