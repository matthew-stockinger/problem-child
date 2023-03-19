export const validate = (form, formdata) => {
  const numberOfProblemsValidity = setNumberOfProblemsValidity(form, formdata);
  return numberOfProblemsValidity;
};

export const setNumberOfProblemsValidity = (form, formdata) => {
  const numProbsValue = parseInt(formdata.get("numberOfProblemsInput"));
  const numProbsInputElt = form.querySelector("#numberOfProblemsInput");
  const invalidDivElt = form.querySelector(
    "#numberOfProblemsInput ~ .invalid-feedback"
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
    return true;
  }
};
