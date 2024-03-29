import { extremeResultByOperation, extremeResult } from "./validation";
import { add, subtract, multiply, divide } from "./validation";
import { resultsWillConverge } from "./validation";

const fdPosPos = {
  min1Value: 1,
  max1Value: 10,
  min2Value: 1,
  max2Value: 10,
};
const fdZeroPos = {
  ...fdPosPos,
  min1Value: 0,
};
const fdNegPos = {
  ...fdPosPos,
  min1Value: -10,
};
const fdNegZero = {
  ...fdNegPos,
  max1Value: 0,
};
const fdNegNeg = {
  ...fdNegZero,
  max1Value: -1,
};

it("finds minimum by addition", () => {
  expect(extremeResultByOperation(fdPosPos, Math.min, add)).toEqual(2);
  expect(extremeResultByOperation(fdZeroPos, Math.min, add)).toEqual(1);
  expect(extremeResultByOperation(fdNegPos, Math.min, add)).toEqual(-9);
  expect(extremeResultByOperation(fdNegZero, Math.min, add)).toEqual(-9);
  expect(extremeResultByOperation(fdNegNeg, Math.min, add)).toEqual(-9);
});
it("finds maximum by addition", () => {
  expect(extremeResultByOperation(fdPosPos, Math.max, add)).toEqual(20);
  expect(extremeResultByOperation(fdZeroPos, Math.max, add)).toEqual(20);
  expect(extremeResultByOperation(fdNegPos, Math.max, add)).toEqual(20);
  expect(extremeResultByOperation(fdNegZero, Math.max, add)).toEqual(10);
  expect(extremeResultByOperation(fdNegNeg, Math.max, add)).toEqual(9);
});

it("finds minimum by subtraction", () => {
  expect(extremeResultByOperation(fdPosPos, Math.min, subtract)).toEqual(-9);
  expect(extremeResultByOperation(fdZeroPos, Math.min, subtract)).toEqual(-10);
  expect(extremeResultByOperation(fdNegPos, Math.min, subtract)).toEqual(-20);
  expect(extremeResultByOperation(fdNegZero, Math.min, subtract)).toEqual(-20);
  expect(extremeResultByOperation(fdNegNeg, Math.min, subtract)).toEqual(-20);
});
it("finds maximum by subtraction", () => {
  expect(extremeResultByOperation(fdPosPos, Math.max, subtract)).toEqual(9);
  expect(extremeResultByOperation(fdZeroPos, Math.max, subtract)).toEqual(10);
  expect(extremeResultByOperation(fdNegPos, Math.max, subtract)).toEqual(20);
  expect(extremeResultByOperation(fdNegZero, Math.max, subtract)).toEqual(20);
  expect(extremeResultByOperation(fdNegNeg, Math.max, subtract)).toEqual(20);
});

it("finds minimum by multiplication", () => {
  expect(extremeResultByOperation(fdPosPos, Math.min, multiply)).toEqual(1);
  expect(extremeResultByOperation(fdZeroPos, Math.min, multiply)).toEqual(0);
  expect(extremeResultByOperation(fdNegPos, Math.min, multiply)).toEqual(-100);
  expect(extremeResultByOperation(fdNegZero, Math.min, multiply)).toEqual(-100);
  expect(extremeResultByOperation(fdNegNeg, Math.min, multiply)).toEqual(-100);
});
it("finds maximum by multiplication", () => {
  expect(extremeResultByOperation(fdPosPos, Math.max, multiply)).toEqual(100);
  expect(extremeResultByOperation(fdZeroPos, Math.max, multiply)).toEqual(100);
  expect(extremeResultByOperation(fdNegPos, Math.max, multiply)).toEqual(100);
  expect(extremeResultByOperation(fdNegZero, Math.max, multiply)).toEqual(0);
  expect(extremeResultByOperation(fdNegNeg, Math.max, multiply)).toEqual(-1);
});

it("finds minimum by division", () => {
  expect(extremeResultByOperation(fdPosPos, Math.min, divide)).toEqual(0.1);
  expect(extremeResultByOperation(fdZeroPos, Math.min, divide)).toEqual(0);
  expect(extremeResultByOperation(fdNegPos, Math.min, divide)).toEqual(-10);
  expect(extremeResultByOperation(fdNegZero, Math.min, divide)).toEqual(-10);
  expect(extremeResultByOperation(fdNegNeg, Math.min, divide)).toEqual(-10);
});
it("finds maximum by division", () => {
  expect(extremeResultByOperation(fdPosPos, Math.max, divide)).toEqual(10);
  expect(extremeResultByOperation(fdZeroPos, Math.max, divide)).toEqual(10);
  expect(extremeResultByOperation(fdNegPos, Math.max, divide)).toEqual(10);
  expect(extremeResultByOperation(fdNegZero, Math.max, divide)).toEqual(0);
  expect(extremeResultByOperation(fdNegNeg, Math.max, divide)).toEqual(-0.1);
});

