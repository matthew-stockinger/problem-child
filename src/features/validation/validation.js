export const validate = (form, formdata) => {
  const numberOfProblemsValidity = setNumberOfProblemsValidity(form, formdata);
  const constraintsValidity = setConstraintsValidity(form, formdata);
  return numberOfProblemsValidity && constraintsValidity;
};

// number of problems must be between 6 and 100.
// setCustomValidity of input element and display invalid feedback if needed.
// return {bool} - did number of problems validate?
const setNumberOfProblemsValidity = (form, formdata) => {
  const numProbsValue = parseInt(formdata.get("numberOfProblemsInput"));
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
const setConstraintsValidity = (form, formdata) => {
  const operandValidity = setOperandConstraintsValidity(form, formdata);
  const resultValidity = setResultConstraintsValidity(form, formdata);

  return operandValidity && resultValidity;
};

// operand mins must be less than max.
// if not, setCustomValidity and display error feedback.
// return {bool} - did the operand constraints validate?
const setOperandConstraintsValidity = (form, formdata) => {
  const min1InputElt = form.querySelector("#operand1MinInput");
  const max1InputElt = form.querySelector("#operand1MaxInput");
  const min2InputElt = form.querySelector("#operand2MinInput");
  const max2InputElt = form.querySelector("#operand2MaxInput");

  setValidityStateAndMessage(min1InputElt, "");
  setValidityStateAndMessage(max1InputElt, "");
  setValidityStateAndMessage(min2InputElt, "");
  setValidityStateAndMessage(max2InputElt, "");

  const min1 = parseInt(formdata.get("operand1MinInput"));
  const max1 = parseInt(formdata.get("operand1MaxInput"));
  const min2 = parseInt(formdata.get("operand2MinInput"));
  const max2 = parseInt(formdata.get("operand2MaxInput"));

  if (min1 > max1) {
    setValidityStateAndMessage(
      min1InputElt,
      "Minimum must be less than or equal to maximum."
    );
    setValidityStateAndMessage(
      max1InputElt,
      "Minimum must be less than or equal to maximum."
    );
  }

  if (min2 > max2) {
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

// 1. result min must be < max.
// 2. result min cannot be > highest possible result.
// 3. result max cannot be < lowest possible result.
// 4. if input is empty, set state.resultMin/Max to undefined.
// return {bool} - did result constraints validate?
const setResultConstraintsValidity = (form, formdata) => {
  const resultMinInputElt = form.querySelector("#resultMinInput");
  const resultMaxInputElt = form.querySelector("#resultMaxInput");

  setValidityStateAndMessage(resultMinInputElt, "");
  setValidityStateAndMessage(resultMaxInputElt, "");

  const resultMinValue = parseInt(formdata.get("resultMinInput"));
  const resultMaxValue = parseInt(formdata.get("resultMaxInput"));

  // require: min < max
  if (resultMinValue > resultMaxValue) {
    setValidityStateAndMessage(
      resultMinInputElt,
      "Minimum must be less than or equal to maximum."
    );
    setValidityStateAndMessage(
      resultMaxInputElt,
      "Minimum must be less than or equal to maximum."
    );
  }

  if (resultMinValue > extremeResult(formdata, Math.max)) {
    setValidityStateAndMessage(
      resultMinInputElt,
      "Minimum result exceeds highest possible result."
    );
  }
  if (resultMaxValue < extremeResult(formdata, Math.min)) {
    setValidityStateAndMessage(
      resultMaxInputElt,
      "Maximum is lower than lowest possible result."
    );
  }

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

  return resultMinInputElt.checkValidity() && resultMaxInputElt.checkValidity();
};

// finds the highest or lowest possible result, checking all active operations
// formdata {FormData}
// extremityFn {Function} - either Math.max or Math.min
// return {number}
export const extremeResult = (formdata, extremityFn) => {
  // TODO: change operations assignment to use formdata.
  const operations = ["+", "-", "*", "/"];
  let extremeResult;

  if (operations.includes("+")) {
    extremeResult = extremeResultByOperation(formdata, extremityFn, add);
  }
  if (operations.includes("-")) {
    const subtractionExtreme = extremeResultByOperation(
      formdata,
      extremityFn,
      subtract
    );
    extremeResult = extremeResult
      ? extremityFn(extremeResult, subtractionExtreme)
      : subtractionExtreme;
  }
  if (operations.includes("*")) {
    const multiplicationExtreme = extremeResultByOperation(
      formdata,
      extremityFn,
      multiply
    );
    extremeResult = extremeResult
      ? extremityFn(extremeResult, multiplicationExtreme)
      : multiplicationExtreme;
  }
  if (operations.includes("/")) {
    const divisionExtreme = extremeResultByOperation(
      formdata,
      extremityFn,
      divide
    );
    extremeResult = extremeResult
      ? extremityFn(extremeResult, divisionExtreme)
      : divisionExtreme;
  }

  return extremeResult;
};

// formdata {FormData}
// extremityFn {Function} - either Math.min or Math.max
// operationFn {Function} - add, subtract, multiply, or divide
export const extremeResultByOperation = (
  formdata,
  extremityFn,
  operationFn
) => {
  const operand1MinValue = parseInt(formdata.get("operand1MinInput"));
  const operand1MaxValue = parseInt(formdata.get("operand1MaxInput"));
  const operand2MinValue = parseInt(formdata.get("operand2MinInput"));
  const operand2MaxValue = parseInt(formdata.get("operand2MaxInput"));

  if ([add, subtract, multiply].includes(operationFn)) {
    // operands could be shuffled in ProblemsView. need all permutations
    return extremityFn(
      operationFn(operand1MinValue, operand2MinValue),
      operationFn(operand1MinValue, operand2MaxValue),
      operationFn(operand1MaxValue, operand2MinValue),
      operationFn(operand1MaxValue, operand2MaxValue),
      operationFn(operand2MinValue, operand1MinValue),
      operationFn(operand2MinValue, operand1MaxValue),
      operationFn(operand2MaxValue, operand1MinValue),
      operationFn(operand2MaxValue, operand1MaxValue)
    );
  } else if (operationFn === divide) {
    let operand1Denominators = [operand1MinValue, operand1MaxValue];
    if (operand1MinValue < 0 && operand1MaxValue > 0) {
      operand1Denominators.push(-1, 1);
    }
    if (operand1MinValue === 0) {
      operand1Denominators[0] = 1;
    }
    if (operand1MaxValue === 0) {
      operand1Denominators[1] = -1;
    }

    let operand2Denominators = [operand2MinValue, operand2MaxValue];
    if (operand2MinValue < 0 && operand2MaxValue > 0) {
      operand2Denominators.push(-1, 1);
    }
    if (operand2MinValue === 0) {
      operand2Denominators[0] = 1;
    }
    if (operand2MaxValue === 0) {
      operand2Denominators[1] = -1;
    }

    return extremityFn(
      ...operand2Denominators.map((operand2Denominator) =>
        operationFn(operand1MinValue, operand2Denominator)
      ),
      ...operand2Denominators.map((operand2Denominator) =>
        operationFn(operand1MaxValue, operand2Denominator)
      ),
      ...operand1Denominators.map((operand1Denominator) =>
        operationFn(operand2MinValue, operand1Denominator)
      ),
      ...operand1Denominators.map((operand1Denominator) =>
        operationFn(operand2MaxValue, operand1Denominator)
      )
    );
  } else {
    throw new Error("invalid operationFn");
  }
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
