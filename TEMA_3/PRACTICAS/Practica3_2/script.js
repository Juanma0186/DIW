function cargarImagenes(nImagenes) {
  const container = document.getElementById("container");

  for (let i = 0; i < nImagenes; i++) {
    container.innerHTML += `
    <div class="imagen">
    <img src="https://picsum.photos/1280/720?random=${i}" alt="Imagen ${i}"></div>`;
  }
}

window.onload = function () {
  cargarImagenes(15);
};

function refresh() {
  location.reload();
}
