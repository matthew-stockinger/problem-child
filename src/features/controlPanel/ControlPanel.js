import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Operations from "./Operations";
import NumberOfProblems from "./NumberOfProblems";
import Constraints from "./Constraints";
import Shuffle from "./Shuffle";
import * as Validation from "../validation/validation";

const ControlPanel = ({ state, stateSetters }) => {
  // Operations component is a custom toggle button.
  // Putting this here allows ControlPanel to read the internal state of Operations.
  const [operationsInternalState, setOperationsInternalState] = React.useState([
    ...state.operations,
  ]);
  const {
    setOperations,
    setNumberOfProblems,
    setOperandConstraints,
    setResultConstraints,
    setShuffle,
  } = stateSetters;

  const submitToState = (formdata) => {
    const [
      numProbsValue,
      min1Value,
      max1Value,
      min2Value,
      max2Value,
      resultMinValue,
      resultMaxValue,
    ] = [
      parseInt(formdata.get("numberOfProblemsInput")),
      parseInt(formdata.get("operand1MinInput")),
      parseInt(formdata.get("operand1MaxInput")),
      parseInt(formdata.get("operand2MinInput")),
      parseInt(formdata.get("operand2MaxInput")),
      parseInt(formdata.get("resultMinInput")),
      parseInt(formdata.get("resultMaxInput")),
    ];

    setOperations(operationsInternalState);
    setNumberOfProblems(numProbsValue);
    setShuffle(formdata.get("shuffleCheckbox") === "shuffle" ? true : false);
    setOperandConstraints({
      min1: min1Value,
      max1: max1Value,
      min2: min2Value,
      max2: max2Value,
    });
    setResultConstraints({ min: resultMinValue, max: resultMaxValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formdata = new FormData(form);

    if (Validation.validate(operationsInternalState, form, formdata)) {
      submitToState(formdata);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit} className="was-validated" noValidate>
          <div className="row justify-content-center">
            <div className="col-md-9 col-lg-3">
              <div className="mb-3">
                <Operations
                  operationsInternalState={operationsInternalState}
                  setOperationsInternalState={setOperationsInternalState}
                />
              </div>
              <div className="mb-1">
                <NumberOfProblems numberOfProblems={state.numberOfProblems} />
              </div>
              <div className="mb-3">
                <Shuffle />
              </div>
            </div>
            <div className="col-md-9 col-lg-5 col-xl-4">
              <Constraints
                operandConstraints={state.operandConstraints}
                resultConstraints={state.resultConstraints}
              />
              <button type="submit" className="btn btn-primary mt-2">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ControlPanel;
