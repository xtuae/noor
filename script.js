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

    // --- Liquid Image Effect ---
    const canvas = document.getElementById('liquid-image');
    const parent = canvas.parentElement;

    const app = new PIXI.Application({
        view: canvas,
        width: parent.offsetWidth,
        height: parent.offsetHeight,
        transparent: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        resizeTo: parent,
    });

    const image = PIXI.Sprite.from('images/noor-version-color-4.webp');
    image.anchor.set(0.5);
    image.width = app.screen.width;
    image.height = app.screen.height;
    image.x = app.screen.width / 2;
    image.y = app.screen.height / 2;
    app.stage.addChild(image);

    const displacementSprite = PIXI.Sprite.from('https://i.imgur.com/2yYayZk.png');
    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
    app.stage.addChild(displacementSprite);
    app.stage.filters = [displacementFilter];

    displacementFilter.scale.x = 0;
    displacementFilter.scale.y = 0;

    // Mouse interaction
    app.stage.interactive = true;
    app.stage.on("mousemove", onPointerMove);
    app.stage.on("touchmove", onPointerMove);

    function onPointerMove(eventData) {
        gsap.to(displacementFilter.scale, {
            duration: 1,
            x: 50,
            y: 50,
            ease: "power2.out",
            onComplete: () => {
                gsap.to(displacementFilter.scale, {
                    duration: 1,
                    x: 0,
                    y: 0,
                    ease: "power2.out"
                });
            }
        });
    }

    // Staggered animations for other sections
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
