let operand1, operand2, operator, hasJustRan;

// OPERATIONS

function add(num1 = 0, num2 = 0) {
  return num1 + num2;
}

function subtract(num1 = 0, num2 = 0) {
  return num1 - num2;
}

function multiply(num1 = 1, num2 = 1) {
  return num1 * num2;
}

function divide(num1 = 1, num2 = 1) {
  return num1 / num2;
}

const CALCULATIONS = { add, subtract, multiply, divide };
const SYMBOLS = { add: "+", subtract: "-", multiply: "x", divide: "/" };

// DISPLAY ACTIONS

function showError() {
  const mainEl = document.getElementsByTagName("main")[0];

  mainEl.classList.add("shake");
  setTimeout(() => mainEl.classList.remove("shake"), 250);
}

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
  let digit = event.target.innerText;

  const handleDecimals = (operand) => {
    if (digit === ".") {
      if (operand.includes(".")) {
        showError();
        return "";
      } else {
        return "0.";
      }
    } else {
      return digit;
    }
  };

  if (hasJustRan) {
    operand1 = digit;
    hasJustRan = false;
  } else {
    if (!operator) {
      operand1 += handleDecimals(operand1);
    } else {
      operand2 += handleDecimals(operand2);
    }
  }
  render();
}

function onOperatorPress(event) {
  if (operator && !operand2) {
    showError();
    return;
  } else if (operator) {
    operand1 = calculate();
    operand2 = "";
  }
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
  return CALCULATIONS[operator](parseFloat(operand1), parseFloat(operand2));
}

function onEquals() {
  if (!operand1 || !operator || !operand2) {
    showError();
    return;
  }
  operand1 = calculate();
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

document.getElementById("equals").addEventListener("click", onEquals);

clearCalculator();
