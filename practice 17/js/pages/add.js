import { addItem } from '../storage.js';

export const renderAddPage = (navigate) => {
  const container = document.createElement('div');
  
  const title = document.createElement('h1');
  title.textContent = 'Добавить запись';
  container.append(title);

  const form = document.createElement('form');
  form.className = 'form-group';
  form.innerHTML = `
    <div style="margin-bottom: 15px;">
      <label>Название:</label>
      <input type="text" name="name" />
      <div class="error-msg name-err"></div>
    </div>
    <div style="margin-bottom: 15px;">
      <label>Полка:</label>
      <input type="text" name="shelf" />
      <div class="error-msg shelf-err"></div>
    </div>
    <div style="margin-bottom: 15px;">
      <label>Вес (кг):</label>
      <input type="number" name="weight" step="0.1" />
      <div class="error-msg weight-err"></div>
    </div>
    <div style="margin-bottom: 15px;">
      <label>Время хранения:</label>
      <input type="text" name="storageTime" />
      <div class="error-msg time-err"></div>
    </div>
    <button type="submit" class="btn">Добавить</button>
  `;

  const validateInput = (input, errorEl, message) => {
    if (input.value.trim().length === 0) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
      input.style.borderColor = '#d9534f';
      return false;
    }
    errorEl.style.display = 'none';
    input.style.borderColor = '#ccc';
    return true;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = form.elements.name;
    const shelfInput = form.elements.shelf;
    const weightInput = form.elements.weight;
    const timeInput = form.elements.storageTime;

    const isNameValid = validateInput(nameInput, form.querySelector('.name-err'), 'Введите название');
    const isShelfValid = validateInput(shelfInput, form.querySelector('.shelf-err'), 'Введите полку');
    const isWeightValid = validateInput(weightInput, form.querySelector('.weight-err'), 'Введите вес');
    const isTimeValid = validateInput(timeInput, form.querySelector('.time-err'), 'Введите время хранения');

    if (!isNameValid || !isShelfValid || !isWeightValid || !isTimeValid) return;

    const formData = new FormData(form);
    
    const newItem = {
      id: Date.now(),
      name: formData.get('name').trim(),
      shelf: formData.get('shelf').trim(),
      weight: +formData.get('weight'),
      storageTime: formData.get('storageTime').trim()
    };

    addItem(newItem);
    navigate('/');
  });

  container.append(form);
  return container;
};