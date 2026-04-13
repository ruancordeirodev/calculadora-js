// ======================
// INIT SAFE
// ======================
let history = [];

try {
  const stored = JSON.parse(localStorage.getItem("history"));
  if (Array.isArray(stored)) {
    history = stored;
  }
} catch {
  history = [];
}

// ======================
// SAVE
// ======================
function saveHistory() {
  try {
    localStorage.setItem("history", JSON.stringify(history));
  } catch {
    console.warn("Erro ao salvar histórico");
  }
}

// ======================
// ADD
// ======================
function addToHistory(entry) {
  if (!entry || typeof entry !== "string") return;

  history.push(entry);

  // mantém limite real
  if (history.length > 10) {
    history = history.slice(-10);
  }

  saveHistory();
  renderHistory();
}

// ======================
// RENDER
// ======================
function renderHistory() {
  const list = document.getElementById("history-list");
  if (!list) return;

  list.innerHTML = "";

  [...history].reverse().forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}