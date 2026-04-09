let history = JSON.parse(localStorage.getItem("history")) || [];

function saveHistory() {
  localStorage.setItem("history", JSON.stringify(history));
}

function addToHistory(entry) {
  history.push(entry);

  if (history.length > 10) {
    history.shift();
  }

  saveHistory();
  renderHistory();
}

function renderHistory() {
  const list = document.getElementById("history-list");
  list.innerHTML = "";

  history.slice().reverse().forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}