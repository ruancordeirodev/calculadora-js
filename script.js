const display = document.getElementById("display");
const historyList = document.getElementById("history-list");

let history = JSON.parse(localStorage.getItem("history")) || [];

/* ===================== */
/* HISTÓRICO */
/* ===================== */

function saveHistory() {
  localStorage.setItem("history", JSON.stringify(history));
}

function renderHistory() {
  historyList.innerHTML = "";

  history.slice().reverse().forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

/* ===================== */
/* INPUT */
/* ===================== */

function append(value) {
  if (display.value === "Erro") {
    display.value = "";
    display.style.color = "#0f0";
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
  display.value = "";
  display.style.color = "#0f0";
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

/* ===================== */
/* PARSER SEGURO */
/* ===================== */

function tokenize(expression) {
  return expression.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
}

function precedence(op) {
  if (op === "+" || op === "-") return 1;
  if (op === "*" || op === "/") return 2;
  return 0;
}

function applyOperation(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);

  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") return b === 0 ? "Erro" : a / b;
}

function evaluateExpression(expression) {
  const tokens = tokenize(expression);
  if (!tokens) return "Erro";

  const values = [];
  const ops = [];

  for (let token of tokens) {
    if (!isNaN(token)) {
      values.push(token);
    } else {
      while (
        ops.length &&
        precedence(ops[ops.length - 1]) >= precedence(token)
      ) {
        const val2 = values.pop();
        const val1 = values.pop();
        const op = ops.pop();
        const result = applyOperation(val1, val2, op);

        if (result === "Erro") return "Erro";
        values.push(result);
      }
      ops.push(token);
    }
  }

  while (ops.length) {
    const val2 = values.pop();
    const val1 = values.pop();
    const op = ops.pop();
    const result = applyOperation(val1, val2, op);

    if (result === "Erro") return "Erro";
    values.push(result);
  }

  return values[0];
}

/* ===================== */
/* CALCULAR */
/* ===================== */

function calculate() {
  try {
    if (display.value === "") return;

    let expression = display.value;
    let result = evaluateExpression(expression);

    if (result === "Erro" || !isFinite(result)) {
      display.value = "Erro";
      display.style.color = "red";
      return;
    }

    display.value = result;
    display.style.color = "#0f0";

    history.push(`${expression} = ${result}`);

    if (history.length > 10) {
      history.shift();
    }

    saveHistory();
    renderHistory();

  } catch {
    display.value = "Erro";
    display.style.color = "red";
  }
}

/* ===================== */
/* TECLADO */
/* ===================== */

document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (!isNaN(key) || ["+", "-", "*", "/"].includes(key)) {
    append(key);
  }

  if (key === ".") append(".");
  if (key === "Enter") {
    event.preventDefault();
    calculate();
  }
  if (key === "Backspace") deleteLast();
  if (key === "Escape") clearDisplay();
});

/* ===================== */
/* COPIAR */
/* ===================== */

function copyResult() {
  if (!display.value || display.value === "Erro") return;

  navigator.clipboard.writeText(display.value);

  display.style.color = "#00ffcc";

  setTimeout(() => {
    display.style.color = "#0f0";
  }, 500);
}

/* ===================== */
/* TEMA */
/* ===================== */

function toggleTheme() {
  document.body.classList.toggle("light");

  const isLight = document.body.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
}

(function () {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light");
  }
})();

/* ===================== */
/* INIT */
/* ===================== */

renderHistory();