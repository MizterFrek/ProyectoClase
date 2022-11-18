const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const VistaCarrito       = document.getElementById('Vista-Carrito');
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]

const botonComprar = document.getElementById('btn-Comprar')
//Aqui se muestran los productos
const contenedorProductos   = document.getElementById('contenedor-productos')

//El numero que indica en el icono de carro cuantos productos hay
const contadorCarrito       = document.getElementById('contadorCarrito')
//Vista del carrito
const contenedorCarrito     = document.getElementById('carrito-contenedor')


//boton de la vista del carrito para cerrar ventana
const botonVaciar   = document.getElementById('vaciar-carrito')
const cantidad      = document.getElementById('cantidad')
const precioTotal   = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')


let carrito = []


botonAbrir.addEventListener('click', ()=>{
    VistaCarrito.showModal();
})

botonCerrar.addEventListener('click', ()=>{
    VistaCarrito.close();
})

contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')

})

modalCarrito.addEventListener('click', (event) => {
    event.stopPropagation() //cuando clickeo sobre el modal se finaliza la propagacion del click a los elementos
    //padre
})

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})
