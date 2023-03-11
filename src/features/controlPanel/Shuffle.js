import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Shuffle = ({ shuffle }) => {
  return (
    <div className="card mx-2">
      <div className="card-body">
        <div className="form-check">
          <input
            id="shuffleCheckbox"
            name="shuffleCheckbox"
            type="checkbox"
            className="form-check-input"
            value="shuffle"
            checked={shuffle}
          />
          <label htmlFor="shuffleCheckbox" className="form-check-label">
            Randomize operands?
          </label>
        </div>
      </div>
    </div>
  );
};

export default Shuffle;
