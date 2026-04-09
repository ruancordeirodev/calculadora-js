function copyResult() {
  if (!display || !display.value || display.value === "Erro") return;

  navigator.clipboard.writeText(display.value);

  display.style.color = "#00ffcc";

  setTimeout(() => {
    display.style.color = "#0f0";
  }, 500);
}

function toggleTheme() {
  document.body.classList.toggle("light");

  const isLight = document.body.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light");
  }

  renderHistory();
});