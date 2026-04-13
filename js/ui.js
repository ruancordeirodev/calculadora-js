let display;

// ======================
// INIT
// ======================
document.addEventListener("DOMContentLoaded", () => {
  display = document.getElementById("display");
});

// ======================
// DISPLAY CONTROL
// ======================
function updateDisplay(value, color = "#0f0") {
  if (!display) return;

  display.value = value;
  display.style.color = color;
}

// ======================
// INPUT CONTROL
// ======================
function appendValue(value) {
  if (!display) return;

  if (display.value === "Erro") {
    updateDisplay("");
  }

  const validChars = "0123456789+-*/.";
  if (!validChars.includes(value)) return;

  const lastChar = display.value.slice(-1);
  const operators = ["+", "-", "*", "/"];

  // evita operador duplicado
  if (operators.includes(lastChar) && operators.includes(value)) return;

  // evita múltiplos pontos no mesmo número
  if (value === ".") {
    const parts = display.value.split(/[\+\-\*\/]/);
    const lastNumber = parts[parts.length - 1];
    if (lastNumber.includes(".")) return;
  }

  display.value += value;
}

// ======================
// ACTIONS
// ======================
function clearDisplay() {
  updateDisplay("");
}

function deleteLast() {
  if (!display) return;
  display.value = display.value.slice(0, -1);
}