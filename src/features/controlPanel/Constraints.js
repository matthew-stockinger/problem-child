import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Constraints = ({
  operandConstraints,
  setOperandConstraints,
  resultConstraints,
  setResultConstraints,
  operations,
}) => {
  // refs to inputs.  Instead of using a form submit, I've chosen to update
  // the app state on blur (when a constraint input loses focus).
  // IOW, I'm using uncontrolled inputs, so that validation and state changes
  // only occur when blur event fires.  Refs handle input updates before blur.
  const operand1MinInput = React.useRef(null);
  const operand1MaxInput = React.useRef(null);
  const operand2MinInput = React.useRef(null);
  const operand2MaxInput = React.useRef(null);
  const resultMinInput = React.useRef(null);
  const resultMaxInput = React.useRef(null);

  // utility functions
  const lowestPossibleResult = () => {
    let lowResult;
    const operand1Array = [];
    for (let i = operandConstraints.min1; i <= operandConstraints.max1; i++) {
      operand1Array.push(i);
    }
    const operand2Array = [];
    for (let i = operandConstraints.min2; i <= operandConstraints.max2; i++) {
      operand2Array.push(i);
    }
    operations.forEach((operation) => {
      operand1Array.forEach((op1Num) => {
        operand2Array.forEach((op2Num) => {
          switch (operation) {
            case "+":
              var currentResult = op1Num + op2Num;
              break;
            case "-":
              var currentResult = op1Num - op2Num;
              break;
            case "*":
              var currentResult = op1Num * op2Num;
              break;
            case "/":
              // ensure that this result is never the lowest possible.
              var currentResult = op2Num === 0 ? Infinity : op1Num / op2Num;
              break;
            default:
              throw new Error("invalid operation");
          }
          lowResult = lowResult
            ? Math.min(lowResult, currentResult)
            : currentResult;
        });
      });
    });
  };

  const highestPossibleResult = () => {
    let highResult;
    const operand1Array = [];
    for (let i = operandConstraints.min1; i <= operandConstraints.max1; i++) {
      operand1Array.push(i);
    }
    const operand2Array = [];
    for (let i = operandConstraints.min2; i <= operandConstraints.max2; i++) {
      operand2Array.push(i);
    }
    operations.forEach((operation) => {
      operand1Array.forEach((op1Num) => {
        operand2Array.forEach((op2Num) => {
          switch (operation) {
            case "+":
              var currentResult = op1Num + op2Num;
              break;
            case "-":
              var currentResult = op1Num - op2Num;
              break;
            case "*":
              var currentResult = op1Num * op2Num;
              break;
            case "/":
              // ensure that this result is never the highest possible.
              var currentResult = op2Num === 0 ? -Infinity : op1Num / op2Num;
              break;
            default:
              throw new Error("invalid operation");
          }
          highResult = highResult
            ? Math.max(highResult, currentResult)
            : currentResult;
        });
      });
    });
  };

  // validation and state updates
  const handleOperand1MinChange = () => {
    const min = parseInt(operand1MinInput.current.value);
    const max = parseInt(operand1MaxInput.current.value);
    if (min > max) {
      alert("Minimum must be less than maximum");
      operand1MinInput.current.value = max;
      operand1MinInput.current.focus();
    } else {
      setOperandConstraints({
        ...operandConstraints,
        min1: min,
      });
    }
  };

  const handleOperand1MaxChange = () => {
    const min = parseInt(operand1MinInput.current.value);
    const max = parseInt(operand1MaxInput.current.value);
    if (min > max) {
      alert("Maximum must be greater than minimum");
      operand1MaxInput.current.value = min;
      operand1MaxInput.current.focus();
    } else {
      setOperandConstraints({
        ...operandConstraints,
        max1: max,
      });
    }
  };

  const handleOperand2MinChange = () => {
    const min = parseInt(operand2MinInput.current.value);
    const max = parseInt(operand2MaxInput.current.value);
    if (min > max) {
      alert("Minimum must be less than maximum");
      operand2MinInput.current.value = max;
      operand2MinInput.current.focus();
    } else {
      setOperandConstraints({
        ...operandConstraints,
        min2: min,
      });
    }
  };

  const handleOperand2MaxChange = () => {
    const min = parseInt(operand2MinInput.current.value);
    const max = parseInt(operand2MaxInput.current.value);
    if (min > max) {
      alert("Maximum must be greater than minimum");
      operand2MaxInput.current.value = min;
      operand2MaxInput.current.focus();
    } else {
      setOperandConstraints({
        ...operandConstraints,
        max2: max,
      });
    }
  };

  const handleResultMinChange = () => {
    const min = parseInt(resultMinInput.current.value); // NaN if input empty
    const max = parseInt(resultMaxInput.current.value);
    if (Number.isNaN(min)) {
      setResultConstraints({
        ...resultConstraints,
        min: undefined,
      });
    } else if (min > max) {
      alert("Minimum must be less than maximum");
      resultMinInput.current.value = "";
      resultMinInput.current.focus();
    } else if (min > highestPossibleResult()) {
      alert(
        "Minimum is too high.  No result possible under current constraints."
      );
      resultMinInput.current.value = "";
      resultMinInput.current.focus();
    } else {
      setResultConstraints({
        ...resultConstraints,
        min: min,
      });
    }
  };

  const handleResultMaxChange = () => {
    const min = parseInt(resultMinInput.current.value); // NaN if input empty
    const max = parseInt(resultMaxInput.current.value);
    if (Number.isNaN(max)) {
      setResultConstraints({
        ...resultConstraints,
        max: undefined,
      });
    } else if (min > max) {
      alert("Maximum must be greater than minimum");
      resultMaxInput.current.value = "";
      resultMaxInput.current.focus();
    } else if (max > highestPossibleResult()) {
      alert(
        "Maximum is too low.  No result possible under current constraints."
      );
      resultMinInput.current.value = "";
      resultMinInput.current.focus();
    } else {
      setResultConstraints({
        ...resultConstraints,
        max: max,
      });
    }
  };

  return (
    <fieldset>
      <div className="row g-3">
        <div className="col">
          <label htmlFor="operand1MinInput" className="form-label">
            Operand 1 minimum:
            <input
              id="operand1MinInput"
              name="operand1MinInput"
              ref={operand1MinInput}
              type="number"
              className="form-control"
              defaultValue={operandConstraints.min1}
              step="1"
              onBlur={handleOperand1MinChange}
              required
            />
          </label>
        </div>
        <div className="col">
          <label htmlFor="operand1MaxInput" className="form-label">
            Operand 1 maximum:
            <input
              id="operand1MaxInput"
              name="operand1MaxInput"
              ref={operand1MaxInput}
              type="number"
              className="form-control"
              defaultValue={operandConstraints.max1}
              step="1"
              onBlur={handleOperand1MaxChange}
              required
            />
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
              ref={operand2MinInput}
              type="number"
              className="form-control"
              defaultValue={operandConstraints.min2}
              step="1"
              onBlur={handleOperand2MinChange}
              required
            />
          </label>
        </div>
        <div className="col">
          <label htmlFor="operand2MaxInput" className="form-label">
            Operand 2 maximum:
            <input
              id="operand2MaxInput"
              name="operand2MaxInput"
              ref={operand2MaxInput}
              type="number"
              className="form-control"
              defaultValue={operandConstraints.max2}
              step="1"
              onBlur={handleOperand2MaxChange}
              required
            />
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
              ref={resultMinInput}
              type="number"
              className="form-control"
              defaultValue={resultConstraints.min}
              step="1"
              onBlur={handleResultMinChange}
            />
          </label>
        </div>
        <div className="col">
          <label htmlFor="resultMaxInput" className="form-label">
            Maximum result (optional):
            <input
              id="resultMaxInput"
              name="resultMaxInput"
              ref={resultMaxInput}
              type="number"
              className="form-control"
              defaultValue={resultConstraints.max}
              step="1"
              onBlur={handleResultMaxChange}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
};

export default Constraints;
