// TODO: check  for decimal validation.

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
  const invalidDivElt = form.querySelector(
    "#numberOfProblemsInput + .invalid-feedback"
  );
  let errorMessage = "";

  if (numProbsValue < 6) {
    errorMessage = "Number of problems must be at least 6.";
    numProbsInputElt.setCustomValidity(errorMessage);
    invalidDivElt.innerText = errorMessage;
    return false;
  } else if (numProbsValue > 100) {
    errorMessage = "Number of problems must be less than or equal to 100.";
    numProbsInputElt.setCustomValidity(errorMessage);
    invalidDivElt.innerText = errorMessage;
    return false;
  } else {
    numProbsInputElt.setCustomValidity("");
    invalidDivElt.innerText = "";
    return true;
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
  const min1 = parseInt(formdata.get("operand1MinInput"));
  const max1 = parseInt(formdata.get("operand1MaxInput"));
  const min2 = parseInt(formdata.get("operand2MinInput"));
  const max2 = parseInt(formdata.get("operand2MaxInput"));

  const min1InputElt = form.querySelector("#operand1MinInput");
  const max1InputElt = form.querySelector("#operand1MaxInput");
  const min2InputElt = form.querySelector("#operand2MinInput");
  const max2InputElt = form.querySelector("#operand2MaxInput");

  const min1InvalidDiv = form.querySelector(
    "#operand1MinInput + .invalid-feedback"
  );
  const max1InvalidDiv = form.querySelector(
    "#operand1MaxInput + .invalid-feedback"
  );
  const min2InvalidDiv = form.querySelector(
    "#operand2MinInput + .invalid-feedback"
  );
  const max2InvalidDiv = form.querySelector(
    "#operand2MaxInput + .invalid-feedback"
  );

  let errorMessage = "Minimum must be less than or equal to maximum.";

  if (min1 > max1) {
    min1InputElt.setCustomValidity(errorMessage);
    max1InputElt.setCustomValidity(errorMessage);
    min1InvalidDiv.innerText = errorMessage;
    max1InvalidDiv.innerText = errorMessage;
    return false;
  }

  if (min2 > max2) {
    min2InputElt.setCustomValidity(errorMessage);
    max2InputElt.setCustomValidity(errorMessage);
    min2InvalidDiv.innerText = errorMessage;
    max2InvalidDiv.innerText = errorMessage;
    return false;
  }

  min1InputElt.setCustomValidity("");
  max1InputElt.setCustomValidity("");
  min2InputElt.setCustomValidity("");
  max2InputElt.setCustomValidity("");
  min1InvalidDiv.innerText = "";
  max1InvalidDiv.innerText = "";
  min2InvalidDiv.innerText = "";
  max2InvalidDiv.innerText = "";
  return true;
};

// 1. result min must be < max.
// 2. result min cannot be > highest possible result.
// 3. result max cannot be < lowest possible result.
// 4. if input is empty, set state.resultMin/Max to undefined.
// return {bool} - did result constraints validate?
const setResultConstraintsValidity = (form, formdata) => {
  const resultMinValue = parseInt(formdata.get("resultMinInput"));
  const resultMaxValue = parseInt(formdata.get("resultMaxInput"));

  const resultMinInputElt = form.querySelector("#resultMinInput");
  const resultMaxInputElt = form.querySelector("#resultMaxInput");

  const resultMinInvalidDiv = form.querySelector(
    "#resultMinInput + .invalid-feedback"
  );
  const resultMaxInvalidDiv = form.querySelector(
    "#resultMaxInput + .invalid-feedback"
  );

  // require: min < max
  if (resultMinValue > resultMaxValue) {
    let errorMessage = "Minimum must be less than or equal to maximum.";
    resultMinInputElt.setCustomValidity(errorMessage);
    resultMaxInputElt.setCustomValidity(errorMessage);
    resultMinInvalidDiv.innerText = errorMessage;
    resultMaxInvalidDiv.innerText = errorMessage;
    return false;
  }

  // if min > highestPossible, invalidate
  if (resultMinValue > extremeResult(formdata, Math.max)) {
    let errorMessage = "Minimum result exceeds highest possible result.";
    resultMinInputElt.setCustomValidity(errorMessage);
    resultMinInvalidDiv.innerText = errorMessage;
    return false;
  }
  // if max < lowestPossible, invalidate
  if (resultMaxValue > extremeResult(formdata, Math.min)) {
    let errorMessage = "Maximum result is lower than lowest possible result.";
    resultMaxInputElt.setCustomValidity(errorMessage);
    resultMaxInvalidDiv.innerText = errorMessage;
    return false;
  }

  resultMinInputElt.setCustomValidity("");
  resultMaxInputElt.setCustomValidity("");
  resultMinInvalidDiv.innerText = "";
  resultMaxInvalidDiv.innerText = "";
  return true;
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
    /* test cases:
    - positive-positive
    - 0-positive
    - negative-positive
    - negative-0
    - negative-negative

    - 1-10, 1-10  // min 0.1  max 10
    - 1-10, 0-10  // min 0    max 10
    - 1-10, -10-10  // min -10  max 10
    - 1-10, -10-0 // min -10  max 0
    - 1-10, -10--1  // min -10  max -0.1

    */
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
