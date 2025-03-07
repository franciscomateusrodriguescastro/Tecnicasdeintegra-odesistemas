let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function adicionarPedido(nome, preco) {
    let item = { nome, preco };

    carrinho.push(item);

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    atualizarIconeCarrinho();
}

function atualizarIconeCarrinho() {
    let contador = document.getElementById("contador-carrinho");
    if (contador) {
        contador.textContent = carrinho.length;
    }
}

// Função para limpar o carrinho
function limparCarrinho() {
    localStorage.removeItem('carrinho'); // Remove o carrinho do localStorage
    carrinho = []; // Limpa a variável carrinho

    atualizarIconeCarrinho(); // Atualiza o ícone para mostrar que o carrinho está vazio
}

// Evento de clique no botão de limpar carrinho
document.getElementById("limpar-carrinho").addEventListener("click", limparCarrinho);

