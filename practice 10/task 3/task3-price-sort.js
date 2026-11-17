// Вынесли JS в отдельный файл
(function initPriceSorter() {
  let prices = [100, 500, 250, 750, 300];

  // Замена id на классы и querySelector
  const list = document.querySelector('.prices-list');
  const ascBtn = document.querySelector('.sort-asc');
  const descBtn = document.querySelector('.sort-desc');

  // Стрелочная функция
  const render = () => {
    list.innerHTML = '';
    prices.forEach((price) => {
      const li = document.createElement('li');
      li.textContent = price + ' ₽';
      list.appendChild(li);
    });
  };

  // Сортировка по возрастанию
  const sortAsc = () => {
    prices = prices.toSorted((a, b) => a - b);
    render();
  };

  // Сортировка по убыванию
  const sortDesc = () => {
    prices = prices.toSorted((a, b) => b - a);
    render();
  };

  ascBtn.addEventListener('click', sortAsc);
  descBtn.addEventListener('click', sortDesc);

  render();
})();