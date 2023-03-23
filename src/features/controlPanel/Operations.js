import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./operations.css";

const Operations = ({ operations }) => {
  const [operationsInternalState, setOperationsInternalState] = React.useState({
    hasPlus: operations.includes("+"),
    hasMinus: operations.includes("-"),
    hasTimes: operations.includes("*"),
    hasDivide: operations.includes("/"),
  });

  const handleClick = (event) => {
    // identify which operation icon was clicked.
    const stateKey = "has" + event.target.id;
    // toggle the corresponding local state value.
    setOperationsInternalState(() => ({
      ...operationsInternalState,
      [stateKey]: !operationsInternalState[stateKey],
    }));
  };

  return (
    <div className="card">
      <div className="card-body">
        <fieldset>
          <div className="row g-0 text-center">
            <div className="col">
              <span
                id="Plus"
                className={
                  "operation-icon text-light" +
                  (operationsInternalState.hasPlus
                    ? " bg-success"
                    : " bg-secondary")
                }
                onClick={handleClick}
              >
                {String.fromCodePoint(0x0002b)} {/* &plus; */}
              </span>
            </div>
            <div className="col">
              <span
                id="Minus"
                className={
                  "operation-icon text-light" +
                  (operationsInternalState.hasMinus
                    ? " bg-success"
                    : " bg-secondary")
                }
                onClick={handleClick}
              >
                {String.fromCodePoint(0x2212)} {/* &minus; */}
              </span>
            </div>
            <div className="col">
              <span
                id="Times"
                className={
                  "operation-icon text-light" +
                  (operationsInternalState.hasTimes
                    ? " bg-success"
                    : " bg-secondary")
                }
                onClick={handleClick}
              >
                {String.fromCodePoint(0x000d7)} {/* &times; */}
              </span>
            </div>
            <div className="col">
              <span
                id="Divide"
                className={
                  "operation-icon text-light" +
                  (operationsInternalState.hasDivide
                    ? " bg-success"
                    : " bg-secondary")
                }
                onClick={handleClick}
              >
                {String.fromCodePoint(0x000f7)} {/* &divide; */}
              </span>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default Operations;
