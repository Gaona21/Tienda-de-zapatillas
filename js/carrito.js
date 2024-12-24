document.addEventListener('DOMContentLoaded', () => {
    const carritoContainer = document.getElementById('carrito-container');
    const totalCantidad = document.getElementById('total-cantidad');
    const totalPrecio = document.getElementById('total-precio');

    // Leer carrito desde localStorage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Función para renderizar el carrito
    function renderizarCarrito() {
        carritoContainer.innerHTML = '';
        let cantidadTotal = 0;
        let precioTotal = 0;

        carrito.forEach(producto => {
            cantidadTotal += producto.cantidad;
            precioTotal += producto.precio * producto.cantidad;

            const div = document.createElement('div');
            div.className = 'carrito-item';
            div.innerHTML = `
                <div class="d-flex justify-content-between align-items-center border-bottom py-2">
                    <img src="${producto.img}" alt="${producto.nombre}" width="50">
                    <span>${producto.nombre}</span>
                    <span>Cantidad: ${producto.cantidad}</span>
                    <span>Precio: $${producto.precio * producto.cantidad}</span>
                    <button class="btn btn-danger btn-sm" data-id="${producto.id}">Eliminar</button>
                </div>
            `;
            carritoContainer.appendChild(div);
        });

        totalCantidad.textContent = cantidadTotal;
        totalPrecio.textContent = precioTotal;

        // Agregar evento a botones de eliminar
        document.querySelectorAll('.btn-danger').forEach(boton => {
            boton.addEventListener('click', eliminarProducto);
        });
    }

    // Función para eliminar un producto del carrito
    function eliminarProducto(event) {
        const id = parseInt(event.target.getAttribute('data-id'));
        const indice = carrito.findIndex(producto => producto.id === id);

        if (indice !== -1) {
            carrito.splice(indice, 1);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            renderizarCarrito();
        }
    }

    // Actualizar carrito cuando se agrega un nuevo producto
    document.addEventListener('agregarAlCarrito', (event) => {
        const nuevoProducto = event.detail;

        // Verificar si el producto ya está en el carrito
        const productoExistente = carrito.find(producto => producto.id === nuevoProducto.id);
        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push({ ...nuevoProducto, cantidad: 1 });
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarCarrito();
    });

    // Renderizar el carrito al cargar la página
    renderizarCarrito();
});
