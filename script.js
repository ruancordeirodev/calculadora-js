const display = document.getElementById("display");

function append(value) {
  if (display.value === "Erro") {
    display.value = "";
    display.style.color = "#0f0";
  }

  const lastChar = display.value.slice(-1);
  const operators = ["+", "-", "*", "/"];

  if (operators.includes(lastChar) && operators.includes(value)) {
    return;
  }

  if (value === ".") {
    const parts = display.value.split(/[\+\-\*\/]/);
    const lastNumber = parts[parts.length - 1];

    if (lastNumber.includes(".")) {
      return;
    }
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

function calculate() {
  try {
    if (display.value === "") return;

    let result = eval(display.value);

    if (!isFinite(result)) {
      display.value = "Erro";
      display.style.color = "red";
      return;
    }

    display.value = result;
    display.style.color = "#0f0";
  } catch {
    display.value = "Erro";
    display.style.color = "red";
  }
}