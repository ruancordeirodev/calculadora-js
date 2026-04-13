let display, operationEl;

document.addEventListener("DOMContentLoaded", () => {
  display = document.getElementById("display");
  operationEl = document.getElementById("operation");

  const last = localStorage.getItem("lastResult");
  if (last) display.value = last;
});

function updateDisplay(value, color = "#00ffcc") {
  display.value = value;
  display.style.color = color;

  if (value !== "Erro") {
    localStorage.setItem("lastResult", value);
  }

  display.classList.add("result");
  setTimeout(() => display.classList.remove("result"), 250);
}

function setOperation(text) {
  if (operationEl) operationEl.textContent = text;
}

function appendValue(value) {
  if (display.value === "Erro") updateDisplay("");

  const ops = ["+", "-", "*", "/"];
  const last = display.value.slice(-1);

  if (ops.includes(last) && ops.includes(value)) return;

  if (value === ".") {
    const parts = display.value.split(/[\+\-\*\/]/);
    if (parts.at(-1).includes(".")) return;
  }

  display.value += value;
}

function clearDisplay() {
  updateDisplay("");
  setOperation("");
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function showError() {
  updateDisplay("Erro", "#ff453a");

  display.classList.add("shake");
  setTimeout(() => display.classList.remove("shake"), 300);
}

/* 🔥 NOVAS FUNÇÕES */
function applyFunction(type) {
  let value = parseFloat(display.value);
  if (isNaN(value)) return;

  let result;

  switch (type) {
    case "sqrt":
      result = value < 0 ? "Erro" : Math.sqrt(value);
      setOperation(`√(${value})`);
      break;

    case "square":
      result = value * value;
      setOperation(`${value}²`);
      break;

    case "inverse":
      result = value === 0 ? "Erro" : 1 / value;
      setOperation(`1/${value}`);
      break;

    case "percent":
      result = value / 100;
      setOperation(`${value}%`);
      break;
  }

  if (result === "Erro") return showError();

  updateDisplay(result);
}