// VARIABLES GLOBALES
var current_order_step = 0; // Paso actual del pedido
var remainingTime = 600; // Tiempo restante en segundos
var interval; // Intervalo de tiempo para actualizar el temporizador
var contenido_pedido = []; // Contenido del pedido nombre_plato: cantidad
// Inicializa los índices de carrusel
let slideIndex = {};
let interval_carrusel = {};
const startTime = {};
// Llama a la función de inicialización para cada carrusel
var carruselIds = ["carrusel1", "carrusel2", "carrusel3", "carrusel4", "carrusel5", "carrusel_ficticio"];
for (var i = 0; i < carruselIds.length; i++) {
    initializecarrusel(carruselIds[i]);
  }


document.addEventListener("DOMContentLoaded", function () {
    // Mostramos las galerías
    for (var i = 0; i < carruselIds.length; i++) {
        showSlides(1, carruselIds[i]);
      }

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
    // cierre de los popup cuando el usuario hace click fuera de ellos
    window.addEventListener("click", function (event) {
        if (event.target === reg_popup) {
            closeRegPopup();
        } else if (event.target === pedido_popup) {
            closePedidoPopup();
        }
    });

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
    const bc_seleccionar = document.getElementById("bc_seleccionar");
    const bc_estado = document.getElementById("bc_estado");

    bc_revisar.addEventListener("click", irRevisar);
    bc_seleccionar.addEventListener("click", irSeleccionar);
    bc_estado.addEventListener("click", irEstadoBc);

    const botonIrPaso1 = document.getElementById("btn_ir_paso_1");
    const botonIrPaso2 = document.getElementById("btn_ir_paso_2");
    const botonIrPaso3 = document.getElementById("btn_ir_paso_3");

    botonIrPaso1.addEventListener("click", irSeleccionar);
    botonIrPaso2.addEventListener("click", irRevisar);
    botonIrPaso3.addEventListener("click", irEstado);

    // boton cancelar
    const botonCancelar = document.querySelectorAll(".btn_cancelar");
    botonCancelar.forEach(boton => {boton.addEventListener("click", cancelarPedido);});
    const botonFinalizar = document.getElementById("btn_finalizar");
    botonFinalizar.addEventListener("click", closePedidoPopup);

    // submit registro
    const botonSubmit = document.getElementById("submit_reg");
    botonSubmit.addEventListener("click", register);
});



