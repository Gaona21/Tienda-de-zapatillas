document.addEventListener('DOMContentLoaded', () => {
    updateCartCount()
    const checkButtons = setInterval(() => {
        const botonesVerMas = document.querySelectorAll(".botonCard");
        if (botonesVerMas.length) {
            clearInterval(checkButtons);
            botonesVerMas.forEach(boton => {
                boton.addEventListener('click', function(event) {
                    event.preventDefault();
                    const zapatillaId = this.getAttribute('data-id');
                    localStorage.setItem('zapatillaId', zapatillaId);
                    window.location.href = this.href;
                });
            });
        }
    }, 100);
});

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function updateCartCount() {
    const cart = getCart();
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}