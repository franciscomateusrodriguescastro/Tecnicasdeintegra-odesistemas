let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function adicionarPedido(nome, preco, imagem) {
    let item = { nome, preco, imagem };

    carrinho.push(item);

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    atualizarIconeCarrinho();
    exibirPedidos();
    exibirTotalCarrinho(); // Atualiza o total após adicionar um item
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

    exibirTotalCarrinho(); // Atualiza o total após exibir os pedidos
}

// Função para remover um pedido do carrinho com animação
function removerPedido(index) {
    const containerPedidos = document.getElementById("pedidos");
    const itemPedido = containerPedidos.children[index]; // Pega o item que será removido

    // Adiciona a animação de fadeOut
    itemPedido.classList.add('fadeOut');

    // Aguarda a animação terminar para remover o item
    setTimeout(() => {
        carrinho.splice(index, 1); // Remove o item do carrinho
        localStorage.setItem('carrinho', JSON.stringify(carrinho)); 
        exibirPedidos(); 
        atualizarIconeCarrinho();
        exibirTotalCarrinho(); // Atualiza o total após remover um item
    }, 500); // Tempo da animação (mesmo tempo que a animação de fadeOut)
}

function limparCarrinho() {
    const containerPedidos = document.getElementById("pedidos");

    // Adiciona a animação de fadeOut para cada item antes de limpar
    const todosItens = Array.from(containerPedidos.children);
    
    // Adiciona a animação para cada item individualmente
    todosItens.forEach((item, index) => {
        item.classList.add('fadeOut');
    });

    // Aguarda o tempo da animação (500ms) antes de limpar o carrinho
    setTimeout(() => {
        localStorage.removeItem('carrinho'); // Limpa o carrinho no localStorage
        carrinho = []; // Limpa a variável carrinho

        exibirPedidos(); // Exibe a lista vazia
        atualizarIconeCarrinho(); // Atualiza o contador do carrinho
        exibirTotalCarrinho(); // Exibe o total atualizado (zero)
    }, 500); // Tempo da animação (mesmo tempo que a animação de fadeOut)
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

        // Reinicia a animação removendo e re-adicionando o total
        totalContainer.style.animation = 'none';  // Remove a animação
        totalContainer.offsetHeight;  // Trigger reflow
        totalContainer.style.animation = '';  // Re-aplica a animação
    }
}

// Função para inicializar a página e carregar os pedidos
function inicializarPagina() {
    exibirPedidos();
    exibirTotalCarrinho(); // Exibe o total ao carregar a página
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
