let pagina = 500;
const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

btnSiguiente.addEventListener("click", () => {
  if (pagina < 500) {
    pagina++;
    cargarPeliculas();
  } else {
    alert("No hay mas paginas");
  }
});

btnAnterior.addEventListener("click", () => {
  if (pagina > 1) {
    pagina--;
    cargarPeliculas();
  } else {
    alert("Ya estás en la página 1");
  }
});

const cargarPeliculas = async () => {
  try {
    const respuesta = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=fe5591d5c2b899bd2e9814a53e7889f5&language=es-ES&page=${pagina}`
    );

    console.log(respuesta);

    if (respuesta.status === 200) {
      const datos = await respuesta.json();

      let peliculas = "";
      datos.results.forEach((pelicula) => {
        console.log(pelicula);
        peliculas += `
					<div class="pelicula">
						<img class="poster" src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${pelicula.title}">
						<h3 class="titulo">${pelicula.title}</h3>
					</div>
				`;
      });

      document.getElementById("contenedor").innerHTML = peliculas;
    } else if (respuesta.status === 401) {
      console.log("No estas autorizado");
    } else if (respuesta.status === 404) {
      console.log("La pelicula no existe");
    } else {
      console.log("Error desconocido");
    }
  } catch (error) {
    console.log(error);
  }
};

cargarPeliculas();
