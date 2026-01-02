document.addEventListener('DOMContentLoaded', () => {
    
    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Анимация появления при скролле (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        // Начальное состояние
        card.style.opacity = 0;
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        // Задержка для каждого элемента (лесенка)
        card.style.transitionDelay = `${index * 0.1}s`;
        
        observer.observe(card);
    });
});
