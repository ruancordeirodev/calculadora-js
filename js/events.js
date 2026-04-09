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