//Variable

let carritoDecompras=[];

const elementos = document.querySelector('.elementos');

const contenedorCarrito = document.getElementById('carrito-contenidado');


const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');


//Funciones

const productosAsync = async function (){

    const direccion = './data.json';

    const respuesta = await fetch(direccion);
    console.log("volvio y tengo respuesta");

    const productosData = await respuesta.json();


    dibujarElementos(productosData);

    console.log("ya esta el JSON",productosData);

    //declaracion

    function dibujarElementos(data){
        elementos.innerHTML=' ';
        data.forEach(elemento=>{
            let div = document.createElement('div');
            div.className='producto';

            div.innerHTML += `
                                <div class="tarjeta">
                                <h2>${elemento.nombre}</h2>
                                <p>${elemento.marca}</p>
                                <p>descripcion: ${elemento.descripcion}</p>
                                <h3>$${elemento.precio}</h3>
                                <img class="tarjeta__img" src="${elemento.img}" alt="${elemento.nombre}" width="400">
                                
                                <div id="btn${elemento.id}" class="btnAlCarrito">Agregar</div>
                                        
                                </div>
                                `;
            elementos.appendChild(div);
            
            
            let btnMenodd = document.getElementById(`btn${elemento.id}`);
            btnMenodd.addEventListener('click', ()=>{
                agregarAlCarrito(elemento.id);

                /* toastify */
                Toastify({
                    text: "Se Agrego Produto al carrito",
                    duration: 1000,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    style: {
                      background: "radial-gradient(circle, rgba(206,152,53,0.6937149859943977) 15%, rgba(5,209,209,0.7497373949579832) 69%)",
                    }
                    
                  }).showToast();


            })
        });
    }


    function agregarAlCarrito(id){
        let existe= carritoDecompras.find(produc => produc.id == id);
        if(existe){
            existe.cantidad = existe.cantidad + 1;
            document.getElementById(`cant${existe.id}`).innerHTML = `<p id="cant${existe.id}">cantida: ${existe.cantidad}</p>`;
            actualizarCarrito();
        } else {
            let productoAgregar = productosData.find(item => item.id == id)
            productoAgregar.cantidad = 1;
            carritoDecompras.push(productoAgregar);
            mostrarCarrito(productoAgregar); //llevo el array
            actualizarCarrito();
            console.log(carritoDecompras);
        }
    }

        


    function mostrarCarrito(producto){
        let div=document.createElement('div');
        div.setAttribute('class','productoEnCarrito');
        div.innerHTML = `<p>produto: ${producto.nombre}</p>
                        <p">precio: $${producto.precio}</p>
                        <p id="cant${producto.id}">cantida: ${producto.cantidad}</p>
                        <button class="botonEliminar" id="eliminar${producto.id}"><img src="./img/eliminar.png" alt="" width="15"></button>
                        <hr>
                        `;
        contenedorCarrito.appendChild(div);

        let btnEliminar = document.getElementById(`eliminar${producto.id}`);
        btnEliminar.addEventListener('click',()=>{
            if(producto.cantidad == 1){
                carritoDecompras = carritoDecompras.filter(item => item.id !== producto.id);
            btnEliminar.parentElement.remove();
            actualizarCarrito();
            } else {
                producto.cantidad = producto.cantidad - 1;
                document.getElementById(`cant${producto.id}`).innerHTML = `<p id="cant${producto.id}">cantida: ${producto.cantidad}</p>`;
                actualizarCarrito();
            }

        })

        
    }


    function actualizarCarrito(){
        contadorCarrito.innerText=carritoDecompras.reduce((acc,el)=> acc + el.cantidad, 0);
        precioTotal.innerText = carritoDecompras.reduce((acc,el)=>acc + (parseInt(el.precio)*el.cantidad),0); 
    }
  
}
///////////////////////////////////////////


productosAsync();


let verCarrito = document.querySelector('.seccionUsuarios__img');
verCarrito.addEventListener('click', ()=>{
    let ver = document.getElementById('carrito-contenidado'); 
    ver.classList.toggle('verCarrito');
    // alert('gracias por su compra')
 })

 const btnFinalizar = document.querySelector('#btn-finalizar');
 btnFinalizar.addEventListener('click', ()=>{

    Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Gracias por su Compra!!!',
        showConfirmButton: false,
        timer: 2500
      })
 })
 
