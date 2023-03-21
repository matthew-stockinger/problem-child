import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Constraints = ({ operandConstraints, resultConstraints }) => {
  return (
    <fieldset>
      <div className="row g-3">
        <div className="col">
          <label htmlFor="operand1MinInput" className="form-label">
            Operand 1 minimum:
            <input
              id="operand1MinInput"
              name="operand1MinInput"
              type="number"
              className="form-control"
              defaultValue={operandConstraints.min1}
              step="1"
              required
            />
            <p className="invalid-feedback"></p>
          </label>
        </div>
        <div className="col">
          <label htmlFor="operand1MaxInput" className="form-label">
            Operand 1 maximum:
            <input
              id="operand1MaxInput"
              name="operand1MaxInput"
              type="number"
              className="form-control"
              defaultValue={operandConstraints.max1}
              step="1"
              required
            />
            <p className="invalid-feedback"></p>
          </label>
        </div>
      </div>
      <div className="row g-3">
        <div className="col">
          <label htmlFor="operand2MinInput" className="form-label">
            Operand 2 minimum:
            <input
              id="operand2MinInput"
              name="operand2MinInput"
              type="number"
              className="form-control"
              defaultValue={operandConstraints.min2}
              step="1"
              required
            />
            <p className="invalid-feedback"></p>
          </label>
        </div>
        <div className="col">
          <label htmlFor="operand2MaxInput" className="form-label">
            Operand 2 maximum:
            <input
              id="operand2MaxInput"
              name="operand2MaxInput"
              type="number"
              className="form-control"
              defaultValue={operandConstraints.max2}
              step="1"
              required
            />
            <p className="invalid-feedback"></p>
          </label>
        </div>
      </div>
      <div className="row g-3">
        <div className="col">
          <label htmlFor="resultMinInput" className="form-label">
            Minimum result (optional):
            <input
              id="resultMinInput"
              name="resultMinInput"
              type="number"
              className="form-control"
              defaultValue={resultConstraints.min}
              step="1"
            />
            <p className="invalid-feedback"></p>
          </label>
        </div>
        <div className="col">
          <label htmlFor="resultMaxInput" className="form-label">
            Maximum result (optional):
            <input
              id="resultMaxInput"
              name="resultMaxInput"
              type="number"
              className="form-control"
              defaultValue={resultConstraints.max}
              step="1"
            />
            <p className="invalid-feedback"></p>
          </label>
        </div>
      </div>
    </fieldset>
  );
};

export default Constraints;
