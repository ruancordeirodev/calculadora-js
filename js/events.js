function handleCalculate() {
  const expression = display.value;
  const result = evaluateExpression(expression);

  if (result === "Erro" || !isFinite(result)) {
    showError();
    playClick("error");
    return;
  }

  setOperation(expression);
  updateDisplay(result);
  addToHistory(`${expression} = ${result}`);
  playClick("success");
}

document.addEventListener("keydown", (e) => {
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