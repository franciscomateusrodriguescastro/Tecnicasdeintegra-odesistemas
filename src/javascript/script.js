$(document).ready(function () {
    // 📌 Menu mobile
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $(this).find('i').toggleClass('fa-x');
    });

    const sections = $('section');
    const navItems = $('.nav-item');

    // ⭐ Estrelas da avaliação
    const stars = document.querySelectorAll('.star');
    const ratingValue = document.getElementById('rating-value');

    stars.forEach(star => {
        star.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            ratingValue.textContent = value;

            // Resetando todas as estrelas
            stars.forEach(s => s.classList.remove('checked'));

            // Adicionando a classe checked até a estrela clicada
            for (let i = 0; i < value; i++) {
                stars[i].classList.add('checked');
            }
        });
    });

    // 📌 Efeito de sombra no header ao scrollar
    $(window).on('scroll', function () {
        const header = $('header');
        const scrollPosition = $(window).scrollTop();

        header.css('box-shadow', scrollPosition > 0 ? '5px 1px 5px rgba(0, 0, 0, 0.1)' : 'none');

        let activeSectionIndex = 0;
        sections.each(function (i) {
            const sectionTop = $(this).offset().top - 96;
            const sectionBottom = sectionTop + $(this).outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false;
            }
        });

        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');
    });

    // 🎭 ScrollReveal (animações suaves ao scroll)
    ScrollReveal().reveal('#cta', { origin: 'left', duration: 2000, distance: '20%' });
    ScrollReveal().reveal('.dish', { origin: 'left', duration: 2000, distance: '20%' });
    ScrollReveal().reveal('#testimonial_chef', { origin: 'left', duration: 1000, distance: '20%' });
    ScrollReveal().reveal('#feedbacks', { origin: 'right', duration: 1000, distance: '20%' });

    // Função para carregar avaliações da API
    function loadReviews() {
        $.get('http://165.232.140.38:8001/pedidos/api/reviews/', function (data) {
            const feedbacksContainer = $('#feedbacks');
            feedbacksContainer.empty();
            data.forEach(review => {
                const starsHtml = generateStars(review.rating);
                const reviewHtml = `
                    <div class="feedback">
                        <img src="src/images/avatar.png" class="feedback-avatar" alt="avatar">
                        <div class="feedback-content">
                            <p>${review.name} <span>${starsHtml}</span></p>
                            <p>"${review.comment}"</p>
                        </div>
                    </div>
                `;
                feedbacksContainer.append(reviewHtml);
            });
        }).fail(function (xhr) {
            console.error("Erro ao carregar as avaliações:", xhr.responseText);
        });
    }

    // Função para gerar as estrelas com base na avaliação
    function generateStars(rating) {
        let starsHtml = '';
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                starsHtml += '<i class="fa-solid fa-star"></i>';
            } else {
                starsHtml += '<i class="fa-regular fa-star"></i>';
            }
        }
        return starsHtml;
    }

    // Carregar as avaliações ao carregar a página
    loadReviews();

    // Função para enviar uma nova avaliação via formulário
    $('#feedback_form').on('submit', function (e) {
        e.preventDefault();

        const nome = $('#nome').val().trim();
        const comentario = $('#comentario').val().trim();
        const rating = parseInt($('#rating-value').text()) || 0;

        if (!nome || !comentario || rating === 0) {
            alert("Preencha todos os campos e selecione uma nota antes de enviar!");
            return;
        }

        const reviewData = {
            name: nome,
            comment: comentario,
            rating: rating,
            product: 1,
            user: 1
        };

        $.ajax({
            url: 'http://165.232.140.38:8001/pedidos/api/reviews/',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(reviewData),
            success: function () {
                console.log('✅ Avaliação enviada com sucesso!');
                alert("Avaliação enviada com sucesso!");
                loadReviews();
                $('#feedback_form')[0].reset();
                $('#rating-value').text("0");
                stars.forEach(s => s.classList.remove('checked'));
            },
            error: function (xhr) {
                console.error("❌ Erro ao enviar a avaliação:", xhr.responseText);
                alert("Erro ao enviar a avaliação. Verifique os dados e tente novamente.");
            }
        });
    });

    // Função para alternar entre login e cadastro
    function toggleForm() {
        var loginForm = document.getElementById("loginForm");
        var registerForm = document.getElementById("registerForm");
        var formTitle = document.getElementById("form-title");

        if (loginForm.style.display === "none") {
            loginForm.style.display = "block";
            registerForm.style.display = "none";
            formTitle.textContent = "Entrar";
        } else {
            loginForm.style.display = "none";
            registerForm.style.display = "block";
            formTitle.textContent = "Cadastro";
        }
    }

    // Função para enviar login via AJAX
    $('#loginForm').on('submit', function (e) {
        e.preventDefault();

        const email = $('#login_email').val().trim();
        const password = $('#login_password').val().trim();

        if (!email || !password) {
            alert("Preencha todos os campos antes de enviar!");
            return;
        }

        const loginData = { email, password };

        $.ajax({
            url: 'http://165.232.140.38:8001/pedidos/api/login/', // Substitua pelo endpoint de login real
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(loginData),
            success: function () {
                console.log('✅ Login realizado com sucesso!');
                alert("Login realizado com sucesso!");
                // Redirecionar ou outra ação após sucesso
            },
            error: function (xhr) {
                console.error("❌ Erro ao realizar login:", xhr.responseText);
                alert("Erro ao realizar login. Verifique os dados e tente novamente.");
            }
        });
    });

    // Função para enviar cadastro via AJAX
    $('#registerForm').on('submit', function (e) {
        e.preventDefault();

        const nome = $('#register_nome').val().trim();
        const email = $('#register_email').val().trim();
        const password = $('#register_password').val().trim();

        if (!nome || !email || !password) {
            alert("Preencha todos os campos antes de enviar!");
            return;
        }

        const registerData = { nome, email, password };

        $.ajax({
            url: 'http://165.232.140.38:8001/pedidos/api/register/', // Substitua pelo endpoint de cadastro real
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(registerData),
            success: function () {
                console.log('✅ Cadastro realizado com sucesso!');
                alert("Cadastro realizado com sucesso!");
                // Alternar para a tela de login após cadastro
                toggleForm();
            },
            error: function (xhr) {
                console.error("❌ Erro ao realizar cadastro:", xhr.responseText);
                alert("Erro ao realizar cadastro. Verifique os dados e tente novamente.");
            }
        });
    });
});
