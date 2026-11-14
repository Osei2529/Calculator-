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

const updateDisplay = function () {
  if (operator === "") {
    display.textContent = firstNumber;
  } else {
    display.textContent = secondNumber;
  }
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

digitButtons.forEach((button) => {
  button.addEventListener("click", () => appendDigit(button.textContent));
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (firstNumber === "") return;
    if (operator !== "" && secondNumber !== "") {
      if (!calculate()) return;
    }

    operator = button.textContent;
    display.textContent = firstNumber;
    refreshDecimalButton();
  });
});

equalsButton.addEventListener("click", () => {
  if (operator === "" || secondNumber === "") return;
  if (calculate()) {
    operator = "";
    resultShown = true;
    updateDisplay();
  }
});

clearButton.addEventListener("click", () => {
  clearAll();
  display.textContent = 0;
  refreshDecimalButton();
});

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
