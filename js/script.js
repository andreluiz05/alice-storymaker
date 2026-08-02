/* ================================================================
   ALICE FOTOGRAFIA — JavaScript ES6 Puro
   Nenhum framework. Nenhuma biblioteca. Nenhum CDN.
   Código modular, limpo e performático.
   ================================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------
       1. NAVBAR — Scroll Effect & Mobile Menu
       ---------------------------------------------------------------- */
    const Navbar = (() => {
        const navbar    = document.querySelector('.navbar');
        const toggle    = document.querySelector('.navbar__toggle');
        const mobileMenu = document.querySelector('.navbar__mobile-menu');
        const mobileLinks = document.querySelectorAll('.navbar__mobile-link');

        const handleScroll = () => {
            if (window.scrollY > 60) {
                navbar.classList.add('is-scrolled');
            } else {
                navbar.classList.remove('is-scrolled');
            }
        };

        const toggleMenu = () => {
            toggle.classList.toggle('is-active');
            mobileMenu.classList.toggle('is-open');
            document.body.style.overflow =
                mobileMenu.classList.contains('is-open') ? 'hidden' : '';
        };

        const closeMenu = () => {
            toggle.classList.remove('is-active');
            mobileMenu.classList.remove('is-open');
            document.body.style.overflow = '';
        };

        const init = () => {
            window.addEventListener('scroll', handleScroll, { passive: true });
            if (toggle) toggle.addEventListener('click', toggleMenu);
            mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
            handleScroll(); // Estado inicial
        };

        return { init };
    })();


    /* ----------------------------------------------------------------
       2. SCROLL REVEAL — IntersectionObserver
       ---------------------------------------------------------------- */
    const ScrollReveal = (() => {
        const elements = document.querySelectorAll('.reveal');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        const init = () => {
            elements.forEach(el => observer.observe(el));
        };

        return { init };
    })();


    /* ----------------------------------------------------------------
       3. FAQ ACCORDION
       ---------------------------------------------------------------- */
    const FAQ = (() => {
        const items = document.querySelectorAll('.faq__item');

        const toggle = (clickedItem) => {
            items.forEach(item => {
                if (item !== clickedItem) {
                    item.classList.remove('is-open');
                }
            });
            clickedItem.classList.toggle('is-open');
        };

        const init = () => {
            items.forEach(item => {
                const question = item.querySelector('.faq__question');
                if (question) {
                    question.addEventListener('click', () => toggle(item));
                }
            });
        };

        return { init };
    })();


    /* ----------------------------------------------------------------
       4. HERO PARALLAX (sutil, apenas no desktop)
       ---------------------------------------------------------------- */
    const HeroParallax = (() => {
        const hero = document.querySelector('.hero');
        const heroMedia = document.querySelector('.hero__media img');
        const heroContent = document.querySelector('.hero__content');

        let ticking = false;

        const handleScroll = () => {
            if (ticking) return;
            ticking = true;

            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const heroHeight = hero.offsetHeight;

                if (scrollY < heroHeight) {
                    const progress = scrollY / heroHeight;
                    if (heroMedia) {
                        heroMedia.style.transform = `scale(${1 + progress * 0.08}) translateY(${scrollY * 0.15}px)`;
                    }
                    if (heroContent) {
                        heroContent.style.opacity = 1 - progress * 1.5;
                        heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
                    }
                }

                ticking = false;
            });
        };

        const init = () => {
            if (window.innerWidth >= 768 && hero) {
                window.addEventListener('scroll', handleScroll, { passive: true });
            }
        };

        return { init };
    })();


    /* ----------------------------------------------------------------
       5. SMOOTH SCROLL — para links internos
       ---------------------------------------------------------------- */
    const SmoothScroll = (() => {
        const links = document.querySelectorAll('a[href^="#"]');

        const init = () => {
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href === '#') return;

                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        const offset = 80; // Altura da navbar
                        const top = target.getBoundingClientRect().top + window.scrollY - offset;

                        window.scrollTo({
                            top: top,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        };

        return { init };
    })();


    /* ----------------------------------------------------------------
       6. FORM VALIDATION (básica, UX)
       ---------------------------------------------------------------- */
    const FormHandler = (() => {
        const form = document.querySelector('.contact__form');

        const init = () => {
            if (!form) return;

            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const fields = form.querySelectorAll('[required]');
                let isValid = true;

                fields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.style.borderColor = '#e74c3c';
                        setTimeout(() => {
                            field.style.borderColor = '';
                        }, 2000);
                    }
                });

                if (isValid) {
                    const btn = form.querySelector('.btn');
                    const originalText = btn.textContent;
                    btn.textContent = 'Mensagem enviada ✓';
                    btn.style.backgroundColor = 'var(--accent)';
                    btn.style.color = 'var(--bg-primary)';
                    btn.disabled = true;

                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.backgroundColor = '';
                        btn.style.color = '';
                        btn.disabled = false;
                        form.reset();
                    }, 3000);
                }
            });
        };

        return { init };
    })();


    /* ----------------------------------------------------------------
       INICIALIZAÇÃO GERAL
       ---------------------------------------------------------------- */
    Navbar.init();
    ScrollReveal.init();
    FAQ.init();
    HeroParallax.init();
    SmoothScroll.init();
    FormHandler.init();

});
