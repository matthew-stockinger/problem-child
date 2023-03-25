export const validate = (formPayload) => {
  const operationsValidity = setOperationsValidity(formPayload);
  const numberOfProblemsValidity = setNumberOfProblemsValidity(formPayload);
  const constraintsValidity = setConstraintsValidity(formPayload);
  return operationsValidity && numberOfProblemsValidity && constraintsValidity;
};

const setOperationsValidity = ({ form, operationsValue }) => {
  const operationsInputElt = form.querySelector("#operationsInput");
  if (operationsValue.length <= 0) {
    setValidityStateAndMessage(
      operationsInputElt,
      "Please select one or more operations."
    );
    return false;
  } else {
    setValidityStateAndMessage(operationsInputElt, "");
    return true;
  }
};

// number of problems must be between 6 and 100.
// setCustomValidity of input element and display invalid feedback if needed.
// return {bool} - did number of problems validate?
const setNumberOfProblemsValidity = ({ form, numProbsValue }) => {
  const numProbsInputElt = form.querySelector("#numberOfProblemsInput");

  if (numProbsValue < 6) {
    return setValidityStateAndMessage(
      numProbsInputElt,
      "Number of problems must be at least 6."
    );
  } else if (numProbsValue > 100) {
    return setValidityStateAndMessage(
      numProbsInputElt,
      "Number of problems must be less than or equal to 100."
    );
  } else if (numProbsInputElt.validity.stepMismatch) {
    return setValidityStateAndMessage(
      numProbsInputElt,
      "Please enter a whole-number value."
    );
  } else {
    return setValidityStateAndMessage(numProbsInputElt, "");
  }
};

// check operand constraints and result constraints.
// return {bool} - did all constraints validate?
const setConstraintsValidity = (formPayload) => {
  const operandValidity = setOperandConstraintsValidity(formPayload);
  const resultValidity = setResultConstraintsValidity(formPayload);

  return operandValidity && resultValidity;
};

// operand mins must be less than max.
// if not, setCustomValidity and display error feedback.
// return {bool} - did the operand constraints validate?
const setOperandConstraintsValidity = (formPayload) => {
  const min1InputElt = formPayload.form.querySelector("#operand1MinInput");
  const max1InputElt = formPayload.form.querySelector("#operand1MaxInput");
  const min2InputElt = formPayload.form.querySelector("#operand2MinInput");
  const max2InputElt = formPayload.form.querySelector("#operand2MaxInput");

  setValidityStateAndMessage(min1InputElt, "");
  setValidityStateAndMessage(max1InputElt, "");
  setValidityStateAndMessage(min2InputElt, "");
  setValidityStateAndMessage(max2InputElt, "");

  if (formPayload.min1Value > formPayload.max1Value) {
    setValidityStateAndMessage(
      min1InputElt,
      "Minimum must be less than or equal to maximum."
    );
    setValidityStateAndMessage(
      max1InputElt,
      "Minimum must be less than or equal to maximum."
    );
  }

  if (formPayload.min2Value > formPayload.max2Value) {
    setValidityStateAndMessage(
      min2InputElt,
      "Minimum must be less than or equal to maximum."
    );
    setValidityStateAndMessage(
      max2InputElt,
      "Minimum must be less than or equal to maximum."
    );
  }

  if (min1InputElt.validity.stepMismatch) {
    setValidityStateAndMessage(min1InputElt, "Please enter a whole number.");
  }
  if (max1InputElt.validity.stepMismatch) {
    setValidityStateAndMessage(max1InputElt, "Please enter a whole number.");
  }
  if (min2InputElt.validity.stepMismatch) {
    setValidityStateAndMessage(min2InputElt, "Please enter a whole number.");
  }
  if (max2InputElt.validity.stepMismatch) {
    setValidityStateAndMessage(max2InputElt, "Please enter a whole number.");
  }

  return (
    min1InputElt.checkValidity() &&
    max1InputElt.checkValidity() &&
    min2InputElt.checkValidity() &&
    max2InputElt.checkValidity()
  );
};

// 0. if both fields are empty, skip this.
// 1. result min must be < max.
// 2. result min cannot be > highest possible result.
// 3. result max cannot be < lowest possible result.
// return {bool} - did result constraints validate?
const setResultConstraintsValidity = (formPayload) => {
  const resultMinInputElt = formPayload.form.querySelector("#resultMinInput");
  const resultMaxInputElt = formPayload.form.querySelector("#resultMaxInput");

  setValidityStateAndMessage(resultMinInputElt, "");
  setValidityStateAndMessage(resultMaxInputElt, "");

  // empty check
  if (!formPayload.resultMinValue && !formPayload.resultMaxValue) {
    return true;
  }

  // no decimals allowed (step="1")
  if (resultMinInputElt.validity.stepMismatch) {
    setValidityStateAndMessage(
      resultMinInputElt,
      "Please enter a whole number."
    );
  }
  if (resultMaxInputElt.validity.stepMismatch) {
    setValidityStateAndMessage(
      resultMaxInputElt,
      "Please enter a whole number."
    );
  }

  // require: min < max
  if (formPayload.resultMinValue > formPayload.resultMaxValue) {
    setValidityStateAndMessage(
      resultMinInputElt,
      "Minimum must be less than or equal to maximum."
    );
    setValidityStateAndMessage(
      resultMaxInputElt,
      "Minimum must be less than or equal to maximum."
    );
  }

  // check for imposible results constraints at extremities
  if (formPayload.resultMinValue > extremeResult(formPayload, Math.max)) {
    setValidityStateAndMessage(
      resultMinInputElt,
      "Minimum result exceeds highest possible result."
    );
  }
  if (formPayload.resultMaxValue < extremeResult(formPayload, Math.min)) {
    setValidityStateAndMessage(
      resultMaxInputElt,
      "Maximum is lower than lowest possible result."
    );
  }

  // check for impossible results constraints in the middle of operand ranges
  if (!resultsWillConverge(formPayload)) {
    setValidityStateAndMessage(
      resultMinInputElt,
      "No solution possible with these constraints."
    );
    setValidityStateAndMessage(
      resultMaxInputElt,
      "No solution possible with these constraints."
    );
  }

  return resultMinInputElt.checkValidity() && resultMaxInputElt.checkValidity();
};

