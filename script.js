// ---- NAV Hamburger Toggle ----
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
hamburger?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// ---- Scroll:----
let lastScroll = 0;
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 70) {
        navbar.style.top = '-80px';
    } else {
        navbar.style.top = '0';
    }
    lastScroll = currentScroll;
});

// ---- Smooth Scroll (fix for nav overlay) ----
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// ---- Back to Top Btn ----
const backToTopBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// ---- Animated Range Sliders ----
document.querySelectorAll('input[type="range"].form-range').forEach(range => {
    const bubble = range.parentElement.querySelector('.range-bubble');
    function setVars() {
        const val = Number(range.value);
        const min = Number(range.min) || 0;
        const max = Number(range.max) || 100;
        // Animate the fill left of thumb
        const pct = ((val - min) / (max - min)) * 100;
        range.style.setProperty('--progress', pct + '%');
        if (bubble) {
            bubble.innerText = val + '%';
            const sliderWidth = range.offsetWidth;
            const left = (pct / 100) * sliderWidth;
            bubble.style.left = `calc(${left}px)`;
        }
    }
    setVars();
    range.addEventListener('input', setVars);
    window.addEventListener('resize', setVars);
});