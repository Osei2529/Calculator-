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

const updateDisplay = function () {
  display.textContent = firstNumber;
};

const appendDigit = function (digit) {
  firstNumber += digit;
  updateDisplay();
};

digitButtons.forEach((button) => {
  button.addEventListener("click", () => appendDigit(button.textContent));
});
