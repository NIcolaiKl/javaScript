const form = document.querySelector('.survey-form');
const nameInput = document.querySelector('.name-input');
const emailInput = document.querySelector('.email-input');
const nameError = document.querySelector('.name-error');
const emailError = document.querySelector('.email-error');
const ratingInput = document.querySelector('.rating-input');
const ratingValue = document.querySelector('.rating-value');
const result = document.querySelector('.result');

// Живое обновление значения ползунка
ratingInput.addEventListener('input', (event) => { 
  ratingValue.textContent = event.target.value; 
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidName = (value) => value.trim().length > 0;
const isValidEmail = (value) => emailRegex.test(value.trim());

// Универсальная функция валидации (рефакторинг от преподавателя)
const validateField = (callback, value, errorField) => {
  if (!callback(value)) {
    errorField.classList.add('invalid');
    return false;
  }
  errorField.classList.remove('invalid');
  return true;
};

// Валидация в момент ввода
nameInput.addEventListener('input', () => {
  validateField(isValidName, nameInput.value, nameInput);
});

emailInput.addEventListener('input', () => {
  validateField(isValidEmail, emailInput.value, emailInput);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Используем validateField для проверки обоих полей
  const okName = validateField(isValidName, nameInput.value, nameInput);
  const okEmail = validateField(isValidEmail, emailInput.value, emailInput);
  
  if (!okName || !okEmail) return;

  // использую FormData для сбора данных
  const formData = new FormData(form);
  const name = formData.get('name');
  const email = formData.get('email');
  const gender = formData.get('gender');
  const rating = formData.get('rating');
  const comments = formData.get('comments');
  
  // Интересы собираем через getAll, так как это чекбоксы
  const interests = formData.getAll('interest');

  result.style.display = 'block';
  result.innerHTML = `
    <h3>Данные пользователя</h3>
    <p><strong>Имя:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Пол:</strong> ${gender}</p>
    <p><strong>Оценка сервиса:</strong> ${rating} / 10</p>
    <p><strong>Интересы:</strong> ${interests.length ? interests.join(', ') : 'не выбраны'}</p>
    <p><strong>Комментарии:</strong> ${comments ? escapeHtml(comments) : '—'}</p>
  `;
});

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, s => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[s]));
}