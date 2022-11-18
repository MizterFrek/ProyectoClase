//Inyeccion de etiquetas en el HTML
stockProductos_guitarras.forEach((producto) => {

    const div = document.createElement('div')
    div.innerHTML = `
    <div class="producto">
        <div class="imagen">
          <img src="${producto.img}" alt="Imagen Producto" width="600" height="400">
        </div>
        <div class="desc">
            <div class="compartir-producto">
                <p>Compartir en: </p>
                <a href="https://www.facebook.com/" target="_blank"><i class="bi bi-facebook fb-icon"></i></a>
                <a href="https://web.whatsapp.com/" target="_blank"><i class="bi bi-whatsapp whts-icon"></i></a>     
            </div>
            <div class="descripcion-producto">
                <p class="producto-nombre"><b>${producto.nombre}</b></p>
                <p class="producto-desc">Marca: ${producto.marca}</p>
                <p class="producto-desc">Modelo: ${producto.modelo}</p>
            </div>
            <div class="precio-producto">
                <p class="producto-nombre"><b>S/${producto.precio}.00</b></p>
                <div class="puntuacion">
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                </div>
            </div>
            <div class="cantidad-producto">
                <div class="cantidad">
                    <label for="cantidad">Cantidad</label>
                    <input type="number" id="cantidadProducto${producto.id}" name="cantidad" min="1" value="1">
                </div>
                <button id="agregar${producto.id}" class="btn-carrito">
                    <i class="bi bi-cart-plus"></i>
                    Añadir al carrito
                </button>
            </div>
        </div>
    </div>
    `
    contenedorProductos.appendChild(div)

    
    const boton = document.getElementById(`agregar${producto.id}`)
    //Por cada elemento de mi array, creo un div, lo cuelgo, le pongo un id particular, una vez colgado
    //le hago un get element by id (el de agregar) Obtengo el elemento y a dicho elemento le agregamos
    //el add event listener
    
    
    boton.addEventListener('click', () => {
        //esta funcion ejecuta el agregar el carrito con la id del producto
        const cantidadProducto = parseInt(document.getElementById(`cantidadProducto${producto.id}`).value)
        agregarAlCarrito(producto.id, cantidadProducto)
        
    })
})


//AGREGAR AL CARRITO
const agregarAlCarrito = (prodId , cantProd) => {

    //PARA AUMENTAR LA CANTIDAD Y QUE NO SE REPITA
    const existe = carrito.some (prod => prod.id === prodId) //comprobar si el elemento ya existe en el carro

    if (existe){ //SI YA ESTÁ EN EL CARRITO, ACTUALIZAMOS LA CANTIDAD
        const prod = carrito.map (prod => { //creamos un nuevo arreglo e iteramos sobre cada curso y cuando
            // map encuentre cual es el q igual al que está agregado, le suma la cantidad
            if (prod.id === prodId){
                prod.cantidad = prod.cantidad + cantProd
                
            }
        })
    } else { //EN CASO DE QUE NO ESTÉ, AGREGAMOS EL CURSO AL CARRITO
        const item = stockProductos_guitarras.find((prod) => prod.id === prodId)//Trabajamos con las ID
        //Una vez obtenida la ID, lo que haremos es hacerle un push para agregarlo al carrito
        item.cantidad = cantProd;
        console.log(item)
        carrito.push(item)
    }
    //Va a buscar el item, agregarlo al carrito y llama a la funcion actualizarCarrito, que recorre
    //el carrito y se ve.
    actualizarCarrito() //LLAMAMOS A LA FUNCION QUE CREAMOS EN EL TERCER PASO. CADA VEZ Q SE 
    //MODIFICA EL CARRITO
}
//agregarAlCarrito(1) //Le pasamos el ID por parametro. Tenemos que asigarle como evento esta funcion al boton
//con el id de su producto correspondiente


const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) //Busca el elemento q yo le pase y nos devuelve su indice.

    carrito.splice(indice, 1) //Le pasamos el indice de mi elemento ITEM y borramos 
    // un elemento 
    actualizarCarrito() //LLAMAMOS A LA FUNCION QUE CREAMOS EN EL TERCER PASO. CADA VEZ Q SE 
    //MODIFICA EL CARRITO
    console.log(carrito)
}

const actualizarCarrito = () => {
    
    //LOS APPENDS SE VAN ACUMULANDO CON LO QE HABIA ANTES
    contenedorCarrito.innerHTML = "" //Cada vez que yo llame a actualizarCarrito, lo primero q hago
    //es borrar el nodo. Y despues recorro el array lo actualizo de nuevo y lo rellena con la info
    //actualizado
    //3 - TERCER PASO. AGREGAR AL MODAL. Recorremos sobre el array de carrito.

    //Por cada producto creamos un div con esta estructura y le hacemos un append al contenedorCarrito (el modal)
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
 
        <img src="${prod.img}" alt="Imagen Producto" width="80">

        <div>
        <b><p>${prod.nombre}</p></b>
        <p><b>Precio:</b> $${prod.precio}</p>
        <p><b>Cantidad:</b> <span id="cantidad">${prod.cantidad}</span></p>
        </div>
        <div>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        </div>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

    //SEPTIMO PASO
    contadorCarrito.innerText = carrito.length // actualizamos con la longitud del carrito.
    //OCTAVO PASO
    console.log(carrito)
    var total = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    //Por cada producto q recorro en mi carrito, al acumulador le suma la propiedad precio, con el acumulador
    //empezando en 0.
    // console.log(typeof carrito == 'undefined' || Object.entries(carrito).length)

    if(Object.entries(carrito).length === 0)
    {
        botonComprar.classList.add("not-active");
        precioTotal.innerHTML=`No hay Productos en el Carrito`
    }
    else
    {
        botonComprar.classList.remove("not-active");
        precioTotal.innerHTML=`Precio total: S/. ${total}.00`
    }

}
