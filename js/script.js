document.addEventListener('DOMContentLoaded', function() {

    // === Navbar Scroll & Mobile Menu ===
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const backToTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            backToTopBtn.classList.add('show');
        } else {
            navbar.classList.remove('scrolled');
            backToTopBtn.classList.remove('show');
        }
    });

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Cierra el menú al hacer clic en un enlace (para móviles)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // === Typing Effect ===
    const typingElement = document.getElementById('typing-effect');
    const words = ["Desarrollador Web", "Entusiasta Tecnológico", "Creador de Soluciones", "Apasionado del Código","Bueno aprendiendo"]; 
    let wordIndex = 0;
    let letterIndex = 0;
    let currentWord = '';
    let isDeleting = false;

    function type() {
        const fullWord = words[wordIndex];

        if (isDeleting) {
            currentWord = fullWord.substring(0, letterIndex - 1);
            letterIndex--;
        } else {
            currentWord = fullWord.substring(0, letterIndex + 1);
            letterIndex++;
        }

        typingElement.textContent = currentWord;

        let typeSpeed = 150;
        if (isDeleting) {
            typeSpeed /= 2;
        }

        if (!isDeleting && currentWord === fullWord) {
            typeSpeed = 2000; // Pausa al final
            isDeleting = true;
        } else if (isDeleting && currentWord === '') {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pausa antes de empezar
        }

        setTimeout(type, typeSpeed);
    }

    type(); // Inicia el efecto

    // === Scroll Animations (Intersection Observer) ===
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const skillLevels = document.querySelectorAll('.skill-level');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animar barras de habilidad si es una de ellas
                if (entry.target.classList.contains('skill-item') || entry.target.querySelector('.skill-level')) {
                   const skillBar = entry.target.querySelector('.skill-level');
                   if(skillBar && !skillBar.style.width){ // Animar solo una vez
                       skillBar.style.width = skillBar.dataset.level;
                   }
                }
                 
                 // observer.unobserve(entry.target);
            } else {
                 // Opcional: Remover clase si quieres que se animen de nuevo al salir y entrar
                 // entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.15 // Se activa cuando el 15% del elemento es visible
    });

    animatedElements.forEach(el => observer.observe(el));
    // Observar cada skill-item para activar las barras
    document.querySelectorAll('.skill-item').forEach(el => observer.observe(el));


}); // Fin DOMContentLoaded