const loader = document.getElementById('loader');
loader.style.display = 'block';

fetch('../json/zapatillas.json')
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector('.contenedorCard');

        container.innerHTML = '';

        data.forEach(producto => {
            if (producto.marca === "Adidas") {
                const cardDiv = document.createElement('div');
                cardDiv.className = 'Card';
                cardDiv.innerHTML = `
                    <div class="contenedorImgCard">    
                        <img class="imgCards" src="${producto.img}" alt="zapatilla ${producto.nombre.toLowerCase()}">
                    </div>
                    <div class="card-Body">
                        <h5 class="tituloCard">${producto.nombre}</h5>
                        <a href="../paginas/zapatilla.html" class="botonCard" data-id="${producto.id}">Ver más</a>
                    </div>
                `;
                container.appendChild(cardDiv);
                loader.style.display = 'none';
            }
        });
    })
    .catch(error => console.error('Error al cargar el JSON:', error));
