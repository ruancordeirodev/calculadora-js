// ======================
// COPY RESULT
// ======================
function copyResult() {
  if (!display || !display.value || display.value === "Erro") return;

  navigator.clipboard.writeText(display.value)
    .then(() => {
      display.style.color = "#00ffcc";

      setTimeout(() => {
        display.style.color = "#0f0";
      }, 500);
    })
    .catch(() => {
      console.warn("Falha ao copiar");
    });
}

// ======================
// THEME TOGGLE
// ======================
function toggleTheme() {
  document.body.classList.toggle("light");

  const isLight = document.body.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
}

// ======================
// INIT
// ======================
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light");
  }

  renderHistory();
});

// ======================
// SERVICE WORKER (PWA)
// ======================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./service-worker.js")
      .then(() => console.log("PWA ativo"))
      .catch(err => console.log("Erro SW:", err));
  });
}