// Ждем загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    
    // Находим все элементы с классом 'tilt'
    const tiltElements = document.querySelectorAll('.tilt');

    tiltElements.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Вычисляем координаты мыши внутри карточки
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top; 

            // Центр карточки
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Вычисляем угол поворота (максимум 15 градусов)
            const rotateX = ((y - centerY) / centerY) * -10; 
            const rotateY = ((x - centerX) / centerX) * 10; 

            // Применяем стили (поворот + блик)
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            
            // Эффект динамического света (блик)
            // Добавляем градиент поверх карточки
            card.style.backgroundImage = `
                linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)
            `;
        });

        // Когда мышь уходит, возвращаем карточку на место
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            card.style.backgroundImage = 'none';
        });
    });

    // Плавный скролл для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
