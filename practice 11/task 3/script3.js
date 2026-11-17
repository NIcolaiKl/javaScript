const cardText = document.querySelector('.card-text-input');
const colorSelect = document.querySelector('.color-select');
const card = document.querySelector('.card-display');

const COLOR_MAP = {
  red: '#e53935',
  blue: '#1e88e5',
  green: '#43a047',
  '': '#999'
};

// input — обновляем текст карты
cardText.addEventListener('input', (e) => {
  card.textContent = e.target.value || 'Ваша карта';
});

// focus — подсветка поля
cardText.addEventListener('focus', () => {
  cardText.classList.add('focused');
});

// blur — сброс стиля
cardText.addEventListener('blur', () => {
  cardText.classList.remove('focused');
});

// change — смена цвета карты
colorSelect.addEventListener('change', (e) => {
  card.style.background = COLOR_MAP[e.target.value] || '#999';
});