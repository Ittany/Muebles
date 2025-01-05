let menu = document.querySelector("#menu-icon"); // Selector del ícono del menú
let navbar = document.querySelector(".navbar"); // Selector de la barra de navegación

// Evento para mostrar/ocultar la barra de navegación
menu.onclick = () => {
  navbar.classList.toggle("active"); // Alterna la clase "active"
};

// Evento para ocultar la barra de navegación al hacer scroll
window.onscroll = () => {
  navbar.classList.remove("active"); // Remueve la clase "active"
};


let mostrarLimite = 3; // Límite inicial de comentarios visibles

// Cargar comentarios desde Local Storage
document.addEventListener("DOMContentLoaded", () => {
  const comentariosGuardados = JSON.parse(localStorage.getItem("comentarios")) || [];
  renderComentarios(comentariosGuardados);
});

// Función para renderizar comentarios con límite
function renderComentarios(comentarios) {
  const lista = document.getElementById("comentariosLista");
  lista.innerHTML = "";

  comentarios.slice(0, mostrarLimite).forEach(({ nombre, comentario }) => {
    const nuevoComentario = crearComentario(nombre, comentario);
    lista.appendChild(nuevoComentario);
  });

  const verMas = document.getElementById("verMas");
  verMas.style.display = comentarios.length > mostrarLimite ? "block" : "none";
}

// Mostrar más comentarios al hacer clic en "Ver más"
function mostrarMasComentarios() {
  const comentariosGuardados = JSON.parse(localStorage.getItem("comentarios")) || [];
  mostrarLimite += 3;
  renderComentarios(comentariosGuardados);
}

// Agregar un nuevo comentario
function agregarComentario() {
  const nombre = document.getElementById("nombre").value.trim();
  const comentario = document.getElementById("comentario").value.trim();

  if (nombre && comentario) {
    const comentariosGuardados = JSON.parse(localStorage.getItem("comentarios")) || [];
    comentariosGuardados.push({ nombre, comentario });

    // Guardar y renderizar
    localStorage.setItem("comentarios", JSON.stringify(comentariosGuardados));
    renderComentarios(comentariosGuardados);

    // Limpiar formulario
    document.getElementById("comentarioForm").reset();
  } else {
    alert("Por favor, completa todos los campos.");
  }
}

// Crear el elemento de comentario
function crearComentario(nombre, comentario) {
  const nuevoComentario = document.createElement("div");
  nuevoComentario.classList.add("comentario");
  nuevoComentario.innerHTML = `
    <i class='bx bx-user-circle'></i>
    <div class="mensaje">
      <h3>${nombre}</h3>
      <p>${comentario}</p>
    </div>
  `;
  return nuevoComentario;
}



document.getElementById('formularioContacto').addEventListener('submit', function (e) {
    e.preventDefault();

    // Recopilando datos del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const referencia = document.getElementById('referencia').value;
    const mensaje = document.getElementById('mensaje').value;

    // Creando el mensaje de WhatsApp
    const mensajeWhatsApp = `Hola, soy ${nombre} ${apellido}. Mi ubicación de referencia es ${referencia}. Quiero decir: ${mensaje}`;

    // Redirigir a WhatsApp
    const numeroTelefono = '+51987654321'; // Número de WhatsApp
    const url = `https://api.whatsapp.com/send?phone=${numeroTelefono}&text=${encodeURIComponent(mensajeWhatsApp)}`;

    window.open(url, '_blank');
});

//para los filtros de navegación de cateogoria
document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".filtro-btn");
  const productos = document.querySelectorAll(".cajon");

  botones.forEach(boton => {
      boton.addEventListener("click", () => {
          const categoria = boton.getAttribute("data-categoria");

          productos.forEach(producto => {
              if (categoria === "todos" || producto.getAttribute("data-categoria") === categoria) {
                  producto.style.display = "block";
              } else {
                  producto.style.display = "none";
              }
          });
      });
  });
});