//////////////////////////////////////////

const fdPosPosNegPos = {
  min1Value: 1,
  max1Value: 10,
  min2Value: -10,
  max2Value: 10,
};
const fdZeroPosNegPos = {
  ...fdPosPosNegPos,
  min1Value: 0,
};
const fdNegPosNegPos = {
  ...fdPosPosNegPos,
  min1Value: -10,
}; // -10 to 10, -10 to 10
const fdNegZeroNegPos = {
  ...fdPosPosNegPos,
  min1Value: -10,
  max1Value: 0,
}; // -10 to 0, -10 to 10
const fdNegNegNegPos = {
  ...fdPosPosNegPos,
  min1Value: -10,
  max1Value: -1,
}; // -10 to -1, -10 to 10

it("finds minimum by addition", () => {
  expect(extremeResultByOperation(fdPosPosNegPos, Math.min, add)).toEqual(-9);
  expect(extremeResultByOperation(fdZeroPosNegPos, Math.min, add)).toEqual(-10);
  expect(extremeResultByOperation(fdNegPosNegPos, Math.min, add)).toEqual(-20);
  expect(extremeResultByOperation(fdNegZeroNegPos, Math.min, add)).toEqual(-20);
  expect(extremeResultByOperation(fdNegNegNegPos, Math.min, add)).toEqual(-20);
});
it("finds maximum by addition", () => {
  expect(extremeResultByOperation(fdPosPosNegPos, Math.max, add)).toEqual(20);
  expect(extremeResultByOperation(fdZeroPosNegPos, Math.max, add)).toEqual(20);
  expect(extremeResultByOperation(fdNegPosNegPos, Math.max, add)).toEqual(20);
  expect(extremeResultByOperation(fdNegZeroNegPos, Math.max, add)).toEqual(10);
  expect(extremeResultByOperation(fdNegNegNegPos, Math.max, add)).toEqual(9);
});

it("finds minimum by subtraction", () => {
  expect(extremeResultByOperation(fdPosPosNegPos, Math.min, subtract)).toEqual(
    -20
  );
  expect(extremeResultByOperation(fdZeroPosNegPos, Math.min, subtract)).toEqual(
    -20
  );
  expect(extremeResultByOperation(fdNegPosNegPos, Math.min, subtract)).toEqual(
    -20
  );
  expect(extremeResultByOperation(fdNegZeroNegPos, Math.min, subtract)).toEqual(
    -20
  );
  expect(extremeResultByOperation(fdNegNegNegPos, Math.min, subtract)).toEqual(
    -20
  );
});
it("finds maximum by subtraction", () => {
  expect(extremeResultByOperation(fdPosPosNegPos, Math.max, subtract)).toEqual(
    20
  );
  expect(extremeResultByOperation(fdZeroPosNegPos, Math.max, subtract)).toEqual(
    20
  );
  expect(extremeResultByOperation(fdNegPosNegPos, Math.max, subtract)).toEqual(
    20
  );
  expect(extremeResultByOperation(fdNegZeroNegPos, Math.max, subtract)).toEqual(
    20
  );
  expect(extremeResultByOperation(fdNegNegNegPos, Math.max, subtract)).toEqual(
    20
  );
});

it("finds minimum by multiplication", () => {
  expect(extremeResultByOperation(fdPosPosNegPos, Math.min, multiply)).toEqual(
    -100
  );
  expect(extremeResultByOperation(fdZeroPosNegPos, Math.min, multiply)).toEqual(
    -100
  );
  expect(extremeResultByOperation(fdNegPosNegPos, Math.min, multiply)).toEqual(
    -100
  );
  expect(extremeResultByOperation(fdNegZeroNegPos, Math.min, multiply)).toEqual(
    -100
  );
  expect(extremeResultByOperation(fdNegNegNegPos, Math.min, multiply)).toEqual(
    -100
  );
});
it("finds maximum by multiplication", () => {
  expect(extremeResultByOperation(fdPosPosNegPos, Math.max, multiply)).toEqual(
    100
  );
  expect(extremeResultByOperation(fdZeroPosNegPos, Math.max, multiply)).toEqual(
    100
  );
  expect(extremeResultByOperation(fdNegPosNegPos, Math.max, multiply)).toEqual(
    100
  );
  expect(extremeResultByOperation(fdNegZeroNegPos, Math.max, multiply)).toEqual(
    100
  );
  expect(extremeResultByOperation(fdNegNegNegPos, Math.max, multiply)).toEqual(
    100
  );
});

