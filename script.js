const produtos = {
    bolos: [
        {
            id: "bolo-morango",
            nome: "Bolo de Morango",
            descricao: "Bolo saboroso de morango com calda de chocolate da casa.",
            preco: "R$ 20,00",
            imagem: "img/download.jpeg",
            categoria: "tradicional",
            tags: ["destaque", "mais vendido"]
        },
        {
            id: "bolo-chocolate",
            nome: "Bolo de Chocolate",
            descricao: "Bolo saboroso de chocolate com açúcar branco.",
            preco: "R$ 25,00",
            imagem: "img/download (1).jpeg",
            categoria: "tradicional",
            tags: ["sem lactose"]
        },
        {
            id: "bolo-cenoura",
            nome: "Bolo de Cenoura",
            descricao: "Bolo saboroso de cenoura com calda de chocolate da casa.",
            preco: "R$ 20,00",
            imagem: "img/images (4).jpeg",
            categoria: "tradicional"
        },
        {
            id: "bolo-red-velvet",
            nome: "Red Velvet",
            descricao: "Bolo vermelho aveludado com cobertura de cream cheese.",
            preco: "R$ 35,00",
            imagem: "img/red-velvet.jpg",
            categoria: "premium",
            tags: ["novo", "especial"]
        },
        {
            id: "bolo-limao",
            nome: "Bolo de Limão",
            descricao: "Bolo de limão com cobertura de merengue.",
            preco: "R$ 28,00",
            imagem: "img/limao.jpg",
            categoria: "tradicional",
            tags: ["sem glúten"]
        }
    ],
    bebidas: [
        {
            id: "suco-laranja",
            nome: "Suco de Laranja",
            descricao: "Suco de laranja natural, fresco e saudável.",
            preco: "R$ 5,00",
            imagem: "img/download5.jpeg"
        },
        {
            id: "suco-uva",
            nome: "Suco de Uva",
            descricao: "Suco de uva natural, refrescante e delicioso.",
            preco: "R$ 5,00",
            imagem: "img/download6.jpeg"
        },
        {
            id: "suco-abacaxi",
            nome: "Suco de Abacaxi",
            descricao: "Suco de abacaxi natural, tropical e revigorante.",
            preco: "R$ 5,00",
            imagem: "img/download7.jpeg"
        },
        {
            id: "milkshake-chocolate",
            nome: "Milkshake de Chocolate",
            descricao: "Milkshake cremoso de chocolate com chantilly.",
            preco: "R$ 12,00",
            imagem: "img/milkshake.jpg",
            categoria: "milk-shakes"
        },
        {
            id: "cafe-gelado",
            nome: "Café Gelado",
            descricao: "Café gelado com leite e essência de baunilha.",
            preco: "R$ 8,00",
            imagem: "img/cafe.jpg",
            categoria: "cafes"
        }
    ]
};

const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};

const CartManager = {
    items: new Map(),
    
    formatPrice(price) {
        return parseFloat(price.replace('R$ ', '').replace(',', '.'));
    },
    
    addItem(id, item) {
        const currentQty = this.items.get(id)?.quantity || 0;
        this.items.set(id, { 
            ...item, 
            quantity: currentQty + 1,
            priceNumber: this.formatPrice(item.preco)
        });
        this.updateUI();
    },
    
    removeItem(id) {
        const item = this.items.get(id);
        if (item && item.quantity > 1) {
            item.quantity--;
            this.items.set(id, item);
        } else {
            this.items.delete(id);
        }
        this.updateUI();
    },
    
    getTotal() {
        let total = 0;
        for (const item of this.items.values()) {
            total += item.priceNumber * item.quantity;
        }
        return total.toFixed(2);
    },
    
    updateUI() {
        const cartCount = document.querySelector('.cart-count');
        const cartItems = document.querySelector('.cart-items');
        const totalAmount = document.querySelector('.total-amount');
        
        const totalItems = Array.from(this.items.values())
            .reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.setAttribute('aria-label', `${totalItems} itens no carrinho`);
        
        cartItems.innerHTML = Array.from(this.items.values())
            .map(item => `
                <div class="cart-item">
                    <img src="${item.imagem}" alt="${item.nome}">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.nome}</div>
                        <div class="cart-item-price">${item.preco}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-button" onclick="CartManager.removeItem('${item.id}')" aria-label="Remover um ${item.nome}">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-button" onclick="CartManager.addItem('${item.id}', ${JSON.stringify(item)})" aria-label="Adicionar um ${item.nome}">+</button>
                        </div>
                    </div>
                </div>
            `).join('');
        
        totalAmount.textContent = `R$ ${this.getTotal()}`;
    }
};

