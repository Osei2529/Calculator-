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
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");

const updateDisplay = function () {
  if (operator === "") {
    display.textContent = firstNumber;
  } else {
    display.textContent = secondNumber;
  }
};

const appendDigit = function (digit) {
  if (operator === "") {
    firstNumber += digit;
  } else {
    secondNumber += digit;
  }
  updateDisplay();
};

digitButtons.forEach((button) => {
  button.addEventListener("click", () => appendDigit(button.textContent));
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    operator = button.textContent;
  });
});

equalsButton.addEventListener("click", () => {
  if (operator === "" || secondNumber === "") return;
  let result = operate(operator, Number(firstNumber), Number(secondNumber));
  firstNumber = String(result);
  operator = "";
  secondNumber = "";
  updateDisplay();
});
