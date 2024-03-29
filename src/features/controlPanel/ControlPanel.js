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

  const submitToState = (formPayload) => {
    setOperations(formPayload.operationsValue);
    setNumberOfProblems(formPayload.numProbsValue);
    setShuffle(formPayload.shuffleValue);
    setOperandConstraints({
      min1: formPayload.min1Value,
      max1: formPayload.max1Value,
      min2: formPayload.min2Value,
      max2: formPayload.max2Value,
    });
    setResultConstraints({
      min: formPayload.resultMinValue,
      max: formPayload.resultMaxValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const formPayload = {
      form: e.target,
      operationsValue: operationsInternalState,
      numProbsValue: parseInt(formdata.get("numberOfProblemsInput")),
      shuffleValue:
        formdata.get("shuffleCheckbox") === "shuffle" ? true : false,
      min1Value: parseInt(formdata.get("operand1MinInput")),
      max1Value: parseInt(formdata.get("operand1MaxInput")),
      min2Value: parseInt(formdata.get("operand2MinInput")),
      max2Value: parseInt(formdata.get("operand2MaxInput")),
      resultMinValue:
        formdata.get("resultMinInput") === ""
          ? undefined
          : parseInt(formdata.get("resultMinInput")),
      resultMaxValue:
        formdata.get("resultMaxInput") === ""
          ? undefined
          : parseInt(formdata.get("resultMaxInput")),
    };

    e.target.classList.add("was-validated");
    if (Validation.validate(formPayload)) {
      submitToState(formPayload);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit} noValidate>
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
