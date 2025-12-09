import { saveData, getData } from "./storage.js";

const horarios = {
  "Consulta General": {
    Lunes: "1:00 p.m. - 3:00 p.m.",
    Martes: "2:00 p.m. - 4:00 p.m.",
    Miércoles: "9:00 a.m. - 11:00 a.m.",
    Jueves: "1:00 p.m. - 3:00 p.m.",
    Viernes: "10:00 a.m. - 12:00 p.m.",
    Sábado: "8:00 a.m. - 10:00 a.m."
  },
  "Pediatría": {
    Lunes: "10:00 a.m. - 12:00 p.m.",
    Martes: "1:00 p.m. - 3:00 p.m.",
    Miércoles: "2:00 p.m. - 4:00 p.m.",
    Jueves: "9:00 a.m. - 11:00 a.m.",
    Viernes: "1:00 p.m. - 3:00 p.m.",
    Sábado: "8:00 a.m. - 10:00 a.m."
  },
  "Medicina Interna": {
    Lunes: "2:00 p.m. - 4:00 p.m.",
    Martes: "9:00 a.m. - 11:00 a.m.",
    Miércoles: "1:00 p.m. - 3:00 p.m.",
    Jueves: "3:00 p.m. - 5:00 p.m.",
    Viernes: "2:00 p.m. - 4:00 p.m.",
    Sábado: "10:00 a.m. - 12:00 p.m."
  }
};

const dia = document.getElementById("diaSeleccionado");
const servicio = document.getElementById("servicioSeleccionado");
const btn = document.getElementById("btnConsultar");
const resultado = document.getElementById("resultadoVisita");

const tablaHistorial = document
  .getElementById("tablaHistorial")
  .querySelector("tbody");

const historial = getData("visitaHistorial");

function renderHistorial() {
  tablaHistorial.innerHTML = "";
  historial.forEach((h) => {
    tablaHistorial.innerHTML += `
      <tr>
        <td>${h.dia}</td>
        <td>${h.servicio}</td>
        <td>${h.horario}</td>
      </tr>
    `;
  });
}

btn.addEventListener("click", () => {
  if (!dia.value || !servicio.value) {
    alert("Seleccione día y servicio");
    return;
  }

  const mejorHorario = horarios[servicio.value][dia.value];

  resultado.innerHTML = `
    <h3>Mejor horario recomendado</h3>
    <p><strong>${mejorHorario}</strong></p>
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
  saveData("visitaHistorial", []);
  window.location.reload();
});

renderHistorial();