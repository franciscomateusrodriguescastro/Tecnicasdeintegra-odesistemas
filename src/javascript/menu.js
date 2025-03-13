document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("dishes");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let scrollAmount = 0;
    const cardWidth = document.querySelector(".dish").offsetWidth + 16; // Largura do card + espaçamento
    const visibleCards = Math.floor(carousel.offsetWidth / cardWidth); // Quantos cabem na tela

    nextBtn.addEventListener("click", function () {
        if (scrollAmount < carousel.scrollWidth - carousel.clientWidth) {
            scrollAmount += cardWidth * visibleCards;
            carousel.scrollTo({
                left: scrollAmount,
                behavior: "smooth"
            });
        }
    });

    prevBtn.addEventListener("click", function () {
        if (scrollAmount > 0) {
            scrollAmount -= cardWidth * visibleCards;
            carousel.scrollTo({
                left: scrollAmount,
                behavior: "smooth"
            });
        }
    });
});
