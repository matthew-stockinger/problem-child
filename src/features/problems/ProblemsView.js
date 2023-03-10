import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./problemsView.css";

const ProblemsView = () => {
  const [problemsArray, setProblemsArray] = useState([
    { operand1: 8, operand2: 7, operation: "+" },
  ]);

  return (
    <div className="container">
      <div className="row my-4">
        <div className="col-2">
          <div className="problemBox">
            <p className="h3 text-end">{problemsArray[0].operand1}</p>
            <p className="h3 text-end">
              {problemsArray[0].operation} {problemsArray[0].operand2}
            </p>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemsView;
