const form = document.querySelector('.product-form');
const nameInput = document.querySelector('.p-name');
const weightInput = document.querySelector('.p-weight');
const distanceInput = document.querySelector('.p-distance');
const nameError = document.querySelector('.name-error');
const weightError = document.querySelector('.weight-error');
const distanceError = document.querySelector('.distance-error');
const tbody = document.querySelector('.product-table tbody');

const nameRegex = /^[A-Za-zА-Яа-яЁё0-9\s\-]{2,}$/;

// Функции валидации
const isValidName = (value) => nameRegex.test(value.trim());
const isValidNumber = (value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0;

// Универсальная функция валидации
const validateField = (callback, value, errorField) => {
  if (!callback(value)) {
    errorField.classList.add('invalid');
    return false;
  }
  errorField.classList.remove('invalid');
  return true;
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Валидируем все поля
  let ok = true;
  ok = validateField(isValidName, nameInput.value, nameInput) && ok;
  ok = validateField(isValidNumber, weightInput.value, weightInput) && ok;
  ok = validateField(isValidNumber, distanceInput.value, distanceInput) && ok;
  
  if (!ok) return;

  // Сбор данных через FormData
  const formData = new FormData(form);
  const name = formData.get('productName');
  const weight = parseFloat(formData.get('productWeight'));
  const distance = parseFloat(formData.get('productDistance'));
  const cost = (weight * distance) / 10;

  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${escapeHtml(name)}</td>
    <td>${weight}</td>
    <td>${distance}</td>
    <td>${cost.toFixed(2)}</td>
  `;
  tbody.appendChild(tr);

  // Очистка формы и сброс ошибок
  form.reset();
  [nameInput, weightInput, distanceInput].forEach(i => i.classList.remove('invalid'));
  [nameError, weightError, distanceError].forEach(e => e.textContent = '');
});

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, s => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[s]));
}