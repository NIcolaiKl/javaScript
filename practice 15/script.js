const initialMovies = [
  { id: 1, title: "Назад в будущее", genre: "Приключение", releaseYear: 1985, isWatched: true },
  { id: 2, title: "Матрица", genre: "Киберпанк", releaseYear: 1999, isWatched: false }
];

const form = document.getElementById('film-form');
const filterForm = document.getElementById('filter-form');
const tableBody = document.getElementById('film-tbody');
const sortSelect = document.getElementById('sort-select');
const sortBtn = document.getElementById('sort-btn');
const submitBtn = document.getElementById('submit-btn');

let movies = [];
let editId = null;

const saveData = () => localStorage.setItem('movies', JSON.stringify(movies));

const loadData = () => {
  const data = localStorage.getItem('movies');
  movies = data ? JSON.parse(data) : [...initialMovies];
  if (!data) saveData();
};

const renderTable = (data = movies) => {
  tableBody.innerHTML = '';
  
  if (data.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" class="empty-table-msg">Нет фильмов</td></tr>`;
    return;
  }

  data.forEach(movie => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${movie.title}</td>
      <td>${movie.genre}</td>
      <td>${movie.releaseYear}</td>
      <td>${movie.isWatched ? 'Да' : 'Нет'}</td>
      <td>
        <button class="action-btn btn-edit" data-id="${movie.id}">Редактировать</button>
        <button class="action-btn btn-delete" data-id="${movie.id}">Удалить</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
};

const startEdit = (id) => {
  const movie = movies.find(m => m.id === id);
  if (!movie) return;
  
  form.elements.title.value = movie.title;
  form.elements.genre.value = movie.genre;
  form.elements.releaseYear.value = movie.releaseYear;
  form.elements.isWatched.checked = movie.isWatched;
  
  editId = id;
  submitBtn.textContent = 'Сохранить';
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const deleteMovie = (id) => {
  movies = movies.filter(m => m.id !== id);
  saveData();
  renderTable();
};

const actionDict = {
  'btnDelete': deleteMovie,
  'btnEdit': startEdit
};

tableBody.addEventListener('click', (e) => {
  const target = e.target;
  
  if (target.classList.contains('action-btn')) {
    const actionName = target.classList[1].replace('-', '');
    const action = actionDict[actionName];
    
    if (action) {
      const id = +target.dataset.id;
      
      if (actionName === 'btnDelete') {
        if (!confirm('Удалить этот фильм?')) return;
      }
      
      action(id);
    }
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = new FormData(form);
  const title = formData.get('title').trim();
  const genre = formData.get('genre').trim();
  const releaseYear = formData.get('releaseYear');
  const isWatched = formData.get('isWatched') === 'on';

  if (!title || !genre || !releaseYear) {
    alert('Заполните все поля');
    return;
  }

  const film = {
    title,
    genre,
    releaseYear: +releaseYear,
    isWatched,
    id: Date.now()
  };

  if (editId !== null) {
    movies = movies.map(m => m.id === editId ? { ...m, ...film } : m);
    editId = null;
    submitBtn.textContent = 'Добавить';
  } else {
    movies.push(film);
  }

  saveData();
  renderTable();
  e.target.reset();
});

sortBtn.addEventListener('click', () => {
  const value = sortSelect.value;
  let sorted = [...movies]; 
  
  switch (value) {
    case 'title-asc':
      sorted.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
      break;
    case 'title-desc':
      sorted.sort((a, b) => b.title.localeCompare(a.title, 'ru'));
      break;
    case 'year-asc':
      sorted.sort((a, b) => +a.releaseYear - +b.releaseYear);
      break;
    case 'year-desc':
      sorted.sort((a, b) => +b.releaseYear - +a.releaseYear);
      break;
  }
  
  renderTable(sorted);
});

filterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const filterFormData = new FormData(filterForm);
  const entries = Array.from(filterFormData.entries()).filter(([, val]) => val.trim() !== '');

  if (entries.length === 0) {
    renderTable(movies);
    return;
  }

  const filteredFilms = movies.filter(movie => {
    return entries.some(([key, value]) => {
      const searchVal = value.toLowerCase();
      
      if (key === 'filterTitle') return movie.title.toLowerCase().includes(searchVal);
      if (key === 'filterGenre') return movie.genre.toLowerCase().includes(searchVal);
      if (key === 'filterYear') return String(movie.releaseYear).includes(value);
      
      return false;
    });
  });

  renderTable(filteredFilms);
});

loadData();
renderTable();