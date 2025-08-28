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
        const elementsToAnimate = section.querySelectorAll("h2, p, button, .stat-item, .video-image-container, .excellence-image-stack, .icon-feature-item, .text-content, .image-content, .testimonial-card, .specs-grid, .faq-section .accordion, .newsletter-form");

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

    // Split content slider functionality
    const featureTexts = document.querySelectorAll('.feature-text');
    const featureImage = document.getElementById('feature-image');
    let currentFeature = 0;

    function showFeature(index) {
        featureTexts.forEach((text, i) => {
            if (i === index) {
                text.classList.add('active');
            } else {
                text.classList.remove('active');
            }
        });
        const newImage = featureTexts[index].getAttribute('data-image');
        gsap.to(featureImage, { opacity: 0, duration: 0.3, onComplete: () => {
            featureImage.src = newImage;
            gsap.to(featureImage, { opacity: 1, duration: 0.3 });
        }});
    }

    setInterval(() => {
        currentFeature = (currentFeature + 1) % featureTexts.length;
        showFeature(currentFeature);
    }, 5000); // Change every 5 seconds

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

    // Video modal functionality
    const videoModal = document.getElementById('video-modal');
    const playButton = document.getElementById('play-button');
    const closeButton = document.getElementById('close-button');
    const videoPlayer = document.getElementById('video-player');

    playButton.addEventListener('click', () => {
        videoModal.style.display = 'block';
        videoPlayer.play();
    });

    closeButton.addEventListener('click', () => {
        videoModal.style.display = 'none';
        videoPlayer.pause();
    });

    window.addEventListener('click', (event) => {
        if (event.target == videoModal) {
            videoModal.style.display = 'none';
            videoPlayer.pause();
        }
    });

    // Off-canvas menu functionality
    const hamburgerButton = document.getElementById('hamburger-button');
    const offcanvasMenu = document.getElementById('offcanvas-menu');
    const closeMenuButton = document.getElementById('close-menu');
    const offcanvasLinks = document.querySelectorAll('.offcanvas-menu a:not(.close-btn)');

    hamburgerButton.addEventListener('click', () => {
        offcanvasMenu.style.width = '250px';
    });

    closeMenuButton.addEventListener('click', () => {
        offcanvasMenu.style.width = '0';
    });

    offcanvasLinks.forEach(link => {
        link.addEventListener('click', () => {
            offcanvasMenu.style.width = '0';
        });
    });
});
