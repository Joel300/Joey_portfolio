document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.glass-nav');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const revealElements = document.querySelectorAll('.section-reveal');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const menuToggleBtn = document.getElementById('menu-toggle');
    const navLinksList = document.querySelector('.nav-links');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const featuredContainer = document.getElementById('featured-projects');
    const projectsContainer = document.getElementById('github-projects');
    const projectsStatus = document.getElementById('github-projects-status');

    let scrollScheduled = false;

    const onScroll = () => {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }

        let current = '';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href').includes(current));
        });

        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        revealElements.forEach((element) => {
            const revealTop = element.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };

    const scheduleScroll = () => {
        if (scrollScheduled) return;
        scrollScheduled = true;
        requestAnimationFrame(() => {
            scrollScheduled = false;
            onScroll();
        });
    };

    window.addEventListener('scroll', scheduleScroll, { passive: true });
    onScroll();

    const getThemeByTime = () => {
        const hour = new Date().getHours();
        return (hour >= 18 || hour < 6) ? 'dark' : 'light';
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

    const savedTheme = localStorage.getItem('siteTheme');
    applyTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : getThemeByTime());

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
            applyTheme(nextTheme);
            localStorage.setItem('siteTheme', nextTheme);
        });
    }

    if (menuToggleBtn && navLinksList) {
        menuToggleBtn.addEventListener('click', () => {
            const isOpen = navLinksList.classList.toggle('open');
            menuToggleBtn.setAttribute('aria-expanded', String(isOpen));
            menuToggleBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        });

        navLinksList.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                navLinksList.classList.remove('open');
                menuToggleBtn.setAttribute('aria-expanded', 'false');
                menuToggleBtn.setAttribute('aria-label', 'Open navigation menu');
            });
        });
    }

    const mainElement = document.querySelector('main');
    if (mainElement && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('mousemove', (event) => {
            document.body.style.setProperty('--cursor-x', `${event.clientX}px`);
            document.body.style.setProperty('--cursor-y', `${event.clientY}px`);
        });
    }

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

    const setFormStatus = (message, type) => {
        if (!formStatus) return;
        formStatus.textContent = message;
        formStatus.className = `form-status${type ? ` form-status--${type}` : ''}`;
    };

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const honeypot = contactForm.querySelector('input[name="_gotcha"]');
            if (honeypot && honeypot.value) return;

            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;

            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;
            setFormStatus('', '');

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { Accept: 'application/json' }
                });

                if (response.ok) {
                    setFormStatus('Thanks! Your message was sent successfully.', 'success');
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        setFormStatus(data.errors.map((error) => error.message).join(', '), 'error');
                    } else {
                        setFormStatus('There was a problem submitting your form. Please try again.', 'error');
                    }
                }
            } catch {
                setFormStatus('There was a problem submitting your form. Please try again.', 'error');
            } finally {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    const createMetaTag = (text) => {
        const tag = document.createElement('span');
        tag.className = 'repo-tag';
        tag.textContent = text;
        return tag;
    };

    const createFeaturedCard = (project) => {
        const card = document.createElement('article');
        card.className = 'portfolio-item glass-card featured-card';

        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'portfolio-img-wrapper';
        const image = document.createElement('img');
        image.src = project.image;
        image.alt = project.imageAlt;
        image.loading = 'lazy';
        image.decoding = 'async';
        imageWrapper.appendChild(image);

        const body = document.createElement('div');
        body.className = 'featured-card-body';
        const title = document.createElement('h3');
        title.textContent = project.title;
        const problem = document.createElement('p');
        problem.innerHTML = `<strong>Problem:</strong> ${project.problem}`;
        const role = document.createElement('p');
        role.innerHTML = `<strong>Role:</strong> ${project.role}`;
        const outcome = document.createElement('p');
        outcome.innerHTML = `<strong>Outcome:</strong> ${project.outcome}`;
        body.append(title, problem, role, outcome);

        const meta = document.createElement('div');
        meta.className = 'repo-meta';
        project.stack.forEach((skill) => meta.appendChild(createMetaTag(skill)));

        const actions = document.createElement('div');
        actions.className = 'project-actions';

        if (project.liveUrl) {
            const liveLink = document.createElement('a');
            liveLink.className = 'btn btn-primary';
            liveLink.href = project.liveUrl;
            liveLink.target = '_blank';
            liveLink.rel = 'noopener noreferrer';
            liveLink.textContent = 'Live Demo';
            actions.appendChild(liveLink);
        }

        const repoLink = document.createElement('a');
        repoLink.className = 'btn btn-secondary';
        repoLink.href = project.repoUrl;
        repoLink.target = '_blank';
        repoLink.rel = 'noopener noreferrer';
        repoLink.textContent = 'View Code';
        actions.appendChild(repoLink);

        card.append(imageWrapper, body, meta, actions);
        return card;
    };

    const renderFeaturedProjects = () => {
        if (!featuredContainer || !Array.isArray(FEATURED_PROJECTS)) return;
        const fragment = document.createDocumentFragment();
        FEATURED_PROJECTS.forEach((project) => {
            fragment.appendChild(createFeaturedCard(project));
        });
        featuredContainer.appendChild(fragment);
    };

    const createRepoCard = (repo) => {
        const card = document.createElement('article');
        card.className = 'repo-card glass-card';

        const title = document.createElement('h3');
        title.textContent = repo.name;

        const description = document.createElement('p');
        description.className = 'repo-description';
        description.textContent = repo.description || 'No description provided.';

        const meta = document.createElement('div');
        meta.className = 'repo-meta';
        if (repo.language) meta.appendChild(createMetaTag(repo.language));
        meta.appendChild(createMetaTag(`★ ${repo.stargazers_count}`));
        meta.appendChild(createMetaTag(`Updated ${new Date(repo.updated_at).toLocaleDateString()}`));

        const link = document.createElement('a');
        link.className = 'btn btn-secondary';
        link.href = repo.html_url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'View Repository';

        card.append(title, description, meta, link);
        return card;
    };

    const getCachedRepos = () => {
        try {
            const raw = sessionStorage.getItem(SITE_CONFIG.githubCacheKey);
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (Date.now() - parsed.timestamp > SITE_CONFIG.githubCacheTtlMs) return null;
            return parsed.repos;
        } catch {
            return null;
        }
    };

    const setCachedRepos = (repos) => {
        try {
            sessionStorage.setItem(
                SITE_CONFIG.githubCacheKey,
                JSON.stringify({ timestamp: Date.now(), repos })
            );
        } catch {
            /* ignore quota errors */
        }
    };

    const filterRepos = (repos) => {
        const ownRepos = repos
            .filter((repo) => repo.owner?.login === SITE_CONFIG.githubUser && !repo.fork);

        if (SITE_CONFIG.githubAllowlist.length) {
            const allowlisted = ownRepos.filter((repo) =>
                SITE_CONFIG.githubAllowlist.includes(repo.name)
            );
            if (allowlisted.length) return allowlisted;
        }

        return ownRepos
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            .slice(0, SITE_CONFIG.githubMaxRepos);
    };

    const renderRepos = (repos) => {
        if (!projectsContainer || !projectsStatus) return;

        projectsContainer.innerHTML = '';
        if (!repos.length) {
            projectsStatus.textContent = 'No public repositories found yet.';
            return;
        }

        const fragment = document.createDocumentFragment();
        repos.forEach((repo) => fragment.appendChild(createRepoCard(repo)));
        projectsContainer.appendChild(fragment);
        projectsStatus.textContent = `Showing ${repos.length} GitHub project${repos.length > 1 ? 's' : ''}.`;
    };

    const loadGitHubProjects = async () => {
        if (!projectsContainer || !projectsStatus) return;

        const cached = getCachedRepos();
        if (cached) {
            renderRepos(cached);
            return;
        }

        try {
            const response = await fetch(
                `https://api.github.com/users/${SITE_CONFIG.githubUser}/repos?per_page=100&sort=updated`
            );
            if (!response.ok) throw new Error('Unable to load repositories.');

            const repos = filterRepos(await response.json());
            setCachedRepos(repos);
            renderRepos(repos);
        } catch {
            renderRepos(GITHUB_FALLBACK_REPOS);
            projectsStatus.textContent = 'Showing featured repository (GitHub API unavailable).';
        }
    };

    renderFeaturedProjects();
    loadGitHubProjects();
});
