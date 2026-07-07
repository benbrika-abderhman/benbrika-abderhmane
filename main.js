/* ========================================
   MAIN.JS - Benbrika Abderhman Portfolio
   Matching salmangsamar.com functionality
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {
    initParticles();
    initNavigation();
    initMobileMenu();
    initSmoothScroll();
    initBusinessTabs();
    initProjectSelector();
    initTestimonials();
    initContactForm();
    initScrollAnimations();
    initIconInteraction();
    initIntro(); // Added Intro
    initSnow(); // Added Snow
});

/* ========================================
   INTRO VIDEO
   ======================================== */
function initIntro() {
    const introScreen = document.getElementById('introScreen');
    if (!introScreen) return;

    document.body.classList.add('loading');

    // Total animation time is approx 3s (1s start + 0.5s beat + 1.5s end)
    // We wait 3.5s then fade out
    setTimeout(() => {
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');

        setTimeout(() => {
            introScreen.style.display = 'none';
        }, 1000); // Wait for CSS opacity transition
    }, 3500);
}

/* ========================================
   SNOW EFFECT
   ======================================== */
function initSnow() {
    const container = document.getElementById('snow-container');
    if (!container) return;

    const snowflakeCount = 50; // Number of snowflakes

    for (let i = 0; i < snowflakeCount; i++) {
        createSnowflake(container);
    }
}

function createSnowflake(container) {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerHTML = '❄'; // Emoji or SVG

    // Randomize properties
    const startLeft = Math.random() * 100;
    const animationDuration = Math.random() * 5 + 5 + 's'; // 5-10s
    const animationDelay = Math.random() * 5 + 's';
    const size = Math.random() * 10 + 10 + 'px'; // 10-20px
    const opacity = Math.random() * 0.5 + 0.3;

    snowflake.style.left = startLeft + '%';
    snowflake.style.animationDuration = animationDuration;
    snowflake.style.animationDelay = animationDelay;
    snowflake.style.fontSize = size;
    snowflake.style.opacity = opacity;

    container.appendChild(snowflake);
}

/* ========================================
   ICON INTERACTION - Scatter Effect
   ======================================== */
function initIconInteraction() {
    const icons = document.querySelectorAll('.software-icon');
    const container = document.querySelector('.software-wrapper');

    if (!container || icons.length === 0) return;

    container.addEventListener('mousemove', function (e) {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        icons.forEach(icon => {
            // Get icon position (relative to container center because of CSS offset)
            // We need to approximation/calculation here since they are absolutely positioned with transforms
            // A simpler approach is to use the element's current exact position
            const iconRect = icon.getBoundingClientRect();
            const iconX = iconRect.left + iconRect.width / 2 - rect.left;
            const iconY = iconRect.top + iconRect.height / 2 - rect.top;

            const deltaX = mouseX - iconX;
            const deltaY = mouseY - iconY;
            const distance = Math.sqrt(deltaX * deltaX + deltaX * deltaY);

            // Interaction radius
            const radius = 300;

            if (distance < radius) {
                // Calculate repulsion strength (closer = stronger)
                const strength = (1 - distance / radius) * 40; // Max movement 40px
                const angle = Math.atan2(deltaY, deltaX);

                // Move AWAY from mouse
                const moveX = -Math.cos(angle) * strength;
                const moveY = -Math.sin(angle) * strength;

                icon.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
                // Pause css animation slightly to prevent conflict jitter
                icon.style.animationPlayState = 'paused';
            } else {
                // Reset (remove inline transform so CSS takes over, and resume animation)
                icon.style.transform = '';
                icon.style.animationPlayState = 'running';
            }
        });
    });

    container.addEventListener('mouseleave', function () {
        icons.forEach(icon => {
            icon.style.transform = '';
            icon.style.animationPlayState = 'running';
        });
    });
}

/* ========================================
   PARTICLES.JS - Star Background Effect
   ======================================== */
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 200,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.8,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 0.5,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 2,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        size_min: 0.5,
                        sync: false
                    }
                },
                line_linked: {
                    enable: false
                },
                move: {
                    enable: true,
                    speed: 0.3,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: false
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 150,
                        line_linked: {
                            opacity: 0.3
                        }
                    }
                }
            },
            retina_detect: true
        });
    }
}

/* ========================================
   NAVIGATION
   ======================================== */
