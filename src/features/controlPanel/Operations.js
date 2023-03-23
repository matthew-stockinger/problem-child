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
              <button
                id="Plus"
                className={
                  "operation-icon btn" +
                  (operationsInternalState.hasPlus
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
                id="Minus"
                className={
                  "operation-icon btn" +
                  (operationsInternalState.hasMinus
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
                id="Times"
                className={
                  "operation-icon btn" +
                  (operationsInternalState.hasTimes
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
                id="Divide"
                className={
                  "operation-icon btn" +
                  (operationsInternalState.hasDivide
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
