let pedidos = [];

        function adicionarPedido(nome, preco) {
            pedidos.push({ nome, preco });
            atualizarPedidos();
        }

        function atualizarPedidos() {
            const pedidosDiv = document.getElementById("pedidos");
            pedidosDiv.innerHTML = "";
            let total = 0;

            pedidos.forEach((item, index) => {
                total += item.preco;
                const div = document.createElement("div");
                div.textContent = `${item.nome} - R$${item.preco.toFixed(2)}`;
                pedidosDiv.appendChild(div);
            });

            const totalDiv = document.createElement("div");
            totalDiv.innerHTML = `<strong>Total: R$${total.toFixed(2)}</strong>`;
            pedidosDiv.appendChild(totalDiv);
        }