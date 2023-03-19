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
  // TODO: add logic here.
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
  // if value is empty, set state to undefined

  // require: min < max

  // if min > highestPossible, throw error

  // if max < lowestPossible, throw error

  return true;
};
