$(document).ready(function () {
    // Menu mobile
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $(this).find('i').toggleClass('fa-x');
    });

    const sections = $('section');
    const navItems = $('.nav-item');

    // Estrelas da avaliação
    const stars = document.querySelectorAll('.star');
    const ratingValue = document.getElementById('rating-value');
    stars.forEach(star => {
        star.addEventListener('click', function () {

            const value = this.getAttribute('data-value');
            ratingValue.textContent = value;

            stars.forEach(s => s.classList.remove('checked'));
            this.classList.add('checked');
            let previous = this.previousElementSibling;
            while (previous) {
                previous.classList.add('checked');
                previous = previous.previousElementSibling;
            }
        });
    });

    $(window).on('scroll', function () {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();

        if (scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1)');
        }

        let activeSectionIndex = 0;

        sections.each(function (i) {
            const section = $(this);
            const sectionTop = section.offset().top - 96;
            const sectionBottom = sectionTop + section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false;
            }
        });

        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');
    });

    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: '2000',
        distance: '20%'
    });

    ScrollReveal().reveal('.dish', {
        origin: 'left',
        duration: '2000',
        distance: '20%'
    });

    ScrollReveal().reveal('#testimonial_chef', {
        origin: 'left',
        duration: '1000',
        distance: '20%'
    });

    ScrollReveal().reveal('#feedbacks', {
        origin: 'rigth',
        duration: '1000',
        distance: '20%'
    });
});