document.addEventListener('DOMContentLoaded', function () {
    const productDetails = document.getElementById('product-details');
    const checkoutForm = document.getElementById('checkout-form');

    // Simulando uma chamada à FakeStoreAPI para obter os detalhes do produto
    fetch('https://fakestoreapi.com/products/10')
        .then(response => response.json())
        .then(product => {
            displayProductDetails(product);

            // Adicionando detalhes do produto ao formulário de checkout
            const productInput = document.createElement('input');
            productInput.type = 'hidden';
            productInput.name = 'product';
            productInput.value = JSON.stringify(product);
            checkoutForm.appendChild(productInput);
        });

    checkoutForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Simulando lógica de compra
        const formData = new FormData(checkoutForm);
        const serializedData = {};
        formData.forEach((value, key) => {
            serializedData[key] = value;
        });

        // Aqui você pode enviar os dados para o backend para processar a compra
        // (substitua este alert com a lógica de chamada ao seu backend)

        const productDetails = JSON.parse(serializedData.product);

        alert(`Compra finalizada! Obrigado por comprar ${productDetails.title}.`);

        // Redirecionar para a página de sucesso
        window.location.href = 'success.html';
    });
});

function displayProductDetails(product) {
    const productDetailsDiv = document.getElementById('product-details');
    productDetailsDiv.innerHTML = `
        <h2>${product.title}</h2>
        <p>${product.description}</p>
        <p><strong>Preço:</strong> $${product.price}</p>
    `;
}

function fetchCepInfo() {
    const cepInput = document.getElementById('cep');
    const cep = cepInput.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cep.length !== 8) {
        alert('Informe um CEP válido com 8 dígitos.');
        return;
    }

    // Consulta ViaCEP API
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => displayCepInfo(data))
        .catch(error => console.error('Erro ao consultar CEP:', error));
}

function displayCepInfo(data) {
    const cepInfoDiv = document.getElementById('cep-info');

    if (data.erro) {
        cepInfoDiv.innerHTML = '<p>CEP não encontrado.</p>';
    } else {
        cepInfoDiv.innerHTML = `
            <p><strong>Cidade:</strong> ${data.localidade}</p>
            <p><strong>Estado:</strong> ${data.uf}</p>
            <p><strong>Bairro:</strong> ${data.bairro}</p>
        `;
    }
}