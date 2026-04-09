let display;

document.addEventListener("DOMContentLoaded", () => {
  display = document.getElementById("display");
});

function updateDisplay(value, color = "#0f0") {
  display.value = value;
  display.style.color = color;
}

function appendValue(value) {
  if (display.value === "Erro") {
    updateDisplay("");
  }

  const lastChar = display.value.slice(-1);
  const operators = ["+", "-", "*", "/"];

  if (operators.includes(lastChar) && operators.includes(value)) return;

  if (value === ".") {
    const parts = display.value.split(/[\+\-\*\/]/);
    const lastNumber = parts[parts.length - 1];
    if (lastNumber.includes(".")) return;
  }

  display.value += value;
}

function clearDisplay() {
  updateDisplay("");
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}