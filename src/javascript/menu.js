document.addEventListener("DOMContentLoaded", function () {
    const carouselWrapper = document.querySelector(".carousel-wrapper");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const dishes = document.querySelectorAll(".dish");
    const container = document.querySelector(".carousel-container");

    let currentIndex = 0;
    let dishWidth = dishes[0].offsetWidth + 16; // Largura do item + gap (espaçamento)

    // Função para atualizar o carrossel
    function updateCarousel() {
        const containerWidth = container.offsetWidth; // Largura do contêiner visível
        const totalDishes = dishes.length; // Número total de pratos
        const visibleItems = Math.floor(containerWidth / dishWidth); // Quantos itens cabem na tela
        const maxIndex = Math.max(0, totalDishes - visibleItems); // Índice máximo para evitar overflow

        // Garantir que o currentIndex não ultrapasse os limites
        currentIndex = Math.min(Math.max(currentIndex, 0), maxIndex);

        // Calcular o deslocamento com base no índice atual
        let offset = -currentIndex * dishWidth;

        // Aplicar o deslocamento ao carrossel
        carouselWrapper.style.transform = `translateX(${offset}px)`;
        carouselWrapper.style.transition = "transform 0.4s ease-in-out";
    }

    // Botão "Próximo"
    nextBtn.addEventListener("click", function () {
        const containerWidth = container.offsetWidth;
        const visibleItems = Math.floor(containerWidth / dishWidth);
        const maxIndex = dishes.length - visibleItems;

        // Avançar apenas se houver mais itens à direita
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Botão "Anterior"
    prevBtn.addEventListener("click", function () {
        // Retroceder apenas se houver mais itens à esquerda
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Atualizar o carrossel ao redimensionar a janela
    window.addEventListener("resize", function () {
        dishWidth = dishes[0].offsetWidth + 16; // Recalcular a largura do item + gap
        updateCarousel();
    });

    // Inicializar o carrossel
    updateCarousel();
});