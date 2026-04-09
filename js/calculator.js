function tokenize(expression) {
  return expression.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
}

function precedence(op) {
  return (op === "+" || op === "-") ? 1 : 2;
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
      while (ops.length && precedence(ops[ops.length - 1]) >= precedence(token)) {
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