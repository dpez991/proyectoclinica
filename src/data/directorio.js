import { doctores } from "../data/doctores.js";

const lista = document.getElementById("listaDoctores");
const buscarInput = document.getElementById("buscarNombre");
const filtroEspecialidad = document.getElementById("filtrarEspecialidad");
const btnLimpiar = document.getElementById("btnLimpiar");

function cargarEspecialidades() {
  const especialidades = [...new Set(doctores.map(d => d.especialidad))];

  especialidades.forEach(esp => {
    const option = document.createElement("option");
    option.value = esp;
    option.textContent = esp;
    filtroEspecialidad.appendChild(option);
  });
}

function estaEnAtencion(doc) {
  const ahora = new Date();
  const horaActual = ahora.getHours() * 60 + ahora.getMinutes();
  const inicio = convertirMinutos(doc.inicio);
  const fin = convertirMinutos(doc.fin);

  return horaActual >= inicio && horaActual <= fin;
}

function convertirMinutos(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function mostrarDoctores(listaFiltrada) {
  lista.innerHTML = "";

  listaFiltrada.forEach(doc => {
    const enAtencion = estaEnAtencion(doc);

    lista.innerHTML += `
      <div class="doc-card">
        <img src="${doc.foto}" alt="${doc.nombre}">
        <div class="info-doc">
          <h3>${doc.nombre}</h3>
          <p class="especialidad">${doc.especialidad}</p>
          <p class="sub">${doc.local}</p>
          <p class="sub">${doc.horario}</p>
          <p class="estado ${enAtencion ? "activo" : "fuera"}">
            ${enAtencion ? "🟢 En Atención" : "⚪ Fuera de Atención"}
          </p>
          <p class="sub">${doc.telefono} | ${doc.correo}</p>
        </div>
      </div>
    `;
  });
}

function aplicarFiltros() {
  const texto = buscarInput.value.toLowerCase();
  const esp = filtroEspecialidad.value;

  const filtrados = doctores.filter(doc =>
    doc.nombre.toLowerCase().includes(texto) &&
    (esp === "" || doc.especialidad === esp)
  );

  mostrarDoctores(filtrados);
}

btnLimpiar.addEventListener("click", () => {
  buscarInput.value = "";
  filtroEspecialidad.value = "";
  mostrarDoctores(doctores);
});

buscarInput.addEventListener("input", aplicarFiltros);
filtroEspecialidad.addEventListener("change", aplicarFiltros);

cargarEspecialidades();
mostrarDoctores(doctores);
