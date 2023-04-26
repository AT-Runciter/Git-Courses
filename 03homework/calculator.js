class Calculator {
  constructor() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
    this.display = document.getElementById("display");
    this.buttons = document.querySelectorAll("button");
    this.clear();
    this.addEventListeners();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
    this.updateDisplay();
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    this.updateDisplay();
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
    this.updateDisplay();
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
    this.updateDisplay();
  }

  updateDisplay() {
    this.display.value = this.currentOperand;
  }

  addEventListeners() {
    this.buttons.forEach((button) => {
      button.addEventListener("click", () => {
        if (button.classList.contains("number")) {
          this.appendNumber(button.innerText);
        } else if (button.classList.contains("operator")) {
          this.chooseOperation(button.innerText);
        } else if (button.id === "clear") {
          this.clear();
        } else if (button.id === "equals") {
          this.compute();
        } else if (button.id === "decimal") {
          this.appendNumber(".");
        } else if (button.id === "delete") {
          this.delete();
        }
      });
    });
  }
}

const calculator = new Calculator();
