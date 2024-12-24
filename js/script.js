const loader = document.getElementById('loader');
loader.style.display = 'block';

function cargarProductos() {
    fetch('./json/zapatillas.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la carga del JSON');
            }
            return response.json();
        })
        .then(productos => {
            mostrarProductos(productos);
        })
        .catch(error => {
            console.error('Error al cargar el JSON:', error);
        });
}

function mostrarProductos(productos) {
    const contenedorCard = document.querySelector('.contenedorCard');
    contenedorCard.innerHTML = '';

    productos.forEach(producto => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('Card');

        cardDiv.innerHTML = `
            <div class="contenedorImgCard">    
                <img class="imgCards" src="${producto.img}" alt="zapatilla ${producto.nombre.toLowerCase()}">
            </div>
            <div class="card-Body">
                <h5 class="tituloCard">${producto.nombre}</h5>
                <a href="paginas/zapatilla.html" class="botonCard" data-id="${producto.id}">Ver más</a>
            </div>
        `;

        contenedorCard.appendChild(cardDiv);
        loader.style.display = 'none';
    });
}

// Llama a la función para cargar los productos al cargar la página
document.addEventListener('DOMContentLoaded', cargarProductos);
