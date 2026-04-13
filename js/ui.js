let display;

document.addEventListener("DOMContentLoaded", () => {
  display = document.getElementById("display");

  // último resultado salvo
  const last = localStorage.getItem("lastResult");
  if (last) display.value = last;
});

function updateDisplay(value, color = "#00ffcc") {
  if (!display) return;

  display.value = value;
  display.style.color = color;

  if (value !== "Erro") {
    localStorage.setItem("lastResult", value);
  }

  // animação de resultado
  display.classList.add("result");
  setTimeout(() => display.classList.remove("result"), 250);
}

function appendValue(value) {
  if (!display) return;

  if (display.value === "Erro") updateDisplay("");

  const valid = "0123456789+-*/.";
  if (!valid.includes(value)) return;

  const last = display.value.slice(-1);
  const ops = ["+", "-", "*", "/"];

  if (ops.includes(last) && ops.includes(value)) return;

  if (value === ".") {
    const parts = display.value.split(/[\+\-\*\/]/);
    if (parts.at(-1).includes(".")) return;
  }

  display.value += value;
}

function clearDisplay() {
  updateDisplay("");
}

function deleteLast() {
  if (!display) return;
  display.value = display.value.slice(0, -1);
}

function showError() {
  updateDisplay("Erro", "#ff453a");

  display.classList.add("shake");
  setTimeout(() => display.classList.remove("shake"), 300);
}