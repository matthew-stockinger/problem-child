import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./operations.css";

const Operations = ({
  operationsInternalState,
  setOperationsInternalState,
}) => {
  const handleClick = (event) => {
    const operationName = event.target.id;
    const operationNameToChar = {
      plus: "+",
      minus: "-",
      times: "*",
      divide: "/",
    };
    const operationChar = operationNameToChar[operationName];

    if (operationsInternalState.includes(operationChar)) {
      // remove
      setOperationsInternalState(() =>
        operationsInternalState.filter((char) => char !== operationChar)
      );
    } else {
      // add
      setOperationsInternalState(() => [
        ...operationsInternalState,
        operationChar,
      ]);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <fieldset>
          <div className="row g-0 text-center">
            <div className="col">
              <button
                type="button"
                id="plus"
                className={
                  "operation-icon btn" +
                  (operationsInternalState.includes("+")
                    ? " btn-success"
                    : " btn-secondary")
                }
                onClick={handleClick}
              >
                {String.fromCodePoint(0x0002b)} {/* &plus; */}
              </button>
            </div>
            <div className="col">
              <button
                type="button"
                id="minus"
                className={
                  "operation-icon btn" +
                  (operationsInternalState.includes("-")
                    ? " btn-success"
                    : " btn-secondary")
                }
                onClick={handleClick}
              >
                {String.fromCodePoint(0x2212)} {/* &minus; */}
              </button>
            </div>
            <div className="col">
              <button
                type="button"
                id="times"
                className={
                  "operation-icon btn" +
                  (operationsInternalState.includes("*")
                    ? " btn-success"
                    : " btn-secondary")
                }
                onClick={handleClick}
              >
                {String.fromCodePoint(0x000d7)} {/* &times; */}
              </button>
            </div>
            <div className="col">
              <button
                type="button"
                id="divide"
                className={
                  "operation-icon btn" +
                  (operationsInternalState.includes("/")
                    ? " btn-success"
                    : " btn-secondary")
                }
                onClick={handleClick}
              >
                {String.fromCodePoint(0x000f7)} {/* &divide; */}
              </button>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default Operations;
