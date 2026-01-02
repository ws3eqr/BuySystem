// --- 1. НАСТРОЙКА МАТРИЦЫ (ФОН) ---
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

// Символы: Латиница, цифры и спецсимволы
const chars = 'WS3EQR_010101_<>{}[]*&^%$#@!ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const drops = [];
const fontSize = 14;
const columns = w / fontSize;

// Инициализация капель
for(let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawMatrix() {
    // Полупрозрачный черный для эффекта следа
    ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = '#00ff88'; // Цвет текста (Зеленый)
    ctx.font = fontSize + 'px JetBrains Mono';

    for(let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Случайный сброс капли наверх
        if(drops[i] * fontSize > h && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Запуск анимации (30 кадров в секунду)
setInterval(drawMatrix, 33);

// При изменении размера окна обновляем канвас
window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
});


// --- 2. ЛОГИКА ИНТЕРФЕЙСА ---

// Интро (срабатывает при загрузке)
window.onload = () => {
    setTimeout(() => {
        const intro = document.getElementById('intro-layer');
        const app = document.getElementById('app-interface');

        // Скрываем интро
        intro.style.opacity = '0';
        intro.style.pointerEvents = 'none';

        // Показываем приложение
        app.style.opacity = '1';
    }, 2000); // 2000мс = 2 секунды
};

// Переключение вкладок
function openTab(tabName) {
    // 1. Скрываем все сетки с товарами
    const grids = document.querySelectorAll('.grid');
    grids.forEach(grid => grid.classList.remove('active'));

    // 2. Убираем активный класс у всех кнопок
    const btns = document.querySelectorAll('.tab-btn');
    btns.forEach(btn => btn.classList.remove('active'));

    // 3. Показываем нужную сетку
    document.getElementById(tabName).classList.add('active');

    // 4. Подсвечиваем нажатую кнопку
    // (находим кнопку по тексту onclick)
    event.currentTarget.classList.add('active');
}
