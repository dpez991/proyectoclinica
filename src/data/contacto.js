const form = document.getElementById("contactForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  Swal.fire({
    title: "¡Formulario enviado!",
    text: "Muchas gracias por llenar el formulario, estaremos contactándote pronto 😊",
    icon: "success",
    confirmButtonText: "Aceptar",
    confirmButtonColor: "#b71c1c"
  });

  form.reset();
});