import { getItems, removeItem } from '../storage.js';

export const renderListPage = (navigate) => {
  const container = document.createElement('div');

  const header = document.createElement('div');
  header.style.display = 'flex';
  header.style.justifyContent = 'space-between';
  header.style.alignItems = 'center';
  
  const title = document.createElement('h1');
  title.textContent = 'Склад';
  
  const addBtn = document.createElement('button');
  addBtn.className = 'btn';
  addBtn.textContent = 'Добавить запись';
  addBtn.addEventListener('click', () => navigate('/add'));

  header.append(title, addBtn);
  container.append(header);

  const table = document.createElement('table');
  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th data-sort="name">Название</th>
      <th data-sort="shelf">Полка</th>
      <th data-sort="weight">Вес</th>
      <th data-sort="storageTime">Время хранения</th>
      <th>Действие</th>
    </tr>
  `;
  
  const tbody = document.createElement('tbody');
  
  let items = getItems();
  let sortConfig = { key: null, direction: 1 };

  const renderRows = () => {
    tbody.innerHTML = '';
    
    if (items.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center;">Склад пуст</td></tr>`;
      return;
    }

    items.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.name}</td>
        <td>${item.shelf}</td>
        <td>${item.weight}</td>
        <td>${item.storageTime}</td>
      `;
      
      const actionTd = document.createElement('td');
      const delBtn = document.createElement('button');
      delBtn.className = 'btn btn-danger';
      delBtn.textContent = 'Удалить';
      delBtn.addEventListener('click', () => {
        removeItem(item.id);
        items = getItems();
        renderRows();
      });
      
      actionTd.append(delBtn);
      tr.append(actionTd);
      tbody.append(tr);
    });
  };

  thead.addEventListener('click', (e) => {
    const th = e.target.closest('th');
    if (!th || !th.dataset.sort) return;

    const key = th.dataset.sort;

    if (sortConfig.key === key) {
      sortConfig.direction *= -1;
    } else {
      sortConfig.key = key;
      sortConfig.direction = 1;
    }

    items.sort((a, b) => {
      let valA = a[key];
      let valB = b[key];
      
      if (key === 'weight') {
        return (+valA - +valB) * sortConfig.direction;
      }
      
      return valA.localeCompare(valB, 'ru') * sortConfig.direction;
    });

    renderRows();
  });

  renderRows();
  table.append(thead, tbody);
  container.append(table);

  return container;
};