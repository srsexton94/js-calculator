let operand1, operand2, operator, hasJustRan;

// OPERATIONS

function add(num1 = 0, num2 = 0) {
  return num1 + num2;
}

function subtract(num1 = 0, num2 = 0) {
  return num1 - num2;
}

function multiply(num1 = 0, num2 = 0) {
  return num1 * num2;
}

function divide(num1 = 0, num2 = 0) {
  return num1 / num2;
}

const CALCULATIONS = { add, subtract, multiply, divide };
const SYMBOLS = { add: "+", subtract: "-", multiply: "x", divide: "/" };

// DISPLAY ACTIONS

function render() {
  const [secondaryDisplay, primaryDisplay] =
    document.querySelectorAll("#display > p");

  if (operator) {
    secondaryDisplay.innerText = `${operand1} ${SYMBOLS[operator]}`;
    primaryDisplay.innerText = operand2;
  } else {
    secondaryDisplay.innerText = "";
    primaryDisplay.innerText = operand1;
  }
}

// INPUT ACTIONS

function onNumberPress(event) {
  const digit = event.target.innerText;

  if (hasJustRan) {
    operand1 = digit;
    hasJustRan = false;
  } else {
    if (!operator) {
      operand1 += digit;
    } else {
      operand2 += digit;
    }
  }
  render();
}

function onOperatorPress(event) {
  operator = event.target.getAttribute("aria-label");
  hasJustRan = false;
  render();
}

function clearCalculator() {
  operand1 = "";
  operand2 = "";
  operator = "";
  hasJustRan = false;
  render();
}

function calculate() {
  operand1 = CALCULATIONS[operator](parseFloat(operand1), parseFloat(operand2));
  operand2 = "";
  operator = "";
  hasJustRan = true;
  render();
}

// EVENT LISTENERS

document.querySelectorAll("button.number").forEach((element) => {
  element.addEventListener("click", onNumberPress);
});

document.querySelectorAll("button.operator").forEach((element) => {
  element.addEventListener("click", onOperatorPress);
});

document.getElementById("reset").addEventListener("click", clearCalculator);

document.getElementById("equals").addEventListener("click", calculate);

clearCalculator();
