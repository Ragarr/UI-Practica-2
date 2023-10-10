// ---------------------- Ventana emergente para registro de usuario ---------------------

document.addEventListener("DOMContentLoaded", function () {
    const openPopupButton = document.getElementById("open_reg");
    const closePopupButton = document.getElementById("close_reg");
    const pedidoPopup = document.getElementById("reg_popup");

    openPopupButton.addEventListener("click", function () {
        pedidoPopup.style.display = "flex";
        pedidoPopup.style.visibility = "visible";
    });

    closePopupButton.addEventListener("click", function () {
        pedidoPopup.style.display = "none";
    });

    // Close the pop-up if the user clicks outside of it
    window.addEventListener("click", function (event) {
        if (event.target === pedidoPopup) {
            pedidoPopup.style.display = "none";
        }
    });

    // Prevent the pop-up from closing when clicking inside the form
    pedidoPopup.querySelector("form").addEventListener("click", function (event) {
        event.stopPropagation();
    });
});


// -------------------------------- Comprobación del DNI -------------------------

document.addEventListener("DOMContentLoaded", function () {
    var dni_input = document.getElementById("dni");

    dni_input.addEventListener("input", function(event) {
        
        // Patrón quew debe seguir un DNI
        const DNI_pattern = /^[0-9]{8}[A-Z]{1}$/
        // Letras que toma el DNI dependiendo del resto
        const letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 
                        'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];

        var dni = event.target.value;

        // Comprobamos si el DNI tiene 8 dígitos y una letra
        if (!DNI_pattern.test(dni)) {
            event.target.setCustomValidity("El DNI debe tener 8 dígitos y 1 letra");
        } else {
            // Obtenemos los números
            var numDNI = parseInt(dni.substring(0, 8));
            // Obtenemos la letra
            var letraDNI = dni.substring(8, 9);
            // Calculamos la letra correspondiente al número
            var letraCorrecta = letras[numDNI % 23];

            if (letraDNI !== letraCorrecta) {
                event.target.setCustomValidity("El DNI no es correcto");
            } else {
                event.target.setCustomValidity(""); // La entrada es válida
            }
        }
    });
});


// ------------------------- Función del botón de cancelar registro --------------------

function cancelarRegistro() {
    // Realiza la acción deseada, como redireccionar a otra página o mostrar un mensaje
    // Por ejemplo:
    alert("¿Seguro que desea cancelar el registro?");
    // O redirige a otra página:
    window.location.href = "index.html";
}



// ----------------------- Ventana emergente para hacer un pedido --------------------

document.addEventListener("DOMContentLoaded", function () {
    const openPopupButton = document.getElementById("open_pedido");
    const closePopupButton = document.getElementById("close_pedido");
    const pedidoPopup = document.getElementById("pedido_popup");

    openPopupButton.addEventListener("click", function () {
        pedidoPopup.style.display = "flex";
        pedidoPopup.style.visibility = "visible";
    });

    closePopupButton.addEventListener("click", function () {
        pedidoPopup.style.display = "none";
    });

    // Close the pop-up if the user clicks outside of it
    window.addEventListener("click", function (event) {
        if (event.target === pedidoPopup) {
            pedidoPopup.style.display = "none";
        }
    });

    // Prevent the pop-up from closing when clicking inside the form
    pedidoPopup.querySelector("form").addEventListener("click", function (event) {
        event.stopPropagation();
    });
});