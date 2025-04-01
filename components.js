// Componente do Card de Produto
const ProductCard = {
    render(produto) {
        const tagsHTML = produto.tags ? `
            <div class="product-tags">
                ${produto.tags.map(tag => `
                    <span class="product-tag ${tag.toLowerCase().replace(' ', '-')}">${tag}</span>
                `).join('')}
            </div>
        ` : '';

        return `
        <article class="product-card">
            <div class="product-image">
                ${tagsHTML}
                <img src="${produto.imagem}" alt="${produto.nome}">
            </div>
            <div class="product-info">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <div class="product-footer">
                    <div class="product-price">${produto.preco}</div>
                    <button class="btn-secondary add-to-cart"
                            data-id="${produto.id}"
                            data-produto='${JSON.stringify(produto)}'>
                        Adicionar
                    </button>
                </div>
            </div>
        </article>
        `;
    }
};

// Componente do Item do Carrinho
const CartItem = {
    render(item) {
        return `
        <div class="cart-item">
            <img src="${item.imagem}" alt="${item.nome}">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.nome}</div>
                <div class="cart-item-price">${item.preco}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-button minus">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-button plus">+</button>
                </div>
            </div>
        </div>
        `;
    }
};
