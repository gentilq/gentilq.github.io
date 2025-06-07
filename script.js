        // Particles Animation
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (3 + Math.random() * 6) + 's';
                particlesContainer.appendChild(particle);
            }
        }

        // Intersection Observer for animations
        function setupScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });
            document.querySelectorAll('.fade-in').forEach(el => {
                observer.observe(el);
            });
        }

        // Smooth scroll for navigation
        function setupSmoothScroll() {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href.startsWith('#')) {
                        e.preventDefault();
                        const target = document.querySelector(href);
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                });
            });
        }

        // Handle project card clicks
        function setupProjectCardClicks() {
            document.querySelectorAll('.project-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    const href = card.getAttribute('href');
                    // Pour l'instant, on affiche une alerte, plus tard vous pourrez rediriger vers les pages individuelles
					if (!/\.html$/.test(href)){
					e.preventDefault();
                    alert(`Redirection vers la page: ${href.replace('#', '')}\n(Page en cours de développement)`);
					}
                });
            });
        }

        // Initialize everything
        document.addEventListener('DOMContentLoaded', () => {
            createParticles();
            setupScrollAnimations();
            setupSmoothScroll();
            setupProjectCardClicks();
            
            // Show first elements immediately
            setTimeout(() => {
                document.querySelectorAll('#home .fade-in .project-header').forEach((el, index) => {
                    setTimeout(() => el.classList.add('visible'), index * 200);
                });
            }, 500);
        });

        // Add mouse movement effect to project cards
        document.addEventListener('mousemove', (e) => {
            const cards = document.querySelectorAll('.project-card');
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const cardCenterX = rect.left + rect.width / 2;
                const cardCenterY = rect.top + rect.height / 2;
                const deltaX = (mouseX - cardCenterX) / 20;
                const deltaY = (mouseY - cardCenterY) / 20;
                if (rect.left <= mouseX && mouseX <= rect.right && 
                    rect.top <= mouseY && mouseY <= rect.bottom) {
                    card.style.transform = `translateY(-5px) rotateX(${deltaY}deg) rotateY(${deltaX}deg)`;
                } else {
                    card.style.transform = '';
                }
            });
        });