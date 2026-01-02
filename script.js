// Логика сайта
document.addEventListener('DOMContentLoaded', () => {
    
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Анимация появления при скролле
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
        card.style.transitionDelay = `${index * 0.05}s`; // Быстрый каскад
        observer.observe(card);
    });
});

// --- НАСТРОЙКИ ---

function toggleSettings() {
    const modal = document.getElementById('settings-modal');
    modal.classList.toggle('active');
}

// Переключение фона (вкл/выкл анимацию)
function toggleBgAnim(checkbox) {
    const bg = document.querySelector('.animated-bg');
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
    
    if (checkbox.checked) {
        body.classList.add('festive');
        startSnow();
    } else {
        body.classList.remove('festive');
        stopSnow();
    }
}

function startSnow() {
    const container = document.getElementById('snow-container');
    container.style.display = 'block';
    
    snowInterval = setInterval(() => {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.innerHTML = '❄';
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
        snowflake.style.opacity = Math.random();
        snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
        
        container.appendChild(snowflake);
        
        // Удаляем снежинку через 5 сек
        setTimeout(() => {
            snowflake.remove();
        }, 5000);
    }, 100);
}

function stopSnow() {
    clearInterval(snowInterval);
    document.getElementById('snow-container').innerHTML = ''; // Очистить
    document.getElementById('snow-container').style.display = 'none';
}
