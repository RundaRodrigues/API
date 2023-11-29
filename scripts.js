document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('product-list');

    // Simulando uma chamada à FakeStoreAPI para obter os detalhes do produto
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(products => {
            displayProductList(products);
        });
});

function displayProductList(products) {
    const productListDiv = document.getElementById('product-list');

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h2>${product.title}</h2>
            <img src="${product.image}" alt="${product.title}">
            <p>${product.description}</p>
            <p><strong>Preço:</strong> $${product.price}</p>
        `;
        productListDiv.appendChild(productDiv);
    });
}

function redirectToCheckout() {
    window.location.href = 'checkout.html';
}
