import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ProblemsView = () => {
  const [problemsArray, setProblemsArray] = useState([
    { operand1: 8, operand2: 7, operation: "+" },
  ]);

  return (
    <div className="container">
      <div className="row">
        <div className="col"></div>
        <div className="col">{problemsArray[0].operand1}</div>
      </div>
      <div className="row">
        <div className="col">{problemsArray[0].operation}</div>
        <div className="col">{problemsArray[0].operand2}</div>
      </div>
    </div>
  );
};

export default ProblemsView;
