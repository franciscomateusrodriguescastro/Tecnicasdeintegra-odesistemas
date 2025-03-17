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
            const feedbacksContainer = $('#feedbacks-container');
            feedbacksContainer.empty();

            data.forEach(review => {
                const userName = review.name || review.username || "Anônimo";
                const starsHtml = generateStars(review.rating);

                const reviewHtml = `
                <div class="feedback">
                    <img src="src/images/avatar.png" class="feedback-avatar" alt="avatar">
                    <div class="feedback-content">
                        <p><strong>${userName}</strong> <span>${starsHtml}</span></p>
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
    $('#login_form').on('submit', function (e) {
        e.preventDefault();
        const emailElement = $('#login_email');
        const senhaElement = $('#login_senha');

        // Verifique se os campos existem e têm valores
        const email = emailElement.val();
        const senha = senhaElement.val();

        if (!email || !senha) {
            alert("Preencha o e-mail e a senha!");
            return;
        }

        const loginData = { email: email.trim(), password: senha.trim() };

        $.ajax({
            url: 'http://165.232.140.38:8001/contas/api/token/ - login token',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(loginData),
            success: function (response) {
                console.log("Login bem-sucedido:", response);

                if (response.token) {
                    localStorage.setItem("authToken", response.token);
                    alert("Login realizado com sucesso!");
                    $('#login_form')[0].reset();
                    $('#login_email, #login_senha').val('').hide();
                    window.location.href = '/dashboard';
                } else {
                    alert("Erro ao realizar login.");
                }
            },
        });
    });
});
// Função para enviar cadastro via AJAX
$('#register_form').on('submit', function (e) {
    e.preventDefault();
    const emailElement = $('#register_email');
    const senhaElement = $('#register_senha');
    const confirmarSenhaElement = $('#register_confirmar_senha');

    // Verifique se os campos existem e têm valores
    const email = emailElement.val();
    const senha = senhaElement.val();
    const confirmarSenha = confirmarSenhaElement.val();

    if (!email || !senha || !confirmarSenha) {
        alert("Preencha todos os campos!");
        return;
    }

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    const registerData = {
        email: email.trim(),
        password: senha.trim()
    };

    $.ajax({
        url: 'http://165.232.140.38:8001/contas/api/users/create/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(registerData),
        success: function (response) {
            console.log("Cadastro bem-sucedido:", response);
            alert("Cadastro realizado com sucesso!");
            $('#register_form')[0].reset();
            window.location.href = '/login';
        },
        error: function (xhr, status, error) {
            console.error("Erro no cadastro:", error);
            alert("Erro ao tentar realizar cadastro. Tente novamente.");
        }
    });
});

// Função para alternar entre os formulários de Login e Cadastro
function toggleForm() {
    var loginForm = document.getElementById("loginForm");
    var registerForm = document.getElementById("registerForm");

    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        registerForm.style.display = "none";
    } else {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    }
}

// Função para exibir mensagem de sucesso
function showMessage(message) {
    const messageElement = document.getElementById('mensagem');
    messageElement.textContent = message;
    messageElement.style.color = 'orange';
}

// Função para limpar os campos do formulário
function clearForm(formId) {
    const form = document.getElementById(formId);
    form.reset();
}

// Função para o login
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Lógica de verificação (simulação de sucesso)
    if (email && password) {
        showMessage("Login realizado com sucesso!");
        clearForm("loginForm");
    } else {
        showMessage("Erro ao fazer login. Verifique os dados.");
    }
});

// Função para o cadastro
document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const newEmail = document.getElementById("new-email").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Lógica de verificação (simulação de sucesso)
    if (newPassword === confirmPassword) {
        showMessage("Cadastro realizado com sucesso!");
        clearForm("registerForm");
    } else {
        showMessage("As senhas não coincidem. Tente novamente.");
    }
});
// Função para alternar entre os formulários de Login e Cadastro
function toggleForm() {
    var loginForm = document.getElementById("loginForm");
    var registerForm = document.getElementById("registerForm");

    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        registerForm.style.display = "none";
    } else {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    }
}

// Função para exibir a mensagem dentro da caixinha
function showMessage(message) {
    const messageElement = document.getElementById('mensagem');
    messageElement.textContent = message;
    messageElement.style.color = 'green';
    messageElement.style.fontSize = '16px';
    messageElement.style.padding = '10px';
    messageElement.style.border = '1px solid green';
    messageElement.style.borderRadius = '5px';
    messageElement.style.backgroundColor = '#d4edda';
}

// Função para limpar os campos do formulário
function clearForm(formId) {
    const form = document.getElementById(formId);
    form.reset();  // Limpa os campos do formulário
}

// Função para o login
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        showMessage("Login realizado com sucesso!");
        console.log("Login realizado com sucesso!");
        clearForm("loginForm");


    } else {
        showMessage("Login realizado com sucesso!");
    }
});


// Função para o cadastro
document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const newEmail = document.getElementById("new-email").value;
    const newPassword = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Lógica de verificação (simulação de sucesso)
    if (newPassword === confirmPassword) {
        showMessage("Cadastro realizado com sucesso!");
        console.log("Cadastro realizado com sucesso!");
        clearForm("registerForm");
    } else {
        showMessage("As senhas não coincidem. Tente novamente.");
    }
});
