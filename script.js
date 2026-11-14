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

// Works out firstNumber (operator) secondNumber,
// stores the result in firstNumber and clears secondNumber
const calculate = function () {
  if (operator === "/" && Number(secondNumber) === 0) {
    display.textContent = "Nice try";
    firstNumber = "";
    operator = "";
    secondNumber = "";
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
      if (calculate() === false) return;
    }

    operator = button.textContent; // now store the NEW operator
    display.textContent = firstNumber; // user is looking at the first number
  });
});

equalsButton.addEventListener("click", () => {
  if (operator === "" || secondNumber === "") return;
  if (calculate() === true) {
    operator = "";
    updateDisplay();
  }
});
