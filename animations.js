/* ========================================
   ANIMATIONS.JS - Scroll Reveal & Effects
   ======================================== */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    initScrollReveal();
    initParallaxEffects();
    initHoverEffects();
});

/* ========================================
   SCROLL REVEAL ANIMATIONS
   Using Intersection Observer for performance
   ======================================== */
function initScrollReveal() {
    const animatedElements = document.querySelectorAll('[data-animation]');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    // Optionally unobserve after animation
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers
        animatedElements.forEach(el => {
            el.classList.add('animated');
        });
    }
}

/* ========================================
   PARALLAX EFFECTS
   Subtle movement on scroll
   ======================================== */
function initParallaxEffects() {
    const heroCards = document.querySelectorAll('.hero-card');
    const skillIcons = document.querySelectorAll('.skill-icon');

    let ticking = false;

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(function () {
                const scrollY = window.pageYOffset;

                // Hero cards subtle parallax
                heroCards.forEach((card, index) => {
                    const speed = 0.05 * (index + 1);
                    const yPos = -(scrollY * speed);
                    card.style.transform = `translateY(${yPos}px)`;
                });

                ticking = false;
            });

            ticking = true;
        }
    });
}

/* ========================================
   HOVER EFFECTS
   Enhanced interactivity
   ======================================== */
function initHoverEffects() {
    // Work cards 3D tilt effect
    const workCards = document.querySelectorAll('.work-card');

    workCards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Hero cards glow effect
    const heroCards = document.querySelectorAll('.hero-card');

    heroCards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Stat cards counter animation
    const statCards = document.querySelectorAll('.stat-card');

    if ('IntersectionObserver' in window) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const numberEl = entry.target.querySelector('.stat-number');
                    if (numberEl && !numberEl.classList.contains('counted')) {
                        animateCounter(numberEl);
                        numberEl.classList.add('counted');
                    }
                }
            });
        }, { threshold: 0.5 });

        statCards.forEach(card => {
            statObserver.observe(card);
        });
    }
}

/* ========================================
   COUNTER ANIMATION
   Animate numbers counting up
   ======================================== */
function animateCounter(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    const number = parseInt(text.replace(/[^0-9]/g, ''));

    if (isNaN(number)) return;

    const duration = 2000;
    const start = 0;
    const increment = number / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;

        if (current >= number) {
            current = number;
            clearInterval(timer);
        }

        let displayValue = Math.floor(current);
        if (hasPlus) displayValue += '+';
        if (hasPercent) displayValue += '%';

        element.textContent = displayValue;
    }, 16);
}

/* ========================================
   MAGNETIC BUTTON EFFECT
   Buttons follow cursor within bounds
   ======================================== */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', function (e) {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', function () {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

/* ========================================
   TEXT SCRAMBLE EFFECT
   Letter-by-letter reveal animation
   ======================================== */
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

/* ========================================
   CURSOR FOLLOWER
   Custom cursor effect
   ======================================== */
function initCursorFollower() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;

        cursorX += dx * 0.1;
        cursorY += dy * 0.1;

        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

        requestAnimationFrame(animate);
    }

    animate();

    // Grow cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .work-card, .hero-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
    });
}
