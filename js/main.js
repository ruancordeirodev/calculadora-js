function copyResult() {
  if (!display || !display.value || display.value === "Erro") return;

  navigator.clipboard.writeText(display.value).catch(() => {});
}

function toggleTheme() {
  document.body.classList.toggle("light");

  const isLight = document.body.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
}

// 🔊 SOM
const clickSound = new Audio("https://www.soundjay.com/buttons/sounds/button-16.mp3");

function playClick() {
  try {
    clickSound.currentTime = 0;
    clickSound.play();
  } catch {}
}

document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") document.body.classList.add("light");

  renderHistory();
});

// PWA
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js");
}