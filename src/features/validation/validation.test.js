import { extremeResultByOperation, extremeResult } from "./validation";
import { add, subtract, multiply, divide } from "./validation";

const fdPosPos = new FormData(); // 1 to 10, 1 to 10
const fdZeroPos = new FormData(); // 0 to 10, 1 to 10
const fdNegPos = new FormData(); // -10 to 10, 1 to 10
const fdNegZero = new FormData(); // -10 to 0, 1 to 10
const fdNegNeg = new FormData(); // -10 to -1, 1 to 10

fdPosPos.append("operand1MinInput", "1");
fdPosPos.append("operand1MaxInput", "10");
fdPosPos.append("operand2MinInput", "1");
fdPosPos.append("operand2MaxInput", "10");
fdZeroPos.append("operand1MinInput", "0");
fdZeroPos.append("operand1MaxInput", "10");
fdZeroPos.append("operand2MinInput", "1");
fdZeroPos.append("operand2MaxInput", "10");
fdNegPos.append("operand1MinInput", "-10");
fdNegPos.append("operand1MaxInput", "10");
fdNegPos.append("operand2MinInput", "1");
fdNegPos.append("operand2MaxInput", "10");
fdNegZero.append("operand1MinInput", "-10");
fdNegZero.append("operand1MaxInput", "0");
fdNegZero.append("operand2MinInput", "1");
fdNegZero.append("operand2MaxInput", "10");
fdNegNeg.append("operand1MinInput", "-10");
fdNegNeg.append("operand1MaxInput", "-1");
fdNegNeg.append("operand2MinInput", "1");
fdNegNeg.append("operand2MaxInput", "10");

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

const fdPosPosNegPos = new FormData(); // 1 to 10, -10 to 10
const fdZeroPosNegPos = new FormData(); // 0 to 10, -10 to 10
const fdNegPosNegPos = new FormData(); // -10 to 10, -10 to 10
const fdNegZeroNegPos = new FormData(); // -10 to 0, -10 to 10
const fdNegNegNegPos = new FormData(); // -10 to -1, -10 to 10

fdPosPosNegPos.append("operand1MinInput", "1");
fdPosPosNegPos.append("operand1MaxInput", "10");
fdPosPosNegPos.append("operand2MinInput", "-10");
fdPosPosNegPos.append("operand2MaxInput", "10");
fdZeroPosNegPos.append("operand1MinInput", "0");
fdZeroPosNegPos.append("operand1MaxInput", "10");
fdZeroPosNegPos.append("operand2MinInput", "-10");
fdZeroPosNegPos.append("operand2MaxInput", "10");
fdNegPosNegPos.append("operand1MinInput", "-10");
fdNegPosNegPos.append("operand1MaxInput", "10");
fdNegPosNegPos.append("operand2MinInput", "-10");
fdNegPosNegPos.append("operand2MaxInput", "10");
fdNegZeroNegPos.append("operand1MinInput", "-10");
fdNegZeroNegPos.append("operand1MaxInput", "0");
fdNegZeroNegPos.append("operand2MinInput", "-10");
fdNegZeroNegPos.append("operand2MaxInput", "10");
fdNegNegNegPos.append("operand1MinInput", "-10");
fdNegNegNegPos.append("operand1MaxInput", "-1");
fdNegNegNegPos.append("operand2MinInput", "-10");
fdNegNegNegPos.append("operand2MaxInput", "10");

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
