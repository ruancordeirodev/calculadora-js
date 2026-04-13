document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn");
  const themeBtn = document.getElementById("theme-toggle");
  const copyBtn = document.getElementById("copy");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const value = btn.textContent;

      if (btn.classList.contains("clear")) return clearDisplay();
      if (btn.classList.contains("delete")) return deleteLast();
      if (btn.classList.contains("equal")) return handleCalculate();

      appendValue(value);
      playClick();
    });
  });

  themeBtn.addEventListener("click", toggleTheme);
  copyBtn.addEventListener("click", copyResult);
});

function handleCalculate() {
  const expression = display.value;
  const result = evaluateExpression(expression);

  if (result === "Erro" || !isFinite(result)) {
    showError();
    playClick("error");
    return;
  }

  updateDisplay(result);
  addToHistory(`${expression} = ${result}`);
  playClick("success");
}

// teclado
document.addEventListener("keydown", (e) => {
  if (!display) return;

  const key = e.key;

  if (!isNaN(key) || ["+", "-", "*", "/"].includes(key)) {
    appendValue(key);
  }

  if (key === ".") appendValue(".");
  if (key === "Enter") {
    e.preventDefault();
    handleCalculate();
  }
  if (key === "Backspace") deleteLast();
  if (key === "Escape") clearDisplay();
});