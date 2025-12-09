const clinicaImgs = document.querySelectorAll("#carouselClinica .carousel-img");

if (clinicaImgs.length > 0) {
  let cIndex = 0;

  setInterval(() => {
    clinicaImgs[cIndex].classList.remove("active");
    cIndex = (cIndex + 1) % clinicaImgs.length;
    clinicaImgs[cIndex].classList.add("active");
  }, 3500);
}

const testimonios = document.querySelectorAll("#carouselTestimonios .testimonio");
const dots = document.querySelectorAll(".testimonios-indicadores .dot");

if (testimonios.length > 0 && dots.length === testimonios.length) {
  let tIndex = 0;

  function mostrarTestimonio(i) {
    testimonios.forEach((t, idx) => {
      t.classList.toggle("active", idx === i);
    });
    dots.forEach((d, idx) => {
      d.classList.toggle("active", idx === i);
    });
  }

  setInterval(() => {
    tIndex = (tIndex + 1) % testimonios.length;
    mostrarTestimonio(tIndex);
  }, 5000);

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      tIndex = idx;
      mostrarTestimonio(tIndex);
    });
  });
}
