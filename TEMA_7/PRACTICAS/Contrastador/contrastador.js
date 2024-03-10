document.addEventListener("DOMContentLoaded", function () {
  verificarContraste("contraste");
  verificarContraste("nocontraste");
});

function verificarContraste(idElemento) {
  const elemento = document.getElementById(idElemento);
  const colorFondo = getComputedStyle(elemento).backgroundColor;
  const colorTexto = getComputedStyle(elemento).color;
  const luminanciaFondo = calcularLuminancia(colorFondo);
  const luminanciaTexto = calcularLuminancia(colorTexto);
  const contraste =
    Math.max((luminanciaFondo, luminanciaTexto) + 0.05) /
    Math.min((luminanciaTexto, luminanciaFondo) + 0.05);
  const redondeo = contraste.toFixed(2); // Redondeo a dos decimales
  const resultado = redondeo >= 4.5 ? "APTO" : "NO APTO";
  document.getElementById(idElemento).innerHTML += `${redondeo}, ${resultado}`;
}

function calcularLuminancia(color) {
  const rgba = obtenerRGBA(color);
  const correccionGamma = (valor) => {
    valor /= 255;
    return valor <= 0.03928
      ? valor / 12.92
      : Math.pow((valor + 0.055) / 1.055, 2.4);
  };
  const r = correccionGamma(rgba[0]);
  const g = correccionGamma(rgba[1]);
  const b = correccionGamma(rgba[2]);
  const luminancia = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminancia * 255;
}

function obtenerRGBA(color) {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const contexto = canvas.getContext("2d");
  contexto.fillStyle = color;
  contexto.fillRect(0, 0, 1, 1);
  const datos = contexto.getImageData(0, 0, 1, 1).data;
  return [datos[0], datos[1], datos[2], datos[3] / 255];
}
