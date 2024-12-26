document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    const carritoContainer = document.getElementById('carrito-container');
    const totalCantidad = document.getElementById('total-cantidad');
    const totalPrecio = document.getElementById('total-precio');
    const comprarTodoBtn = document.getElementById('comprar-todo');
    const modal = document.getElementById('modal-compra');
    const cerrarModal = document.getElementById('cerrar-modal');

    let carrito = JSON.parse(localStorage.getItem('cart')) || [];

    function renderizarCarrito() {
        updateCartCount();
        carritoContainer.innerHTML = '';
        let cantidadTotal = 0;
        let precioTotal = 0;

        carrito.forEach(producto => {
            precioTotal += producto.precio * producto.cantidad;

            const div = document.createElement('div');
            div.className = 'carrito-item';
            div.innerHTML = `
                <div class="d-flex justify-content-between align-items-center border-bottom py-2">
                    <img src="${producto.img}" alt="${producto.nombre}" width="50">
                    <span>${producto.nombre}</span>
                    <span>${producto.cantidad}</span>
                    <span>$${producto.precio}</span>
                    <span>$${producto.precio * producto.cantidad}</span>
                    <button class="btn btn-danger btn-sm" data-id="${producto.id}">Eliminar</button>
                </div>
            `;
            carritoContainer.appendChild(div);
        });

        totalPrecio.textContent = precioTotal;

        document.querySelectorAll('.btn-danger').forEach(boton => {
            boton.addEventListener('click', eliminarProducto);
        });
        console.log(JSON.parse(localStorage.getItem('cart')));
    }

    function eliminarProducto(event) {
        const id = parseInt(event.target.getAttribute('data-id'));
        const indice = carrito.findIndex(producto => producto.id === id);

        if (indice !== -1) {
            carrito.splice(indice, 1);
            localStorage.setItem('cart', JSON.stringify(carrito));
            renderizarCarrito();
        }
    }

    function vaciarCarrito() {
        carrito = [];
        localStorage.removeItem('cart');
        renderizarCarrito();
    }

    function mostrarModal() {
        modal.style.display = 'block';
    }

    cerrarModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    comprarTodoBtn.addEventListener('click', () => {
        if (carrito.length > 0) {
            vaciarCarrito();
            mostrarModal();
        }
    });

    renderizarCarrito();
});

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function updateCartCount() {
    const cart = getCart();
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}
