

const slides = document.querySelectorAll('.cv-slide');
const progressBar = document.getElementById('sliderBar');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
let current = 0;
const SLIDE_TIME = 3500;
let autoSlide;

function showSlide(idx) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === idx);
    });
    if (progressBar) {
        progressBar.style.width = ((idx + 1) / slides.length * 100) + '%';
    }
    current = idx;
}
function nextSlide() {
    showSlide((current + 1) % slides.length);
}
function prevSlide() {
    showSlide((current - 1 + slides.length) % slides.length);
}
function startAutoSlide() {
    autoSlide = setInterval(nextSlide, SLIDE_TIME);
}
function stopAutoSlide() {
    clearInterval(autoSlide);
}
if (nextBtn && prevBtn) {
    nextBtn.onclick = () => { nextSlide(); stopAutoSlide(); startAutoSlide(); };
    prevBtn.onclick = () => { prevSlide(); stopAutoSlide(); startAutoSlide(); };
}
let startX = 0;
document.querySelector('.cv-slider').addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
});
document.querySelector('.cv-slider').addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) { prevSlide(); stopAutoSlide(); startAutoSlide(); }
    else if (startX - endX > 50) { nextSlide(); stopAutoSlide(); startAutoSlide(); }
});
showSlide(0);
startAutoSlide();

