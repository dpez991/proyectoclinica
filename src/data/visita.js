import { saveData, getData } from "./storage.js";

const horarios = {
  "Medicina General": {
    Lunes: "8:00 a.m. - 10:00 a.m.",
    Martes: "1:00 p.m. - 3:00 p.m.",
    Miércoles: "9:00 a.m. - 11:00 a.m.",
    Jueves: "8:00 a.m. - 10:00 a.m.",
    Viernes: "10:00 a.m. - 12:00 p.m.",
    Sábado: "8:00 a.m. - 9:30 a.m."
  },

  "Medicina Interna": {
    Lunes: "2:00 p.m. - 4:00 p.m.",
    Martes: "9:00 a.m. - 11:00 a.m.",
    Miércoles: "1:00 p.m. - 3:00 p.m.",
    Jueves: "3:00 p.m. - 5:00 p.m.",
    Viernes: "2:00 p.m. - 4:00 p.m.",
    Sábado: "10:00 a.m. - 12:00 p.m."
  },

  "Pediatría": {
    Lunes: "10:00 a.m. - 12:00 p.m.",
    Martes: "2:00 p.m. - 4:00 p.m.",
    Miércoles: "8:00 a.m. - 10:00 a.m.",
    Jueves: "1:00 p.m. - 3:00 p.m.",
    Viernes: "8:00 a.m. - 10:00 a.m.",
    Sábado: "9:00 a.m. - 11:00 a.m."
  },

  "Ginecología": {
    Lunes: "11:00 a.m. - 1:00 p.m.",
    Martes: "3:00 p.m. - 5:00 p.m.",
    Miércoles: "10:00 a.m. - 12:00 p.m.",
    Jueves: "2:00 p.m. - 4:00 p.m.",
    Viernes: "9:00 a.m. - 11:00 a.m.",
    Sábado: "8:00 a.m. - 10:00 a.m."
  },

  "Cardiología": {
    Lunes: "1:00 p.m. - 3:00 p.m.",
    Martes: "10:00 a.m. - 12:00 p.m.",
    Miércoles: "2:00 p.m. - 4:00 p.m.",
    Jueves: "9:00 a.m. - 11:00 a.m.",
    Viernes: "1:00 p.m. - 3:00 p.m.",
    Sábado: "8:00 a.m. - 10:00 a.m."
  },

  "Dermatología": {
    Lunes: "9:00 a.m. - 11:00 a.m.",
    Martes: "1:00 p.m. - 3:00 p.m.",
    Miércoles: "3:00 p.m. - 5:00 p.m.",
    Jueves: "11:00 a.m. - 1:00 p.m.",
    Viernes: "8:00 a.m. - 10:00 a.m.",
    Sábado: "9:00 a.m. - 11:00 a.m."
  },

  "Otorrinolaringología": {
    Lunes: "8:00 a.m. - 10:00 a.m.",
    Martes: "3:00 p.m. - 5:00 p.m.",
    Miércoles: "1:00 p.m. - 3:00 p.m.",
    Jueves: "9:00 a.m. - 11:00 a.m.",
    Viernes: "10:00 a.m. - 12:00 p.m.",
    Sábado: "8:00 a.m. - 10:00 a.m."
  },

  "Ortopedia": {
    Lunes: "2:00 p.m. - 4:00 p.m.",
    Martes: "8:00 a.m. - 10:00 a.m.",
    Miércoles: "11:00 a.m. - 1:00 p.m.",
    Jueves: "3:00 p.m. - 5:00 p.m.",
    Viernes: "9:00 a.m. - 11:00 a.m.",
    Sábado: "10:00 a.m. - 12:00 p.m."
  },

  "Oftalmología": {
    Lunes: "10:00 a.m. - 12:00 p.m.",
    Martes: "1:00 p.m. - 3:00 p.m.",
    Miércoles: "8:00 a.m. - 10:00 a.m.",
    Jueves: "2:00 p.m. - 4:00 p.m.",
    Viernes: "10:00 a.m. - 12:00 p.m.",
    Sábado: "8:00 a.m. - 10:00 a.m."
  },

  "Neurología": {
    Lunes: "3:00 p.m. - 5:00 p.m.",
    Martes: "9:00 a.m. - 11:00 a.m.",
    Miércoles: "3:00 p.m. - 5:00 p.m.",
    Jueves: "1:00 p.m. - 3:00 p.m.",
    Viernes: "8:00 a.m. - 10:00 a.m.",
    Sábado: "9:00 a.m. - 11:00 a.m."
  },

  "Nutrición": {
    Lunes: "8:00 a.m. - 10:00 a.m.",
    Martes: "12:00 p.m. - 2:00 p.m.",
    Miércoles: "10:00 a.m. - 12:00 p.m.",
    Jueves: "2:00 p.m. - 4:00 p.m.",
    Viernes: "9:00 a.m. - 11:00 a.m.",
    Sábado: "10:00 a.m. - 12:00 p.m."
  }
};

const dia = document.getElementById("diaSeleccionado");
const servicio = document.getElementById("servicioSeleccionado");
const btn = document.getElementById("btnConsultar");
const resultado = document.getElementById("resultadoVisita");

const tablaHistorial = document.getElementById("tablaHistorial").querySelector("tbody");
const contador = document.getElementById("contadorHistorial");

let historial = getData("visitaHistorial");

function renderHistorial() {
  tablaHistorial.innerHTML = "";

  historial.forEach((h, index) => {
    tablaHistorial.innerHTML += `
      <tr>
        <td class="center">${h.dia}</td>
        <td class="center">${h.servicio}</td>
        <td class="center">${h.horario}</td>
        <td class="center">
          <button class="btn btn-small delete" onclick="eliminarConsulta(${index})">Eliminar</button>
        </td>
      </tr>
    `;
  });

  contador.textContent =
    historial.length > 0
      ? `Has realizado ${historial.length} consultas.`
      : "No hay consultas registradas.";
}

window.eliminarConsulta = function (i) {
  historial.splice(i, 1);
  saveData("visitaHistorial", historial);
  renderHistorial();
};

btn.addEventListener("click", () => {
  if (!dia.value || !servicio.value) {
    alert("Seleccione día y especialidad");
    return;
  }

  const mejorHorario = horarios[servicio.value][dia.value];

  const niveles = ["Baja", "Media", "Alta"];
  const randomNivel = niveles[Math.floor(Math.random() * niveles.length)];

  const tiempoEspera =
    randomNivel === "Baja"
      ? "10–20 minutos"
      : randomNivel === "Media"
      ? "20–35 minutos"
      : "40–60 minutos";

  resultado.classList.remove("hidden");
  resultado.innerHTML = `
    <h3>Mejor horario recomendado</h3>
    <p><strong>${mejorHorario}</strong></p>

    <h4>Nivel de afluencia esperado:</h4>
    <p class="afluencia ${randomNivel.toLowerCase()}">${randomNivel}</p>

    <h4>Tiempo estimado de espera:</h4>
    <p><strong>${tiempoEspera}</strong></p>
  `;

  historial.push({
    dia: dia.value,
    servicio: servicio.value,
    horario: mejorHorario
  });

  saveData("visitaHistorial", historial);
  renderHistorial();
});

document.getElementById("limpiarHistorial").addEventListener("click", () => {
  historial = [];
  saveData("visitaHistorial", historial);
  renderHistorial();
});

renderHistorial();