class Plato{
    constructor (nombre, precio, cantidad){
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

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
    window.location.href = "index.html";
    form.reset();
}

function checkDNI(event){
     // Patrón que debe seguir un DNI
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

class User{
    constructor (dni, nombre, telf, email){
        this.dni = dni;
        this.nombre = nombre;
        this.telf = telf;
        this.email = email;
    }
}


function register(event){
    // se acciona cuando se pulsa submit en el formulario de registro
    event.preventDefault();
    const dni = document.getElementById("dni").value;
    const nombre = document.getElementById("nom_ap").value;
    const telf = document.getElementById("telf").value;
    const email = document.getElementById("email").value;
    
    var user = new User(dni, nombre, telf, email);
    console.log(user);
    
    // comprobar si el usuario ya existe
    var users = JSON.parse(localStorage.getItem("users"));
    if (users == null){
        users = [];
    }
    var index = users.findIndex(user => user.dni === dni);
    if (index != -1){
        alert("El usuario ya existe");
        return;
    }
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    closeRegPopup();
    alert("Usuario registrado correctamente");
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
}
function resetProductos() {
    var platosMenu = document.querySelectorAll('.plato_menu');
    try{
        platosMenu.forEach(plato => {
            var contador = plato.querySelector('.contador');
            if (contador){
                contador.innerText = "0";
            }
        });
    }catch (error){
        console.log("No se ha podido restablecer el contador de los productos: " + error);
    }
    contenido_pedido = [];
    actualizarContadorCarrito(); // Restablecer el contador del carrito
}
// botones de seleccion del pedido
function añadir_producto(event) {
    // añadir producto y cantidad al diccionario
    var contador = event.target.parentNode.querySelector('.contador');
    var platoMenu = event.target.closest('.plato_menu');
    var nombre_plato = platoMenu.querySelector('.nombre_plato').innerText;
    var precio_plato = platoMenu.querySelector('.precio').innerText;
    var cantidad = parseInt(contador.innerText);

    // find the index of the element
    var index = contenido_pedido.findIndex(plato => plato.nombre === nombre_plato);

    if (index == -1) {
        contenido_pedido.push(new Plato(nombre_plato, precio_plato, ++cantidad));
    }
    else {
        contenido_pedido[index].cantidad += 1;
    }
    
    contador.innerText = parseInt(contador.innerText) + 1;
    actualizarContadorCarrito();
}
function quitar_producto(event) {
    var contador = event.target.parentNode.querySelector('.contador');
    var platoMenu = event.target.closest('.plato_menu');
    var nombre_plato = platoMenu.querySelector('.nombre_plato').innerText;
    
    // find the index of the element
    var index = contenido_pedido.findIndex(plato => plato.nombre === nombre_plato);
    if (index == -1) {
        return; // No se ha encontrado el elemento
    }
    if (contenido_pedido[index].cantidad <= 1) {
        contenido_pedido.splice(index, 1);
        contador.innerText = "0";
    }
    else {
        contenido_pedido[index].cantidad -= 1;
        contador.innerText = parseInt(contador.innerText) - 1;
    }
    actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
    var carrito = document.getElementById("carrito");
    var contador = 0;
    for (var i = 0; i < contenido_pedido.length; i++) {
        contador += contenido_pedido[i].cantidad;
    }
    carrito.innerText = contador;
}

// funciones de navegación en los pasos del pedido
// ir al paso 1
function irSeleccionar() {
    if (current_order_step == 3) {
        alert("No puedes editar un pedido ya realizado");
        return; // No se puede volver al paso 1 si no se ha pasado por el paso 2
    }
    const Paso1 = document.getElementById("seleccionar_productos");
    const Paso2 = document.getElementById("revision_pedido");
    const miga_paso_2 = document.getElementById("bc_revisar");
    const carrito = document.getElementById("carrito_container");
    Paso2.style.visibility = "hidden";
    Paso2.style.display = "none";
    Paso1.style.visibility = "visible";
    Paso1.style.display = "flex";
    carrito.style.visibility = "visible";
    carrito.style.display = "flex";
    current_order_step = 1; // Paso actual del pedido
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
    if (current_order_step != 3) {
        miga_paso_3.style.color = "#b3bec9";
    }
    miga_paso_1.style.color = "#01447e";
    if (current_order_step == 1) {
        current_order_step = 2; // Paso actual del pedido
    }
    actualizar_lista_pedido();
}
function actualizar_lista_pedido() {
    const lista_pedido = document.getElementById("lista_pedido");
    lista_pedido.innerHTML = "";
    for (i = 0; i < contenido_pedido.length; i++) {
        var plato = contenido_pedido[i];
        var nombre = plato.nombre;
        var precio = plato.precio;
        var cantidad = plato.cantidad;
        var platoHTML = `
        <div class="plato_menu">
            <p class="nombre_plato">${nombre}</p>
            <p class="precio">${precio} - x${cantidad}</p>
        </div>`;
        lista_pedido.innerHTML += platoHTML;
    }
    actualizar_total_pedido();
}
function actualizar_total_pedido() {
    const total_pedido = document.getElementById("precio_total");
    var total = 0;
    for (i = 0; i < contenido_pedido.length; i++) {
        var plato = contenido_pedido[i];
        var precioTexto = plato.precio;
        var precioNumero = parseFloat(precioTexto.replace('$', ''));
        var cantidad = plato.cantidad;
        console.log(precioNumero, cantidad);
        total += precioNumero * cantidad;
    }
    total_pedido.innerText = "Total: $" + total.toFixed(2);
}

// ir al paso 3
function irEstado() {
    const Paso2 = document.getElementById("revision_pedido");
    const Paso3 = document.getElementById("estado_pedido");
    const miga_paso_1 = document.getElementById("bc_seleccionar");
    const miga_paso_2 = document.getElementById("bc_revisar");
    const miga_paso_3 = document.getElementById("bc_estado");

    Paso2.style.visibility = "hidden";
    Paso2.style.display = "none";
    Paso3.style.visibility = "visible";
    Paso3.style.display = "flex";
    miga_paso_2.style.color = "#01447e";
    miga_paso_3.style.color = "#01447e";
    current_order_step = 3; // Paso actual del pedido
    // Iniciamos el contador inmediatamente para evitar el delay
    updateTimer();
    if (!interval) {
        interval = setInterval(updateTimer, 1000);
    }
    miga_paso_2.innerText = "Revisar pedido";
    miga_paso_1.style.textDecoration = "line-through";
    miga_paso_1.style.color = "#b3bec9";
}

function irEstadoBc() {
    if (current_order_step != 3) {
        return; // No se puede ir al paso 3 si no se ha pagado ya
    }
    irEstado();
}

function cancelarPedido() {
    console.log("cancelar pedido");
    current_order_step = 0;
    resetProductos();
    irSeleccionar();
    closePedidoPopup();
}

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
    // actualizar barra de progreso
    const barra_progreso = document.getElementById("barra_progreso");
    const porcentaje = (remainingTime / 600) * 100;
    // Usamos requestAnimationFrame para sincronizar las actualizaciones
    requestAnimationFrame(() => {
        barra_progreso.style.width = porcentaje + "%";
    });
}


// Carrusel de imagenes

// Agrega una función para inicializar los índices de cada carrusel
function initializecarrusel(carruselId) {
    slideIndex[carruselId] = 1;
    // Iniciamos el carrusel automático
    interval_carrusel[carruselId] = startAutocarrusel(carruselId);
}
function plusSlides(n, carruselId) {
    showSlides(slideIndex[carruselId] += n, carruselId);
}

function currentSlide(n, carruselId) {
    showSlides(slideIndex[carruselId] = n, carruselId);
}

function showSlides(n, carruselId) {
    let i;
    let slides = document.getElementById(carruselId).getElementsByClassName("img_con_desc");

    if (n > 3) {
        slideIndex[carruselId] = 1;
    }
    if (n < 1) {
        slideIndex[carruselId] = 3;
    }

    for (i = 0; i < 3; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex[carruselId] - 1].style.display = "block";
    
}


function startAutocarrusel(carruselId) {
    // Devuelve el identificador del temporizador
    return setInterval(function () {
        plusSlides(1, carruselId);
        startTime[carruselId] = Date.now();
    }, 3000); // Cambia cada wait = 3000ms = 3 segundos.
}

function pauseAutocarrusel(carruselId){
    clearInterval(interval_carrusel[carruselId])
}

function resumeAutocarrusel(carruselId){
    // Los coordinamos haciendo que se esperen entre ellos
    wait = 3000 - (Date.now() - startTime["carrusel5"]);
    setTimeout(function(){
        interval_carrusel[carruselId] = startAutocarrusel(carruselId);
    }, wait)     
}

function showNavigation(carruselId) {
    // Pausamos el desplaamiento automático
    pauseAutocarrusel(carruselId)
    // Mostrar las flechas "prev" y "next" y el número "numbertext"
    const carrusel = document.getElementById(carruselId);
    const prevButton = carrusel.querySelector('.prev');
    const nextButton = carrusel.querySelector('.next');
    const numbertext = carrusel.querySelectorAll('.numbertext');
  
    if (prevButton) {
      prevButton.style.display = 'block';
    }
    if (nextButton) {
      nextButton.style.display = 'block';
    }
    if (numbertext.length > 0) {
      numbertext.forEach((text) => {
        text.style.display = 'block';
      });
    }
  }
  
  function hideNavigation(carruselId) {
    // Ocultar las flechas "prev" y "next" y el número "numbertext"
    const carrusel = document.getElementById(carruselId);
    const prevButton = carrusel.querySelector('.prev');
    const nextButton = carrusel.querySelector('.next');
    const numbertext = carrusel.querySelectorAll('.numbertext');
  
    if (prevButton) {
      prevButton.style.display = 'none';
    }
    if (nextButton) {
      nextButton.style.display = 'none';
    }
    if (numbertext.length > 0) {
      numbertext.forEach((text) => {
        text.style.display = 'none';
      });
    }

    // Reanudamos el desplazamiento automático
    resumeAutocarrusel(carruselId)
  }
  