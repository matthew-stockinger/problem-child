import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./operations.css";

// TODO: render colors depending on items present in operations.
const Operations = ({ operations }) => {
  const [hasPlus, hasMinus, hasTimes, hasDivide] = [
    operations.includes("+"),
    operations.includes("-"),
    operations.includes("*"),
    operations.includes("/"),
  ];

  return (
    <div className="card">
      <div className="card-body">
        <div className="row g-0 text-center">
          <div className="col">
            <span
              className={
                "operation-icon text-light" +
                (hasPlus ? " bg-success" : " bg-secondary")
              }
            >
              {String.fromCodePoint(0x0002b)} {/* &plus; */}
            </span>
          </div>
          <div className="col">
            <span
              className={
                "operation-icon text-light" +
                (hasMinus ? " bg-success" : " bg-secondary")
              }
            >
              {String.fromCodePoint(0x2212)} {/* &minus; */}
            </span>
          </div>
          <div className="col">
            <span
              className={
                "operation-icon text-light" +
                (hasTimes ? " bg-success" : " bg-secondary")
              }
            >
              {String.fromCodePoint(0x000d7)} {/* &times; */}
            </span>
          </div>
          <div className="col">
            <span
              className={
                "operation-icon text-light" +
                (hasDivide ? " bg-success" : " bg-secondary")
              }
            >
              {String.fromCodePoint(0x000f7)} {/* &divide; */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Operations;
