// ---------------------- Ventana emergente para registro de usuario ---------------------

document.addEventListener("DOMContentLoaded", function () {
    const openPopupButton = document.getElementById("open_reg");
    const closePopupButton = document.getElementById("close_reg");
    const pedidoPopup = document.getElementById("reg_popup");

    openPopupButton.addEventListener("click", function () {
        pedidoPopup.style.display = "flex";
        pedidoPopup.style.visibility = "visible";
        document.body.style.overflow = "hidden";
    });

    closePopupButton.addEventListener("click", function () {
        pedidoPopup.style.display = "none";
        document.body.style.overflow = "auto"; // Restablece el desplazamiento de la página principal
        // Restablece el contenido del formulario
        var form = pedidoPopup.querySelector("form");
        form.reset();
    });

    // Close the pop-up if the user clicks outside of it
    window.addEventListener("click", function (event) {
        if (event.target === pedidoPopup) {
            pedidoPopup.style.display = "none";
            document.body.style.overflow = "auto"; // Restablece el desplazamiento de la página principal
            // Restablece el contenido del formulario
            var form = pedidoPopup.querySelector("form");
            form.reset();
        }
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
        document.body.style.overflow = "hidden";
        
    });

    closePopupButton.addEventListener("click", function () {
        pedidoPopup.style.display = "none";
        document.body.style.overflow = "auto"; // Restablece el desplazamiento de la página principal
        // Restablecemos los productos seleccionados
        resetProductos();
    });

    // Close the pop-up if the user clicks outside of it
    window.addEventListener("click", function (event) {
        if (event.target === pedidoPopup) {
            pedidoPopup.style.display = "none";
            pedidoPopup.style.overflow = "none"; // Restablece el desplazamiento de la página principal
            document.body.style.overflow = "auto"; // Restablece el desplazamiento de la página principal
            resetProductos();
        }
    });
});

// BOTONES DE SELECCION DE PEDIDO
document.addEventListener("DOMContentLoaded", function() {
    const platosMenu = document.querySelectorAll('.plato_menu');

    platosMenu.forEach(plato => {
        var botonMas = plato.querySelector('.añadir_producto');
        var botonMenos = plato.querySelector('.eliminar_producto');
        var contador = plato.querySelector('.contador');
        botonMas.addEventListener('click', function() {
            contador.innerText = parseInt(contador.innerText) + 1;
            actualizarCarrito();
        });
        botonMenos.addEventListener('click', function() {
            if (contador.innerText > 0) {
                contador.innerText = parseInt(contador.innerText) - 1;
                actualizarCarrito();
            }
        });

    });
});


// contador del carrito
function actualizarCarrito() {
    var carrito = document.getElementById("carrito");
    var contador = 0;
    var suma = 0;
    var platosMenu = document.getElementsByClassName("plato_menu");
    for (var platoMenu of platosMenu){
        var contador = platoMenu.getElementsByTagName("p")[2]; // El contador está en la tercera posición
        contador = parseInt(contador.innerText);
        suma += contador;
    }
    carrito.innerText = suma;
}

// Reestablecer contadores
function resetProductos() {
    var platosMenu = document.querySelectorAll('.plato_menu');
    platosMenu.forEach(plato => {
        var contador = plato.querySelector('.contador');
        contador.innerText = "0";
    });
    actualizarCarrito(); // Restablecer el contador del carrito
}

// Funcion para ir a paso 1
function irPaso1(){
    const Paso1 = document.getElementById("elegir_pedido");
    const Paso2 = document.getElementById("revision_pedido");
    const miga_paso_2 = document.getElementById("paso_2");
    const carrito = document.getElementById("carrito_container");

    Paso2.style.visibility = "hidden";
    Paso2.style.display = "none";
    Paso1.style.visibility = "visible";
    Paso1.style.display = "flex";
    carrito.style.visibility = "visible";
    carrito.style.display = "flex";
    miga_paso_2.style.color = "#b3bec9";
}

// Funcion para ir a paso 2
function irPaso2(){
    const Paso1 = document.getElementById("elegir_pedido");
    const Paso2 = document.getElementById("revision_pedido");
    const Paso3 = document.getElementById("estado_pedido");
    const miga_paso_2 = document.getElementById("paso_2");
    const miga_paso_3 = document.getElementById("paso_3");
    const carrito = document.getElementById("carrito_container");

    Paso1.style.visibility = "hidden";
    Paso1.style.display = "none";
    Paso3.style.visibility = "hidden";
    Paso3.style.display = "none";
    carrito.style.visibility = "hidden";
    carrito.style.display = "none";
    Paso2.style.visibility = "visible";
    Paso2.style.display = "flex";
    miga_paso_2.style.color = "#01447e";
    miga_paso_3.style.color = "#b3bec9";

}



document.addEventListener("DOMContentLoaded", function() {
    const timer = document.getElementById("timer");
    const btn_ir_paso_3 = document.getElementById("btn_ir_paso_3");
    const Paso2 = document.getElementById("revision_pedido");
    const Paso3 = document.getElementById("estado_pedido");
    const miga_paso_3 = document.getElementById("paso_3");

    const startTime = 600; // 10 minutes in seconds
    let remainingTime = startTime;
    let interval;

    function updateTimer() {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timer.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (remainingTime <= 0) {
            clearInterval(interval);
            timer.textContent = "0:00";
        } else {
            remainingTime--;
        }
    }

    // Para evitar delay
    updateTimer();

    btn_ir_paso_3.addEventListener("click", function() {
        if (!interval) {
            interval = setInterval(updateTimer, 1000);
        }
        Paso2.style.visibility = "hidden";
        Paso2.style.display = "none";
        Paso3.style.visibility = "visible";
        Paso3.style.display = "flex";
        miga_paso_3.style.color = "#01447e";
    });
});


// Barra progreso reloj
document.addEventListener("DOMContentLoaded", function() {
    const barra_progreso = document.getElementById("barra_progreso");
    const timer = document.getElementById("timer");

    const startTime = 600; // 10 minutes in seconds
    let remainingTime = startTime;
    let interval;

    function updateBarraProgreso() {
        const porcentaje = (remainingTime / startTime) * 100;
        console.log(porcentaje, remainingTime, startTime);
        barra_progreso.style.width = `${porcentaje}%`;
        remainingTime--;
    }

    // Para evitar delay
    updateBarraProgreso();

    if (!interval) {
        interval = setInterval(updateBarraProgreso, 1000);
    }
});