function renderProdutos(produtos, gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    
    grid.innerHTML = produtos.map(produto => ProductCard.render(produto)).join('');
    
    grid.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const produto = JSON.parse(button.dataset.produto);
            CartManager.addItem(produto.id, produto);
            button.textContent = 'Adicionado!';
            setTimeout(() => {
                button.textContent = 'Adicionar';
            }, 1000);
        });
    });
}

function filtrarProdutos(categoria = 'todos', tag = 'todos') {
    return produtos.bolos.filter(produto => {
        const matchCategoria = categoria === 'todos' || produto.categoria === categoria;
        const matchTag = tag === 'todos' || (produto.tags && produto.tags.includes(tag));
        return matchCategoria && matchTag;
    });
}

function renderFiltros() {
    const categorias = ['todos', 'tradicional', 'premium'];
    const tags = ['todos', 'sem glúten', 'sem lactose', 'novo'];
    
    const filtrosHTML = `
        <div class="filtros">
            <div class="filtro-grupo">
                <label>Categoria:</label>
                <div class="filtro-botoes">
                    ${categorias.map(cat => `
                        <button class="filtro-btn ${cat === 'todos' ? 'active' : ''}" 
                                data-categoria="${cat}">
                            ${cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    `).join('')}
                </div>
            </div>
            <div class="filtro-grupo">
                <label>Filtrar por:</label>
                <div class="filtro-botoes">
                    ${tags.map(tag => `
                        <button class="filtro-btn ${tag === 'todos' ? 'active' : ''}" 
                                data-tag="${tag}">
                            ${tag.charAt(0).toUpperCase() + tag.slice(1)}
                        </button>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    const bolosSection = document.querySelector('#bolos');
    bolosSection.insertAdjacentHTML('afterbegin', filtrosHTML);

    // Adiciona eventos aos botões de filtro
    const filtroButtons = bolosSection.querySelectorAll('.filtro-btn');
    filtroButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove classe active dos botões do mesmo grupo
            const grupo = button.closest('.filtro-grupo');
            grupo.querySelectorAll('.filtro-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Adiciona classe active ao botão clicado
            button.classList.add('active');
            
            // Obtém os filtros ativos
            const categoriaAtiva = bolosSection.querySelector('[data-categoria].active').dataset.categoria;
            const tagAtiva = bolosSection.querySelector('[data-tag].active').dataset.tag;
            
            // Filtra e renderiza os produtos
            const produtosFiltrados = filtrarProdutos(categoriaAtiva, tagAtiva);
            renderProdutos(produtosFiltrados, 'bolos-grid');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa os filtros primeiro
    renderFiltros();
    
    // Renderiza produtos iniciais
    renderProdutos(produtos.bolos, 'bolos-grid');
    renderProdutos(produtos.bebidas, 'bebidas-grid');
    CartManager.updateUI();

    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const cartButton = document.querySelector('.cart-button');
    const cartDropdown = document.querySelector('.cart-dropdown');
    
    navToggle?.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu?.classList.toggle('active');
    });
    
    cartButton?.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = cartDropdown.hidden;
        cartDropdown.hidden = !isHidden;
        cartButton.setAttribute('aria-expanded', !isHidden);
    });
    
    document.addEventListener('click', (event) => {
        if (!cartButton?.contains(event.target) && !cartDropdown?.contains(event.target)) {
            cartDropdown.hidden = true;
            cartButton?.setAttribute('aria-expanded', 'false');
        }
    });
    
    cartDropdown?.addEventListener('click', (e) => e.stopPropagation());
    
    document.querySelector('.checkout-button')?.addEventListener('click', () => {
        if (CartManager.items.size > 0) {
            alert(`Pedido finalizado! Total: R$ ${CartManager.getTotal()}`);
            CartManager.items.clear();
            CartManager.updateUI();
            cartDropdown.hidden = true;
        }
    });
});

window.addEventListener('scroll', debounce(() => {}, 100));