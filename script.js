// lista de itens
const bolos = [
    {
        nome: "Bolo de Morango",
        descricao: "Bolo saboroso de morango com calda de chocolate da casa.",
        preco: "R$ 20,00",
        imagem: "img/download.jpeg"
    },
    {
        nome: "Bolo de Chocolate",
        descricao: "Bolo saboroso de chocolate com açúcar branco.",
        preco: "R$ 25,00",
        imagem: "img/download (1).jpeg"
    },
    {
        nome: "Bolo de Cenoura",
        descricao: "Bolo saboroso de cenoura com calda de chocolate da casa.",
        preco: "R$ 20,00",
        imagem: "img/images (4).jpeg"
    }
];

const bebidas = [
    {
        nome: "Suco de Laranja",
        descricao: "Suco de laranja natural, fresco e saudável.",
        preco: "R$ 5,00",
        imagem: "img/download5.jpeg"
    },
    {
        nome: "Suco de Uva",
        descricao: "Suco de uva natural, refrescante e delicioso.",
        preco: "R$ 5,00",
        imagem: "img/download6.jpeg"
    },
    {
        nome: "Suco de Abacaxi",
        descricao: "Suco de abacaxi natural, tropical e revigorante.",
        preco: "R$ 5,00",
        imagem: "img/download7.jpeg"
    }
];

// Função para renderizar produtos
function renderProdutos(produtos, gridId) {
    const grid = document.getElementById(gridId);
    grid.innerHTML = produtos.map(produto => `
        <article class="product-card">
            <div class="product-image">
                <img src="${produto.imagem}" alt="${produto.nome}">
            </div>
            <div class="product-info">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <div class="product-price">${produto.preco}</div>
                <button class="btn-secondary">Adicionar</button>
            </div>
        </article>
    `).join('');
}

// Toggle menu mobile
document.querySelector('.nav-toggle').addEventListener('click', function() {
    document.querySelector('.nav-menu').classList.toggle('active');
    this.classList.toggle('active');
});

// Renderizar produtos quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    renderProdutos(bolos, 'bolos-grid');
    renderProdutos(bebidas, 'bebidas-grid');
});