function initNavigation() {
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    // Nav scroll effect
    window.addEventListener('scroll', function () {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollPos = window.pageYOffset + window.innerHeight / 3;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
}

/* ========================================
   MOBILE MENU
   ======================================== */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('mobileMenu');
    const links = document.querySelectorAll('.mobile-link');

    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            toggle.classList.toggle('active');
            menu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        links.forEach(link => {
            link.addEventListener('click', function () {
                toggle.classList.remove('active');
                menu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#top') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 100;
                const targetPos = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   BUSINESS TABS
   ======================================== */
function initBusinessTabs() {
    const logos = document.querySelectorAll('.business-logo');
    const details = document.querySelectorAll('.business-detail-card');

    logos.forEach(logo => {
        logo.addEventListener('click', function () {
            const business = this.getAttribute('data-business');

            // Update active logo
            logos.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Update active detail card
            details.forEach(detail => {
                detail.classList.remove('active');
                if (detail.getAttribute('data-business') === business) {
                    detail.classList.add('active');
                }
            });
        });
    });
}

/* ========================================
   PROJECT SELECTOR
   ======================================== */
function initProjectSelector() {
    const icons = document.querySelectorAll('.project-icon');
    const projects = document.querySelectorAll('.project-details');

    icons.forEach(icon => {
        icon.addEventListener('click', function () {
            const projectId = this.getAttribute('data-project');

            // Update active icon
            icons.forEach(i => i.classList.remove('active'));
            this.classList.add('active');

            // Update active project
            projects.forEach(project => {
                project.classList.remove('active');
                if (project.getAttribute('data-project') === projectId) {
                    project.classList.add('active');
                }
            });
        });
    });
}

/* ========================================
   TESTIMONIALS CAROUSEL
   ======================================== */
function initTestimonials() {
    const testimonials = [
        {
            quote: "Benbrika transformed our online presence completely. Professional, creative, and always delivers on time. Highly recommended!",
            author: "Ahmed K.",
            role: "Business Owner",
            avatar: "A"
        },
        {
            quote: "The trading insights and analysis have been invaluable. Highly recommend his educational content and professional approach.",
            author: "Mohamed S.",
            role: "Trader",
            avatar: "M"
        },
        {
            quote: "Our social media engagement increased by 300% after working with Benbrika. Amazing results and great communication!",
            author: "Youssef B.",
            role: "Brand Manager",
            avatar: "Y"
        }
    ];

    let currentIndex = 0;
    const mainCard = document.querySelector('.testimonial-main-card');
    const prevBtn = document.querySelector('.nav-arrow.prev');
    const nextBtn = document.querySelector('.nav-arrow.next');
    const cursorTags = document.querySelectorAll('.cursor-tag');

    function updateTestimonial(index) {
        if (!mainCard) return;

        const testimonial = testimonials[index];
        const quote = mainCard.querySelector('.testimonial-quote');
        const author = mainCard.querySelector('.author-info h4');
        const role = mainCard.querySelector('.author-info span');
        const avatar = mainCard.querySelector('.author-avatar');

        // Fade out
        mainCard.style.opacity = '0';
        mainCard.style.transform = 'translateY(20px)';

        setTimeout(() => {
            quote.textContent = `"${testimonial.quote}"`;
            author.textContent = testimonial.author;
            role.textContent = testimonial.role;
            avatar.textContent = testimonial.avatar;

            // Fade in
            mainCard.style.opacity = '1';
            mainCard.style.transform = 'translateY(0)';
        }, 300);

        // Update cursor tags
        cursorTags.forEach((tag, i) => {
            tag.classList.toggle('active', i === index);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            updateTestimonial(currentIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateTestimonial(currentIndex);
        });
    }

    // Cursor tag click
    cursorTags.forEach((tag, index) => {
        tag.addEventListener('click', () => {
            currentIndex = index;
            updateTestimonial(currentIndex);
        });
    });

    // Auto-rotate
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateTestimonial(currentIndex);
    }, 6000);

    // Add transition styles
    if (mainCard) {
        mainCard.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }
}

/* ========================================
   CONTACT FORM
   ======================================== */
/* ========================================
   CONTACT FORM
   ======================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', function () {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = '<span>Sending...</span>';
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.7';
            }
            // Do NOT call e.preventDefault() so it submits natively
        });
    }
}

/* ========================================
   SCROLL ANIMATIONS
   ======================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animation]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animation = element.getAttribute('data-animation');

                element.style.opacity = '1';
                element.style.transform = 'translateY(0) translateX(0)';

                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';

        const animation = element.getAttribute('data-animation');
        if (animation === 'fade-up') {
            element.style.transform = 'translateY(30px)';
        } else if (animation === 'fade-left') {
            element.style.transform = 'translateX(30px)';
        } else if (animation === 'fade-right') {
            element.style.transform = 'translateX(-30px)';
        }

        observer.observe(element);
    });

    // Skills bars animation
    const skillBars = document.querySelectorAll('.bar-fill');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'scaleX(1)';
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        bar.style.transform = 'scaleX(0)';
        bar.style.transformOrigin = 'left';
        bar.style.transition = 'transform 1s ease';
        skillObserver.observe(bar);
    });
}

/* ========================================
   TOAST NOTIFICATIONS
   ======================================== */
function showToast(message, type = 'info') {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span class="toast-message">${message}</span>
        <button class="toast-close">&times;</button>
    `;

    // Styles
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        background: type === 'success' ? '#4AD97B' : type === 'error' ? '#E1306C' : '#4A90D9',
        color: '#161B1C',
        padding: '16px 24px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontWeight: '500',
        boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
        zIndex: '9999',
        transform: 'translateY(100px)',
        opacity: '0',
        transition: 'all 0.3s ease'
    });

    document.body.appendChild(toast);

    // Close button
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.style.cssText = 'background:none;border:none;font-size:20px;cursor:pointer;opacity:0.7;';
    closeBtn.addEventListener('click', () => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    });

    // Show
    setTimeout(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    }, 100);

    // Auto hide
    setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

/* ========================================
   UTILITY: Debounce
   ======================================== */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/* ========================================
   BENTO CARD TILT EFFECT
   ======================================== */
document.querySelectorAll('.bento-card').forEach(card => {
    card.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});
