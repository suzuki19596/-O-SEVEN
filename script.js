/**
 * O-SEVEN Corporate Website JavaScript
 * Enhanced with modern animations
 */

document.addEventListener('DOMContentLoaded', function() {
    // Page Load Animation
    initPageLoadAnimation();

    // Mobile Menu Toggle
    initMobileMenu();

    // Scroll Animations
    initScrollAnimations();

    // Header Scroll Effect
    initHeaderScroll();

    // Smooth Scroll for Anchor Links
    initSmoothScroll();

    // Parallax Effects
    initParallaxEffects();

    // Custom Cursor
    initCustomCursor();
});

/**
 * Page Load Animation
 */
function initPageLoadAnimation() {
    document.body.classList.add('page-loaded');
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-list a');

    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    mobileNavLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/**
 * Scroll Animations with Stagger Effect
 */
function initScrollAnimations() {
    // Elements with fade-in animation
    const fadeElements = document.querySelectorAll('.section-header, .about-content, .recruit-content, .greeting-content, .philosophy-content, .info-table, .service-detail-item, .service-intro-content, .recruit-message-content, .cta-content, .apply-content, .partner-box');

    // Elements with stagger animation (cards)
    const staggerContainers = document.querySelectorAll('.strength-content, .service-list, .environment-grid');

    // Add fade-in class to basic elements
    fadeElements.forEach(function(el) {
        el.classList.add('fade-in');
    });

    // Add stagger animation to card containers
    staggerContainers.forEach(function(container) {
        const items = container.children;
        Array.from(items).forEach(function(item, index) {
            item.classList.add('fade-in');
            item.classList.add('delay-' + Math.min(index + 1, 5));
        });
    });

    // Create observer for fade-in elements
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(function(el) {
        observer.observe(el);
    });

    // Special observer for section headers (trigger slightly earlier)
    const headerObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('.section-header').forEach(function(header) {
        headerObserver.observe(header);
    });
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScrollY = 0;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();

            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Loading Animation (Optional)
 */
function initLoadingAnimation() {
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
}

/**
 * Parallax Effects
 */
function initParallaxEffects() {
    const heroImage = document.querySelector('.hero-image img');

    if (!heroImage) return;

    // Subtle parallax on hero image
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const heroHeight = document.querySelector('.hero')?.offsetHeight || 0;

        if (scrollY < heroHeight) {
            const parallaxValue = scrollY * 0.3;
            heroImage.style.transform = `translateY(${parallaxValue}px)`;
        }
    }, { passive: true });
}

/**
 * Text Typing Animation (Optional utility)
 */
function typeText(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

/**
 * Counter Animation (Optional utility)
 */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    updateCounter();
}

/**
 * Custom Cursor
 */
function initCustomCursor() {
    // Check if touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        return;
    }

    // Check if mobile
    if (window.innerWidth <= 768) {
        return;
    }

    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(cursorDot);

    const cursorText = document.createElement('div');
    cursorText.className = 'custom-cursor-text';
    document.body.appendChild(cursorText);

    // Add class to body
    document.body.classList.add('has-custom-cursor');

    // Cursor position
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    // Update cursor position on mouse move
    document.addEventListener('mousemove', function(e) {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Smooth follow for outer cursor
        const dx = cursorX - dotX;
        const dy = cursorY - dotY;
        dotX += dx * 0.15;
        dotY += dy * 0.15;

        cursor.style.left = dotX + 'px';
        cursor.style.top = dotY + 'px';

        // Dot follows exactly
        cursorDot.style.left = cursorX + 'px';
        cursorDot.style.top = cursorY + 'px';

        // Text follows cursor
        cursorText.style.left = cursorX + 'px';
        cursorText.style.top = (cursorY + 40) + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects for different elements
    const links = document.querySelectorAll('a:not(.btn)');
    const buttons = document.querySelectorAll('.btn, button');
    const images = document.querySelectorAll('.about-img, .recruit-img, .service-img, .hero-image img');

    // Link hover
    links.forEach(function(link) {
        link.addEventListener('mouseenter', function() {
            cursor.classList.add('hover-link');
        });
        link.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover-link');
        });
    });

    // Button hover
    buttons.forEach(function(btn) {
        btn.addEventListener('mouseenter', function() {
            cursor.classList.add('hover-btn');
            cursorText.textContent = 'Click';
            cursorText.classList.add('visible');
        });
        btn.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover-btn');
            cursorText.classList.remove('visible');
        });
    });

    // Image hover
    images.forEach(function(img) {
        img.addEventListener('mouseenter', function() {
            cursor.classList.add('hover-image');
            cursorText.textContent = 'View';
            cursorText.classList.add('visible');
        });
        img.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover-image');
            cursorText.classList.remove('visible');
        });
    });

    // Click effect
    document.addEventListener('mousedown', function() {
        cursor.classList.add('clicking');
    });
    document.addEventListener('mouseup', function() {
        cursor.classList.remove('clicking');
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });
}
