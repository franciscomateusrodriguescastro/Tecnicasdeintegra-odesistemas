let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function adicionarPedido(nome, preco, imagem) {
    let item = { nome, preco, imagem };

    carrinho.push(item);

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    atualizarIconeCarrinho();
    exibirPedidos();
    exibirTotalCarrinho();
}

// Atualiza o número de itens no ícone da cesta
function atualizarIconeCarrinho() {
    let contador = document.getElementById("contador-carrinho");
    if (contador) {
        contador.textContent = carrinho.length;
    }
}

// Função para exibir os pedidos no carrinho
function exibirPedidos() {
    const containerPedidos = document.getElementById("pedidos");
    containerPedidos.innerHTML = '';

    if (carrinho.length === 0) {
        containerPedidos.innerHTML = '<p>Seu carrinho está vazio.</p>';
    } else {
        carrinho.forEach((item, index) => {
            let pedidoDiv = document.createElement('div');
            pedidoDiv.classList.add('pedido-item');
            
            pedidoDiv.innerHTML = `
                <img src="${item.imagem}" alt="${item.nome}">
                <span>${item.nome} - R$${item.preco.toFixed(2)}</span>
                <button class="btn-remover" onclick="removerPedido(${index})">Remover</button>
            `;
            containerPedidos.appendChild(pedidoDiv);
        });
    }

    exibirTotalCarrinho();
}

// Função para remover um pedido do carrinho com animação
function removerPedido(index) {
    const containerPedidos = document.getElementById("pedidos");
    const itemPedido = containerPedidos.children[index];

    itemPedido.classList.add('fadeOut');

    setTimeout(() => {
        carrinho.splice(index, 1);
        localStorage.setItem('carrinho', JSON.stringify(carrinho)); 
        exibirPedidos(); 
        atualizarIconeCarrinho();
        exibirTotalCarrinho(); 
    }, 500);
}

function limparCarrinho() {
    const containerPedidos = document.getElementById("pedidos");

    const todosItens = Array.from(containerPedidos.children);
 
    todosItens.forEach((item, index) => {
        item.classList.add('fadeOut');
    });

    setTimeout(() => {
        localStorage.removeItem('carrinho'); 
        carrinho = [];

        exibirPedidos(); 
        atualizarIconeCarrinho(); 
        exibirTotalCarrinho();
    }, 500); 
}

// Função para somar o valor total dos itens no carrinho
function somarCarrinho() {
    return carrinho.reduce((total, item) => total + item.preco, 0);
}

// Função para exibir o total do carrinho na página
function exibirTotalCarrinho() {
    const totalContainer = document.getElementById("total-carrinho");
    if (totalContainer) {
        const total = somarCarrinho();
        totalContainer.textContent = `Total: R$${total.toFixed(2)}`;

        totalContainer.style.animation = 'none';
        totalContainer.offsetHeight;
        totalContainer.style.animation = ''; 
    }
}

// Função para inicializar a página e carregar os pedidos
function inicializarPagina() {
    exibirPedidos();
    exibirTotalCarrinho();
}

// Função para atualizar o carrinho ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    atualizarIconeCarrinho();
    inicializarPagina();

    const botaoLimparCarrinho = document.getElementById("limpar-carrinho");
    if (botaoLimparCarrinho) {
        botaoLimparCarrinho.addEventListener("click", limparCarrinho);
    }
});
