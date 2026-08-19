const modal = document.getElementById("modalCorreo");
const btnAbrir = document.getElementById("abrirModal");
const btnCerrar = modal.querySelector(".cerrar");
const formulario = document.getElementById("formularioContacto");
let ultimoElementoActivo;

function cerrarModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-abierto");
  ultimoElementoActivo?.focus();
}

btnAbrir.addEventListener("click", () => {
  ultimoElementoActivo = document.activeElement;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-abierto");
  btnCerrar.focus();
});

btnCerrar.addEventListener("click", cerrarModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    cerrarModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    cerrarModal();
  }
});

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  const datos = new FormData(formulario);
  const asunto = encodeURIComponent(`Contacto de ${datos.get("nombre")}`);
  const cuerpo = encodeURIComponent(
    `Nombre: ${datos.get("nombre")}\nCorreo: ${datos.get("correo")}\n\n${datos.get("mensaje")}`
  );
  window.location.href = `mailto:agus03abad@gmail.com?subject=${asunto}&body=${cuerpo}`;
  cerrarModal();
  formulario.reset();
});

document.querySelectorAll(".mobile-menu-links a").forEach((link) => {
  link.addEventListener("click", () => {
    link.closest("details").removeAttribute("open");
  });
});

window.addEventListener("beforeunload", () => {
  document.body.classList.remove("modal-abierto");
});