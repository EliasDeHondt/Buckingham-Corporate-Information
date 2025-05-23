/**
    * @author  EliasDH Team
    * @see https://eliasdh.com
    * @since 01/01/2025
**/

// Load external content
document.addEventListener('DOMContentLoaded', function() {
    loadExternalContent("context-menu", "/Buckingham-Corporate-Information/assets/includes/context-menu.html");
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.article-section');
    const legendLinks = document.querySelectorAll('.article-nav-link');
    const header = document.querySelector('.article-header');
    const headerHeight = header ? header.offsetHeight : 0;

    legendLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            const offsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            legendLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                legendLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
});