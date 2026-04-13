// ======================
// TOKENIZE
// ======================
function tokenize(expression) {
  if (!expression) return null;

  return expression.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
}

// ======================
// PRECEDENCE
// ======================
function precedence(op) {
  return (op === "+" || op === "-") ? 1 : 2;
}

// ======================
// APPLY OPERATION
// ======================
function applyOperation(a, b, op) {
  if (typeof a !== "number" || typeof b !== "number") return "Erro";

  if (op === "+") return a + b;
  if (op === "-") return a - b;
  if (op === "*") return a * b;
  if (op === "/") return b === 0 ? "Erro" : a / b;

  return "Erro";
}

// ======================
// VALIDATE EXPRESSION
// ======================
function isValidExpression(tokens) {
  if (!tokens || tokens.length === 0) return false;

  const operators = ["+", "-", "*", "/"];

  // não pode começar ou terminar com operador
  if (operators.includes(tokens[0]) || operators.includes(tokens[tokens.length - 1])) {
    return false;
  }

  // não pode ter operador duplo
  for (let i = 0; i < tokens.length - 1; i++) {
    if (operators.includes(tokens[i]) && operators.includes(tokens[i + 1])) {
      return false;
    }
  }

  return true;
}

// ======================
// EVALUATE
// ======================
function evaluateExpression(expression) {
  const tokens = tokenize(expression);
  if (!isValidExpression(tokens)) return "Erro";

  const values = [];
  const ops = [];

  for (let token of tokens) {
    if (!isNaN(token)) {
      values.push(parseFloat(token));
    } else {
      while (ops.length && precedence(ops.at(-1)) >= precedence(token)) {
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

  return values[0] ?? "Erro";
}