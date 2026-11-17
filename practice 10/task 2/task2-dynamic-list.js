// Замена id на классы и querySelector
const list = document.querySelector('.dynamic-list');
const addBtn = document.querySelector('.add-btn');
const removeBtn = document.querySelector('.remove-btn');

// Использование стрелочных функций
addBtn.addEventListener('click', () => {
  const li = document.createElement('li');
  li.textContent = 'Новый элемент списка';
  list.appendChild(li);
});

removeBtn.addEventListener('click', () => {
  if (list.lastElementChild) {
    list.removeChild(list.lastElementChild);
  }
});