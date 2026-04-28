document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.glass-nav');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 2. Active Link Switching based on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 3. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.section-reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

    // 4. Theme Toggle + persistence
    const themeToggleBtn = document.getElementById('theme-toggle');
    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem('siteTheme');
        if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    };

    const applyTheme = (theme) => {
        const isLight = theme === 'light';
        document.body.classList.toggle('light-theme', isLight);
        if (themeToggleBtn) {
            themeToggleBtn.textContent = isLight ? '☀️' : '🌙';
            themeToggleBtn.setAttribute('aria-pressed', String(isLight));
            themeToggleBtn.setAttribute('title', isLight ? 'Switch to dark mode' : 'Switch to light mode');
        }
    };

    applyTheme(getInitialTheme());

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
            applyTheme(nextTheme);
            localStorage.setItem('siteTheme', nextTheme);
        });
    }

    // 5. Mobile menu toggle
    const menuToggleBtn = document.getElementById('menu-toggle');
    const navLinksList = document.querySelector('.nav-links');
    if (menuToggleBtn && navLinksList) {
        menuToggleBtn.addEventListener('click', () => {
            const isOpen = navLinksList.classList.toggle('open');
            menuToggleBtn.setAttribute('aria-expanded', String(isOpen));
        });

        navLinksList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksList.classList.remove('open');
                menuToggleBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 6. Subtle cursor-follow glow
    const mainElement = document.querySelector('main');
    if (mainElement && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('mousemove', (event) => {
            document.body.style.setProperty('--cursor-x', `${event.clientX}px`);
            document.body.style.setProperty('--cursor-y', `${event.clientY}px`);
        });
    }

    // 7. Count-up animation for numeric stats
    const countItems = document.querySelectorAll('.count-up');
    if (countItems.length) {
        const animateCount = (el) => {
            const target = Number(el.dataset.target || 0);
            const suffix = el.dataset.suffix || '';
            const durationMs = 1000;
            const start = performance.now();

            const tick = (now) => {
                const progress = Math.min((now - start) / durationMs, 1);
                const value = Math.floor(progress * target);
                el.textContent = `${value}${suffix}`;
                if (progress < 1) {
                    requestAnimationFrame(tick);
                } else {
                    el.textContent = `${target}${suffix}`;
                }
            };

            requestAnimationFrame(tick);
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        countItems.forEach((item) => observer.observe(item));
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // 8. Form Submission Handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button');
            const originalBtnText = submitBtn.innerText;
            
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    alert('Thanks! Your message has been sent successfully.');
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        alert(data["errors"].map(error => error["message"]).join(", "));
                    } else {
                        alert('Oops! There was a problem submitting your form.');
                    }
                }
            } catch (error) {
                alert('Oops! There was a problem submitting your form.');
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
