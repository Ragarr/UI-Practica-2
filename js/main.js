
// Ventana emergente para registro de usuario
document.addEventListener("DOMContentLoaded", function () {
    const openPopupButton = document.getElementById("open_reg");
    const closePopupButton = document.getElementById("close_reg");
    const registrationPopup = document.getElementById("reg_popup");

    openPopupButton.addEventListener("click", function () {
        registrationPopup.style.display = "flex";
        registrationPopup.style.visibility = "visible";
    });

    closePopupButton.addEventListener("click", function () {
        registrationPopup.style.display = "none";
    });

    // Close the pop-up if the user clicks outside of it
    window.addEventListener("click", function (event) {
        if (event.target === registrationPopup) {
            registrationPopup.style.display = "none";
        }
    });

    // Prevent the pop-up from closing when clicking inside the form
    registrationPopup.querySelector("form").addEventListener("click", function (event) {
        event.stopPropagation();
    });
});


function cancelarRegistro() {
    // Realiza la acción deseada, como redireccionar a otra página o mostrar un mensaje
    // Por ejemplo:
    alert("¿Seguro que desea cancelar el registro?");
    // O redirige a otra página:
    window.location.href = "index.html";
}
