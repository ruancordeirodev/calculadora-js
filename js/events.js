// ======================
// BOTÕES (CLIQUE)
// ======================

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn");
  const themeBtn = document.getElementById("theme-toggle");
  const copyBtn = document.getElementById("copy");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const value = btn.textContent;

      if (btn.classList.contains("clear")) {
        clearDisplay();
        return;
      }

      if (btn.classList.contains("delete")) {
        deleteLast();
        return;
      }

      if (btn.classList.contains("equal")) {
        handleCalculate();
        return;
      }

      appendValue(value);
    });
  });

  // botão tema
  themeBtn.addEventListener("click", toggleTheme);

  // botão copiar
  copyBtn.addEventListener("click", copyResult);
});


// ======================
// CÁLCULO
// ======================

function handleCalculate() {
  const expression = display.value;
  const result = evaluateExpression(expression);

  if (result === "Erro" || !isFinite(result)) {
    updateDisplay("Erro", "red");
    return;
  }

  updateDisplay(result);
  addToHistory(`${expression} = ${result}`);
}


// ======================
// TECLADO
// ======================

document.addEventListener("keydown", (event) => {
  if (!display) return;

  const key = event.key;

  if (!isNaN(key) || ["+", "-", "*", "/"].includes(key)) {
    appendValue(key);
  }

  if (key === ".") appendValue(".");
  if (key === "Enter") {
    event.preventDefault();
    handleCalculate();
  }
  if (key === "Backspace") deleteLast();
  if (key === "Escape") clearDisplay();
});