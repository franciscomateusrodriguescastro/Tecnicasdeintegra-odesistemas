let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para adicionar pedido ao carrinho
function adicionarPedido(nome, preco, imagem) {
    let item = { nome, preco, imagem };
    carrinho.push(item);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarIconeCarrinho();
    exibirPedidos();
    atualizarTotal();
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
                <img src="${item.imagem}" alt="${item.nome}" class="pedido-img">
                <span class="pedido-nome">${item.nome}</span>
                <span class="pedido-preco">R$${item.preco.toFixed(2)}</span>
                <button class="btn-remover" onclick="removerPedido(${index})">Remover</button>
            `;
            containerPedidos.appendChild(pedidoDiv);
        });
    }
    atualizarTotal();
}

// Função para remover um pedido do carrinho
function removerPedido(index) {
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    exibirPedidos();
    atualizarIconeCarrinho();
    atualizarTotal();
}

// Função para limpar o carrinho
function limparCarrinho() {
    localStorage.removeItem('carrinho');
    carrinho = [];
    exibirPedidos();
    atualizarIconeCarrinho();
    atualizarTotal();
}

// Função para calcular o total do carrinho
function atualizarTotal() {
    let total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    document.getElementById("total-carrinho").textContent = `R$${total.toFixed(2)}`;
}

// Evento de clique no botão de limpar carrinho
document.getElementById("limpar-carrinho").addEventListener("click", limparCarrinho);

// Inicializar a página
document.addEventListener("DOMContentLoaded", () => {
    atualizarIconeCarrinho();
    exibirPedidos();
    atualizarTotal();
});
