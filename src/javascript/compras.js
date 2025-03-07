let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

// Função para adicionar pedido ao carrinho
function adicionarPedido(nome, preco, imagem) {
    let item = { nome, preco, imagem };

    // Adiciona o item ao array do carrinho
    carrinho.push(item);

    // Atualiza o carrinho no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Atualiza a exibição do número de itens no ícone da cesta
    atualizarIconeCarrinho();

    // Atualiza a lista de pedidos
    exibirPedidos();
}

// Atualiza o número de itens no ícone da cesta
function atualizarIconeCarrinho() {
    let contador = document.getElementById("contador-carrinho");
    if (contador) {
        contador.textContent = carrinho.length; // Atualiza com a quantidade de itens no carrinho
    }
}

// Função para exibir os pedidos no carrinho
function exibirPedidos() {
    const containerPedidos = document.getElementById("pedidos");
    containerPedidos.innerHTML = ''; // Limpa os pedidos exibidos

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
}

// Função para remover um pedido do carrinho
function removerPedido(index) {
    carrinho.splice(index, 1); // Remove o item no índice especificado
    localStorage.setItem('carrinho', JSON.stringify(carrinho)); // Atualiza o carrinho no localStorage
    exibirPedidos(); // Atualiza a visualização dos pedidos
    atualizarIconeCarrinho(); // Atualiza o contador no ícone do carrinho
}

// Função para limpar o carrinho
function limparCarrinho() {
    localStorage.removeItem('carrinho'); // Remove o carrinho do localStorage
    carrinho = []; // Limpa a variável carrinho

    // Atualiza a exibição do carrinho e o contador
    exibirPedidos();
    atualizarIconeCarrinho();
}

// Evento de clique no botão de limpar carrinho
document.getElementById("limpar-carrinho").addEventListener("click", limparCarrinho);

// Função para inicializar a página e carregar os pedidos
function inicializarPagina() {
    // Exibe os pedidos ao carregar a página
    exibirPedidos();
}

// Função para atualizar o carrinho ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    atualizarIconeCarrinho();
    inicializarPagina();
});
