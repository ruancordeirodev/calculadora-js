const display = document.getElementById("display");
const historyList = document.getElementById("history-list");

let history = JSON.parse(localStorage.getItem("history")) || [];

/* HISTÓRICO */
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

/* INPUT */
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

/* CALCULAR */
function calculate() {
  try {
    if (display.value === "") return;

    let expression = display.value;
    let result = eval(expression);

    if (!isFinite(result)) {
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

/* TECLADO */
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

/* COPIAR */
function copyResult() {
  if (!display.value || display.value === "Erro") return;

  navigator.clipboard.writeText(display.value);

  display.style.color = "#00ffcc";

  setTimeout(() => {
    display.style.color = "#0f0";
  }, 500);
}

/* TEMA */
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

/* INIT */
renderHistory();