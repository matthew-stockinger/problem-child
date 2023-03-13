import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Constraints = ({ operandConstraints, resultConstraints }) => {
  return (
    <>
      <div>
        <label htmlFor="operand1MinInput" className="form-label mt-3 mt-md-0">
          Operand 1 minimum:
          <input
            id="operand1MinInput"
            name="operand1MinInput"
            type="number"
            className="form-control"
            value={operandConstraints.min1}
            step="1"
          />
        </label>
        <label htmlFor="operand1MaxInput" className="form-label">
          Operand 1 maximum:
          <input
            id="operand1MaxInput"
            name="operand1MaxInput"
            type="number"
            className="form-control"
            value={operandConstraints.max1}
            step="1"
          />
        </label>
      </div>
      <div>
        <label htmlFor="operand2MinInput" className="form-label">
          Operand 2 minimum:
          <input
            id="operand2MinInput"
            name="operand2MinInput"
            type="number"
            className="form-control"
            value={operandConstraints.min2}
            step="1"
          />
        </label>
        <label htmlFor="operand2MaxInput" className="form-label">
          Operand 2 maximum:
          <input
            id="operand2MaxInput"
            name="operand2MaxInput"
            type="number"
            className="form-control"
            value={operandConstraints.max2}
            step="1"
          />
        </label>
      </div>
      <div>
        <label htmlFor="resultMinInput" className="form-label">
          Minimum result (optional):
          <input
            id="resultMinInput"
            name="resultMinInput"
            type="number"
            className="form-control"
            value={resultConstraints.min}
            step="1"
          />
        </label>
        <label htmlFor="resultMaxInput" className="form-label">
          Maximum result (optional):
          <input
            id="resultMaxInput"
            name="resultMaxInput"
            type="number"
            className="form-control"
            value={resultConstraints.max}
            step="1"
          />
        </label>
      </div>
    </>
  );
};

export default Constraints;
