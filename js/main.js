// VARIABLES GLOBALES
var current_order_step = 0; // Paso actual del pedido



// REGISTRO
function openRegPopup() {
    const reg_popup = document.getElementById("reg_popup");
    reg_popup.style.display = "flex";
    reg_popup.style.visibility = "visible";
    document.body.style.overflow = "hidden";
}
function closeRegPopup() {
    const reg_popup = document.getElementById("reg_popup");
    reg_popup.style.display = "none";
    document.body.style.overflow = "auto";
    const form = reg_popup.querySelector("form");
    alert("¿Seguro que desea cancelar la operación?");
    // O redirige a otra página:
    window.location.href = "index.html";
    form.reset();
}

// event must be a input event 
function checkDNI(event){
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
}

// RELIZAR PEDIDO
function openPedidoPopup() {
    const pedido_popup = document.getElementById("pedido_popup");
    pedido_popup.style.display = "flex";
    pedido_popup.style.visibility = "visible";
    document.body.style.overflow = "hidden";
    current_order_step = 1; // Paso actual del pedido
}
function closePedidoPopup() {
    const pedido_popup = document.getElementById("pedido_popup");
    pedido_popup.style.display = "none";
    pedido_popup.style.overflow = "none"; // Restablece el desplazamiento de la página principal
    document.body.style.overflow = "auto"; // Restablece el desplazamiento de la página principal
    resetProductos();
}
function resetProductos() {
    var platosMenu = document.querySelectorAll('.plato_menu');
    platosMenu.forEach(plato => {
        var contador = plato.querySelector('.contador');
        contador.innerText = "0";
    });
    actualizarCarrito(); // Restablecer el contador del carrito
}
// botones de seleccion del pedido
function añadir_producto(event) {
    var contador = event.target.parentNode.querySelector('.contador');
    contador.innerText = parseInt(contador.innerText) + 1;
    actualizarCarrito();
}
function quitar_producto(event) {
    var contador = event.target.parentNode.querySelector('.contador');
    if (parseInt(contador.innerText) > 0) {
        contador.innerText = parseInt(contador.innerText) - 1;
    }
    actualizarCarrito();
}

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

// funciones de navegación en los pasos del pedido
// ir al paso 1
function irSeleccionar() {
    if (current_order_step != 2) {
        console.log("No se puede volver al paso 1 si no se ha pasado por el paso 2");
        return; // No se puede volver al paso 1 si no se ha pasado por el paso 2
    }
    const Paso1 = document.getElementById("seleccionar_productos");
    const Paso2 = document.getElementById("revision_pedido");
    const miga_paso_2 = document.getElementById("bc_revisar");
    const carrito = document.getElementById("carrito_container");
    console.log("Cambiar a paso 1");
    Paso2.style.visibility = "hidden";
    Paso2.style.display = "none";
    Paso1.style.visibility = "visible";
    Paso1.style.display = "flex";
    carrito.style.visibility = "visible";
    carrito.style.display = "flex";
    current_order_step = 1; // Paso actual del pedido
    console.log("Paso actual: " + current_order_step);
}
// ir al paso 2
function irRevisar() {
    const Paso1 = document.getElementById("seleccionar_productos");
    const Paso2 = document.getElementById("revision_pedido");
    const Paso3 = document.getElementById("estado_pedido");
    const miga_paso_1 = document.getElementById("bc_seleccionar");
    const miga_paso_2 = document.getElementById("bc_revisar");
    const miga_paso_3 = document.getElementById("bc_estado");

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
    miga_paso_1.style.color = "#01447e";
    if (current_order_step == 1) {
        current_order_step = 2; // Paso actual del pedido
    }
    console.log("Paso actual: " + current_order_step);
}
function irEstado() {
    const Paso2 = document.getElementById("revision_pedido");
    const Paso3 = document.getElementById("estado_pedido");
    const miga_paso_2 = document.getElementById("bc_revisar");
    const miga_paso_3 = document.getElementById("bc_estado");

    Paso2.style.visibility = "hidden";
    Paso2.style.display = "none";
    Paso3.style.visibility = "visible";
    Paso3.style.display = "flex";
    miga_paso_2.style.color = "#b3bec9";
    miga_paso_3.style.color = "#b3bec9";
    current_order_step = 3; // Paso actual del pedido
    console.log("Paso actual: " + current_order_step);
}




document.addEventListener("DOMContentLoaded", function () {
    // cierre de los popup cuando el usuario hace click fuera de ellos
    window.addEventListener("click", function (event) {
        if (event.target === reg_popup) {
            closeRegPopup();
        } else if (event.target === pedido_popup) {
            closePedidoPopup();
        }
    });


    // apertura y cierre del popup de registro
    const openRegButton = document.getElementById("open_reg");
    const closeRegButton = document.getElementById("close_reg");
    openRegButton.addEventListener("click", openRegPopup);
    closeRegButton.addEventListener("click", closeRegPopup);
    const dni_input = document.getElementById("dni");
    dni_input.addEventListener("input", checkDNI);
    // apertura y cierre del popup de pedido
    const openPedidoButton = document.getElementById("open_pedido");
    const closePedidoButton = document.getElementById("close_pedido");
    openPedidoButton.addEventListener("click", openPedidoPopup);
    closePedidoButton.addEventListener("click", closePedidoPopup);
    // botones de seleccion del pedido
    const platosMenu = document.querySelectorAll('.plato_menu');
    platosMenu.forEach(plato => {
        var botonMas = plato.querySelector('.añadir_producto');
        var botonMenos = plato.querySelector('.eliminar_producto');
        botonMas.addEventListener('click', añadir_producto);
        botonMenos.addEventListener('click', quitar_producto);
    });
    // Limpiar el carrito
    const limpiarCarrito = document.getElementById("limpiar_selecciones");
    limpiarCarrito.addEventListener("click", resetProductos);

    // botones de navegación entre pasos
    const bc_revisar = document.getElementById("bc_revisar");
    const bc_estado = document.getElementById("bc_estado");
    const bc_seleccionar = document.getElementById("bc_seleccionar");

    bc_revisar.addEventListener("click", irRevisar);
    bc_seleccionar.addEventListener("click", irSeleccionar);


});