// finds the highest or lowest possible result, checking all active operations
// formPayload {object}
// extremityFn {function} - either Math.max or Math.min
// return {number}
export const extremeResult = (formPayload, extremityFn) => {
  const operations = ["+", "-", "*", "/"];
  let extremeResult;

  if (operations.includes("+")) {
    extremeResult = extremeResultByOperation(formPayload, extremityFn, add);
  }
  if (operations.includes("-")) {
    const subtractionExtreme = extremeResultByOperation(
      formPayload,
      extremityFn,
      subtract
    );
    extremeResult = extremeResult
      ? extremityFn(extremeResult, subtractionExtreme)
      : subtractionExtreme;
  }
  if (operations.includes("*")) {
    const multiplicationExtreme = extremeResultByOperation(
      formPayload,
      extremityFn,
      multiply
    );
    extremeResult = extremeResult
      ? extremityFn(extremeResult, multiplicationExtreme)
      : multiplicationExtreme;
  }
  if (operations.includes("/")) {
    const divisionExtreme = extremeResultByOperation(
      formPayload,
      extremityFn,
      divide
    );
    extremeResult = extremeResult
      ? extremityFn(extremeResult, divisionExtreme)
      : divisionExtreme;
  }

  return extremeResult;
};

// formPayload {object}
// extremityFn {Function} - either Math.min or Math.max
// operationFn {Function} - add, subtract, multiply, or divide
export const extremeResultByOperation = (
  formPayload,
  extremityFn,
  operationFn
) => {
  const { min1Value, max1Value, min2Value, max2Value } = formPayload;

  if ([add, subtract, multiply].includes(operationFn)) {
    // operands could be shuffled in ProblemsView. need all permutations
    return extremityFn(
      operationFn(min1Value, min2Value),
      operationFn(min1Value, max2Value),
      operationFn(max1Value, min2Value),
      operationFn(max1Value, max2Value),
      operationFn(min2Value, min1Value),
      operationFn(min2Value, max1Value),
      operationFn(max2Value, min1Value),
      operationFn(max2Value, max1Value)
    );
  } else if (operationFn === divide) {
    let operand1Denominators = [min1Value, max1Value];
    if (min1Value < 0 && max1Value > 0) {
      operand1Denominators.push(-1, 1);
    }
    if (min1Value === 0) {
      operand1Denominators[0] = 1;
    }
    if (max1Value === 0) {
      operand1Denominators[1] = -1;
    }

    let operand2Denominators = [min2Value, max2Value];
    if (min2Value < 0 && max2Value > 0) {
      operand2Denominators.push(-1, 1);
    }
    if (min2Value === 0) {
      operand2Denominators[0] = 1;
    }
    if (max2Value === 0) {
      operand2Denominators[1] = -1;
    }

    return extremityFn(
      ...operand2Denominators.map((operand2Denominator) =>
        operationFn(min1Value, operand2Denominator)
      ),
      ...operand2Denominators.map((operand2Denominator) =>
        operationFn(max1Value, operand2Denominator)
      ),
      ...operand1Denominators.map((operand1Denominator) =>
        operationFn(min2Value, operand1Denominator)
      ),
      ...operand1Denominators.map((operand1Denominator) =>
        operationFn(max2Value, operand1Denominator)
      )
    );
  } else {
    throw new Error("invalid operationFn");
  }
};

// some combinations of constraints can produce scenarios where no result is possible.
// e.g. multiplication only, op1 = 0 to 10, op2 = 5, resultMin and resultMax = 8
// the result constraints are within the extremities, but there's not way to get 8
// from these constraints.
export const resultsWillConverge = (formPayload) => {
  const opMap = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
  };
  // loop through all possible problems from current formPayload.
  for (let op1 = formPayload.min1Value; op1 <= formPayload.max1Value; op1++) {
    for (let op2 = formPayload.min2Value; op2 <= formPayload.max2Value; op2++) {
      for (const op of formPayload.operationsValue) {
        // at each problem, if result in resultsRange, return true.
        const result1 = opMap[op](op1, op2);
        if (
          result1 >= formPayload.resultMinValue &&
          result1 <= formPayload.resultMaxValue
        ) {
          return true;
        }
        const result2 = opMap[op](op2, op1);
        if (
          result2 >= formPayload.resultMinValue &&
          result2 <= formPayload.resultMaxValue
        ) {
          return true;
        }
      }
    }
  }
  return false;
};

export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;
export const divide = (a, b) => a / b;

const setValidityStateAndMessage = (element, errorMessage) => {
  element.setCustomValidity(errorMessage);
  element.parentElement.querySelector(".invalid-feedback").innerText =
    errorMessage;
  return errorMessage === "" ? true : false;
};
