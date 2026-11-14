const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let firstNumber = "";
let operator = "";
let secondNumber = "";

const operate = function (op, a, b) {
  if (op === "+") {
    return add(a, b);
  } else if (op === "-") {
    return subtract(a, b);
  } else if (op === "*") {
    return multiply(a, b);
  } else if (op === "/") {
    return divide(a, b);
  } else {
    return null;
  }
};

const display = document.querySelector("#display");
display.textContent = 0;

const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");
const decimalButton = document.querySelector(".decimal");
const backspaceButton = document.querySelector(".backspace");

const updateDisplay = function () {
  const value = operator === "" ? firstNumber : secondNumber;
  display.textContent = value === "" ? 0 : value;
  refreshDecimalButton();
};

let resultShown = false;

const appendDigit = function (digit) {
  if (resultShown && operator === "") {
    firstNumber = "";
    resultShown = false;
  }
  if (operator === "") {
    firstNumber += digit;
  } else {
    secondNumber += digit;
  }
  updateDisplay();
};

const clearAll = function () {
  firstNumber = "";
  operator = "";
  secondNumber = "";
  resultShown = false;
};

const calculate = function () {
  if (operator === "/" && Number(secondNumber) === 0) {
    clearAll();
    display.textContent = "Nice try";
    refreshDecimalButton();
    return false;
  }
  let result = operate(operator, Number(firstNumber), Number(secondNumber));
  result = Number(result.toFixed(8));
  firstNumber = String(result);
  secondNumber = "";
  return true;
};

const handleOperator = function (op) {
  if (firstNumber === "") return;
  if (operator !== "" && secondNumber !== "") {
    if (!calculate()) return;
  }

  operator = op;
  display.textContent = firstNumber;
  refreshDecimalButton();
};

const handleEquals = function () {
  if (operator === "" || secondNumber === "") return;
  if (calculate()) {
    operator = "";
    resultShown = true;
    updateDisplay();
  }
};

const handleClear = function () {
  clearAll();
  display.textContent = 0;
  refreshDecimalButton();
};

digitButtons.forEach((button) => {
  button.addEventListener("click", () => appendDigit(button.textContent));
});

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => handleOperator(button.textContent)),
);

equalsButton.addEventListener("click", handleEquals);

clearButton.addEventListener("click", handleClear);

const getCurrentNumber = function () {
  if (resultShown && operator === "") return "";
  return operator === "" ? firstNumber : secondNumber;
};

const appendDecimal = function () {
  const current = getCurrentNumber();
  if (current.includes(".")) return;
  appendDigit(current === "" ? "0." : ".");
};

const refreshDecimalButton = function () {
  decimalButton.disabled = getCurrentNumber().includes(".");
};

decimalButton.addEventListener("click", appendDecimal);

const backSpace = function () {
  if (getCurrentNumber() === "") return;
  if (operator === "") {
    firstNumber = firstNumber.slice(0, -1);
  } else {
    secondNumber = secondNumber.slice(0, -1);
  }
  updateDisplay();
};

backspaceButton.addEventListener("click", backSpace);

document.addEventListener("keydown", (event) => {
  const key = event.key;
  if ("0123456789".includes(key)) {
    appendDigit(key);
  } else if (key === ".") {
    appendDecimal();
  } else if (["+", "-", "*", "/"].includes(key)) {
    handleOperator(key);
  } else if (key === "Enter" || key === "=") {
    handleEquals();
  } else if (key === "Backspace") {
    backSpace();
  } else if (key.toLowerCase() === "c" || key === "Escape") {
    handleClear();
  } else {
    return;
  }

  event.preventDefault();
});
