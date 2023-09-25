function display(value) {
  var input = document.calc.txt.value;
  var lastChar = input.slice(-1);

  if (isOperator(lastChar) && isOperator(value)) {
    // Si el último carácter es un operador y se intenta agregar otro operador, no hacer nada
    return;
  }

  document.calc.txt.value += value;
}

function percentage() {
  var input = document.calc.txt.value;
  try {
    var result = eval(input);
    document.calc.txt.value = result / 100;
  } catch (error) {
    document.calc.txt.value = "Error";
  }
}

function isOperator(char) {
  var operators = ["+", "-", "*", "/", "^", "%"];
  // Se comprueba si el valor introducido se encuentra dentro de los operadores existentes.
  return operators.includes(char);
}

function clearDisplay() {
  document.calc.txt.value = "";
}

function calculate() {
  var input = document.calc.txt.value;
  var numbers = /[0-9]/;
  for (var i = 0; i < input.length; i++) {
    if (input[i] == "√") {
      input = input.replace("√", "Math.sqrt(");

      for (var j = i + 1; j < input.length; j++) {
        if (!numbers.test(input[j])) {
          input = input.slice(0, input.length - 1);
          input += ")";
          break;
        }
      }
    }
  }
  input = input.replace(/\^/g, "**");

  if (isOperator(input[input.length])) {
    input = input.slice(0, input.length - 1);
  }

  try {
    document.calc.txt.value = eval(input);
  } catch {
    document.calc.txt.value = "Syntax Error";
  }
}

function onlyOneComma() {
  var input = document.calc.txt.value;
  var lastNumber = getLastNumber(input);

  // Verificar si el último número contiene ya una coma decimal
  if (lastNumber.includes(".")) {
    return;
  }

  // Agregar una coma al final del último número
  display(".");
}

function getLastNumber(input) {
  // Buscar el último número en la cadena
  var numbers = input.split(/[\+\-\*\/]/);
  return numbers[numbers.length - 1];
}
