let history = [];

try {
  const stored = JSON.parse(localStorage.getItem("history"));
  if (Array.isArray(stored)) history = stored;
} catch {}

function saveHistory() {
  localStorage.setItem("history", JSON.stringify(history));
}

function addToHistory(entry) {
  history.push(entry);

  if (history.length > 10) {
    history = history.slice(-10);
  }

  saveHistory();
  renderHistory();
}

function renderHistory() {
  const list = document.getElementById("history-list");
  if (!list) return;

  list.innerHTML = "";

  [...history].reverse().forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;

    // 🔥 reutiliza cálculo
    li.addEventListener("click", () => {
      const value = item.split("=")[1]?.trim();
      if (value) updateDisplay(value);
    });

    list.appendChild(li);
  });
}