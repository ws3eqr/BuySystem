// --- ЛОГИКА НАСТРОЕК ---

function toggleSettings() {
    const modal = document.getElementById('settings-modal');
    // Добавляем класс 'open' для анимации
    if (modal.classList.contains('open')) {
        modal.classList.remove('open');
        setTimeout(() => modal.style.display = 'none', 300); // Ждем конца анимации
    } else {
        modal.style.display = 'flex';
        // Небольшая задержка чтобы CSS анимация сработала
        setTimeout(() => modal.classList.add('open'), 10);
    }
}

// Закрытие при клике вне окна
window.onclick = function(event) {
    const modal = document.getElementById('settings-modal');
    if (event.target == modal) {
        toggleSettings();
    }
}

// Переключение фона
function toggleBg() {
    const checkbox = document.getElementById('bg-toggle');
    const bg = document.getElementById('bg-layer');
    
    if(checkbox.checked) {
        bg.style.display = 'block';
    } else {
        bg.style.display = 'none';
        document.body.style.background = '#050505';
    }
}

// --- НОВОГОДНИЙ РЕЖИМ ---
let snowInterval;

function toggleFestive() {
    const checkbox = document.getElementById('festive-toggle');
    const body = document.body;
    const snowContainer = document.getElementById('snow-container');
    
    if (checkbox.checked) {
        body.classList.add('festive'); // Меняем цвета CSS
        snowContainer.style.display = 'block';
        startSnow();
    } else {
        body.classList.remove('festive');
        snowContainer.style.display = 'none';
        stopSnow();
    }
}

function startSnow() {
    // Чтобы не дублировалось
    if(snowInterval) clearInterval(snowInterval);

    snowInterval = setInterval(() => {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.innerHTML = '❄';
        
        // Случайная позиция и размер
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.opacity = Math.random();
        snowflake.style.fontSize = (Math.random() * 10 + 10) + 'px';
        snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        document.getElementById('snow-container').appendChild(snowflake);
        
        // Удаление
        setTimeout(() => {
            snowflake.remove();
        }, 5000);
    }, 100);
}

function stopSnow() {
    clearInterval(snowInterval);
    document.getElementById('snow-container').innerHTML = '';
}

// --- АНИМАЦИЯ ПОЯВЛЕНИЯ ПРИ СКРОЛЛЕ ---
document.addEventListener('DOMContentLoaded', () => {
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
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.5s ease';
        card.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(card);
    });
    
    // Плавный скролл
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
