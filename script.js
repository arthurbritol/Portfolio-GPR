document.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const allLinks = document.querySelectorAll('.nav-link, .nav-logo');
    const pages = document.querySelectorAll('.page');
    const header = document.getElementById('header');

    // Efeito de scroll no Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Abre e fecha o menu mobile
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Função para trocar de página
    const switchPage = (pageId) => {
        pages.forEach(page => {
            page.classList.remove('active');
        });
        const newPage = document.getElementById(pageId + '-page');
        if (newPage) {
            newPage.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'auto' });
        }
    };

    const smoothScrollTo = (targetId) => {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const topOffset = header.offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - topOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const pageTarget = link.getAttribute('data-page');
            const anchorTarget = link.getAttribute('href');

            if (pageTarget) {
                switchPage(pageTarget);
            } else if (anchorTarget && anchorTarget.startsWith('#')) {
                switchPage('home');
                setTimeout(() => {
                    smoothScrollTo(anchorTarget);
                }, 100);
            }

            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    const taskHeaders = document.querySelectorAll('.task-header');
    taskHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const taskCard = header.parentElement;
            taskCard.classList.toggle('open');
        });
    });
});