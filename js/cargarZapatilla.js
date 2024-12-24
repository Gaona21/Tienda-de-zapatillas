document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    const title = document.querySelector('title');
    const zapatillaId = localStorage.getItem('zapatillaId');

    if (zapatillaId) {
        fetch("../json/zapatillas.json")
            .then(response => response.json())
            .then(data => {
                const zapatilla = data.find(item => item.id === Number(zapatillaId));
                title.textContent = zapatilla.nombre;

                if (zapatilla) {
                    const contenedorZapatillas = document.querySelector('.contenedorZapatillas');

                    contenedorZapatillas.innerHTML = `
                        <div class="contenedorImg">
                            <img class="imgZapatillas" src="${zapatilla.img}" alt="${zapatilla.nombre}">
                        </div>
                        <div class="separadorVertical"></div>
                        <div class="contenedorBody">
                            <h1 class="TituloZapatilla">${zapatilla.nombre}</h1>
                            <h2 class="tituloPrecio">$${zapatilla.precio}</h2>
                            <p class="description">${zapatilla.descripcion}</p>
                            <div class="caracteristicas">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Material: ${zapatilla.material}</li>
                                    <li class="list-group-item">Suela: ${zapatilla.suela}</li>
                                    <li class="list-group-item">Color: ${zapatilla.color}</li>
                                    <li class="list-group-item">Modelo: ${zapatilla.modelo}</li>
                                    <li class="list-group-item">Marca: ${zapatilla.marca}</li>
                                </ul>
                            </div>
                            <button class="botonComprar" id="add-to-cart-btn">Comprar</button>
                        </div>
                    `;

                    document.getElementById('add-to-cart-btn').addEventListener('click', () => {
                        addToCart(zapatilla);
                        alert('Zapatilla agregada al carrito');
                    });
                    
                    cargarSugerencias(data, zapatillaId);
                    loader.style.display = 'none';
                } else {
                    console.error('Zapatilla no encontrada');
                }
            })
            .catch(error => console.error('Error al cargar el JSON:', error));
    } else {
        console.error('No hay ID de zapatilla en el local storage');
    }
});

function cargarSugerencias(data, zapatillaId) {
    const contenedorSugerencias = document.querySelector('.ContenedorSugerencia--Card');
    contenedorSugerencias.innerHTML = '';

    const filtradas = data.filter(item => item.id !== Number(zapatillaId));

    const sugerencias = seleccionarAleatorias(filtradas, 13);

    sugerencias.forEach(zapatilla => {
        const divSugerencia = document.createElement('div');
        divSugerencia.className = 'sugerencia';
        divSugerencia.innerHTML = `
            <a href="../paginas/zapatilla.html" class="botonCard" data-id="${zapatilla.id}">
                <img src="${zapatilla.img}" alt="${zapatilla.nombre}">
            </a>
        `;
        contenedorSugerencias.appendChild(divSugerencia);
    });
}

function seleccionarAleatorias(array, num) {
    const shuffled = array.sort(() => 0.5 - Math.random()); // Mezclar el array
    return shuffled.slice(0, num); // Devolver los primeros 'num' elementos
}

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function addToCart(item) {
    const cart = getCart();
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const cart = getCart();
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}
