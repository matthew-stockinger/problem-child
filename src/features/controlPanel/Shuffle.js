import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Shuffle = ({ shuffle, setShuffle }) => {
  return (
    <div className="form-check">
      <input
        id="shuffleCheckbox"
        name="shuffleCheckbox"
        type="checkbox"
        className="form-check-input"
        value="shuffle"
        checked={shuffle}
        onChange={() => setShuffle(!shuffle)}
      />
      <label htmlFor="shuffleCheckbox" className="form-check-label">
        Randomize operands?
      </label>
    </div>
  );
};

export default Shuffle;
