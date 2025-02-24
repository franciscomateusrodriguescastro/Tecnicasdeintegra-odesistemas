$(document).ready(function () {
    // Mobile menu toggle
    $("#mobile_btn").on("click", function () {
        $("#mobile_menu").toggleClass("active");
        $(this).find("i").toggleClass("fa-x");
    });

    const sections = $("section");
    const navItems = $(".nav-item");

    // Adding box shadow to header on scroll
    $(window).on("scroll", function () {
        const header = $("header");
        const scrollPosition = $(window).scrollTop() - header.outerHeight();

        if (scrollPosition <= 0) {
            header.css("box-shadow", "none");
        } else {
            header.css("box-shadow", "5px 1px 5px rgba(0, 0, 0, 0.1)");
        }

        let activeSectionIndex = 0;

        sections.each(function (i) {
            const section = $(this);
            const sectionTop = section.offset().top - 96;
            const sectionBottom = sectionTop + section.outerHeight();

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {
                activeSectionIndex = i;
                return false;
            }
        });

        navItems.removeClass("active");
        $(navItems[activeSectionIndex]).addClass("active");
    });

    ScrollReveal().reveal("#cta", {
        origin: "left",
        duration: "2000",
        distance: "20%",
    });

    ScrollReveal().reveal(".dish", {
        origin: "left",
        duration: "2000",
        distance: "20%",
    });

    ScrollReveal().reveal("#testimonial_chef", {
        origin: "left",
        duration: "1000",
        distance: "20%",
    });

    ScrollReveal().reveal("#feedbacks", {
        origin: "rigth",
        duration: "1000",
        distance: "20%",
    });
});
// src/javascript/script.js
const PARSE_APP_ID = "your_app_id";
const PARSE_REST_API_KEY = "your_rest_api_key";
const PARSE_SERVER_URL = "https://parseapi.back4app.com/classes/YourClassName";

const headers = {
    "X-Parse-Application-Id": PARSE_APP_ID,
    "X-Parse-REST-API-Key": PARSE_REST_API_KEY,
    "Content-Type": "application/json",
};

// Função para criar um novo registro
async function createDish(dish) {
    const response = await fetch(PARSE_SERVER_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(dish),
    });
    const data = await response.json();
    console.log("Created:", data);
    
}

// Função para ler todos os registros
async function getDishes() {
    const response = await fetch(PARSE_SERVER_URL, {
        method: "GET",
        headers: headers,
    });
    const data = await response.json();
    console.log("Dishes:", data);
}

// Função para atualizar um registro
async function updateDish(objectId, updatedData) {
    const response = await fetch(`${PARSE_SERVER_URL}/${objectId}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(updatedData),
    });
    const data = await response.json();
    console.log("Updated:", data);
}

// Função para deletar um registro
async function deleteDish(objectId) {
    const response = await fetch(`${PARSE_SERVER_URL}/${objectId}`, {
        method: "DELETE",
        headers: headers,
    });
    const data = await response.json();
    console.log("Deleted:", data);
}