it("finds minimum by division", () => {
  expect(extremeResultByOperation(fdPosPosNegPos, Math.min, divide)).toEqual(
    -10
  );
  expect(extremeResultByOperation(fdZeroPosNegPos, Math.min, divide)).toEqual(
    -10
  );
  expect(extremeResultByOperation(fdNegPosNegPos, Math.min, divide)).toEqual(
    -10
  );
  expect(extremeResultByOperation(fdNegZeroNegPos, Math.min, divide)).toEqual(
    -10
  );
  expect(extremeResultByOperation(fdNegNegNegPos, Math.min, divide)).toEqual(
    -10
  );
});
it("finds maximum by division", () => {
  expect(extremeResultByOperation(fdPosPosNegPos, Math.max, divide)).toEqual(
    10
  );
  expect(extremeResultByOperation(fdZeroPosNegPos, Math.max, divide)).toEqual(
    10
  );
  expect(extremeResultByOperation(fdNegPosNegPos, Math.max, divide)).toEqual(
    10
  );
  expect(extremeResultByOperation(fdNegZeroNegPos, Math.max, divide)).toEqual(
    10
  );
  expect(extremeResultByOperation(fdNegNegNegPos, Math.max, divide)).toEqual(
    10
  );
});

/*************** extremeResult ******************** */
it("finds the minimum result from all operations", () => {
  expect(extremeResult(fdPosPos, Math.min)).toEqual(-9);
  expect(extremeResult(fdZeroPos, Math.min)).toEqual(-10);
  expect(extremeResult(fdNegPos, Math.min)).toEqual(-100);
  expect(extremeResult(fdNegZero, Math.min)).toEqual(-100);
  expect(extremeResult(fdNegNeg, Math.min)).toEqual(-100);
  expect(extremeResult(fdPosPosNegPos, Math.min)).toEqual(-100);
  expect(extremeResult(fdZeroPosNegPos, Math.min)).toEqual(-100);
  expect(extremeResult(fdNegPosNegPos, Math.min)).toEqual(-100);
  expect(extremeResult(fdNegZeroNegPos, Math.min)).toEqual(-100);
  expect(extremeResult(fdNegNegNegPos, Math.min)).toEqual(-100);
});
it("finds the maximum result from all operations", () => {
  expect(extremeResult(fdPosPos, Math.max)).toEqual(100);
  expect(extremeResult(fdZeroPos, Math.max)).toEqual(100);
  expect(extremeResult(fdNegPos, Math.max)).toEqual(100);
  expect(extremeResult(fdNegZero, Math.max)).toEqual(20);
  expect(extremeResult(fdNegNeg, Math.max)).toEqual(20);
  expect(extremeResult(fdPosPosNegPos, Math.max)).toEqual(100);
  expect(extremeResult(fdZeroPosNegPos, Math.max)).toEqual(100);
  expect(extremeResult(fdNegPosNegPos, Math.max)).toEqual(100);
  expect(extremeResult(fdNegZeroNegPos, Math.max)).toEqual(100);
  expect(extremeResult(fdNegNegNegPos, Math.max)).toEqual(100);
});

///////////// resultsWillConverge /////////////////////

it("checks if resultsWillConverge", () => {
  expect(
    resultsWillConverge({
      operationsValue: ["+"],
      min1Value: 0,
      max1Value: 10,
      min2Value: 10,
      max2Value: 20,
      resultMinValue: 8,
      resultMaxValue: 8,
    })
  ).toEqual(false);
  expect(
    resultsWillConverge({
      operationsValue: ["+"],
      min1Value: 0,
      max1Value: 10,
      min2Value: 10,
      max2Value: 20,
      resultMinValue: 15,
      resultMaxValue: 15,
    })
  ).toEqual(true);
  expect(
    resultsWillConverge({
      operationsValue: ["*"],
      min1Value: 0,
      max1Value: 20,
      min2Value: 5,
      max2Value: 5,
      resultMinValue: 51,
      resultMaxValue: 54,
    })
  ).toEqual(false);
  expect(
    resultsWillConverge({
      operationsValue: ["*"],
      min1Value: 0,
      max1Value: 20,
      min2Value: 5,
      max2Value: 5,
      resultMinValue: 96,
      resultMaxValue: 104,
    })
  ).toEqual(true);
});
