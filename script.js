document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Smooth scrolling for nav links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                gsap.to(window, {
                    scrollTo: { y: targetElement, offsetY: 80 },
                    duration: 1.5,
                    ease: "power2.inOut"
                });
            }
        });
    });

    // Hero Animation
    gsap.from(".hero-text h1", { duration: 1, x: -50, opacity: 0, ease: "power3.out", delay: 0.2 });
    gsap.from(".hero-text p", { duration: 1, x: -50, opacity: 0, ease: "power3.out", delay: 0.4 });
    gsap.from(".hero-text button", { duration: 1, x: -50, opacity: 0, ease: "power3.out", delay: 0.6 });
    gsap.from(".hero-product-image", { duration: 1, x: 50, opacity: 0, ease: "power3.out", delay: 0.8 });

    // Staggered animations for sections
    const sections = document.querySelectorAll("section:not(.hero)");
    sections.forEach(section => {
        const elementsToAnimate = section.querySelectorAll("h2, p, button, .stat-item, .video-image-container, .excellence-image-stack, .icon-feature-item, .split-content, .testimonial-card, .specs-grid, .faq-section .split-content, .newsletter-form");

        gsap.from(elementsToAnimate, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none",
            },
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });
    });

    // Accordion functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionContent = header.nextElementSibling;
            header.classList.toggle('active');
            if (header.classList.contains('active')) {
                gsap.to(accordionContent, { maxHeight: accordionContent.scrollHeight, duration: 0.5, ease: "power2.out" });
            } else {
                gsap.to(accordionContent, { maxHeight: 0, duration: 0.5, ease: "power2.in" });
            }
        });
    });
});
