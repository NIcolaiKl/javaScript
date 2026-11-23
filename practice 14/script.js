let sortMode = 'none';

function handleFormSubmit(e) {
    e.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const genre = document.querySelector('#genre').value.trim();
    const releaseYear = document.querySelector('#releaseYear').value;
    const isWatched = document.querySelector('#isWatched').checked;

    if (!title || !genre || !releaseYear) {
        alert('Заполните все поля');
        return;
    }

    const film = {
        title,
        genre,
        releaseYear,
        isWatched,
        id: Date.now()
    };

    addFilmToLocalStorage(film);
    e.target.reset();
}

function addFilmToLocalStorage(film) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    films.push(film);
    localStorage.setItem('films', JSON.stringify(films));
    renderTable();
}

function getSortedFilms(films) {
    const sorted = [...films];

    switch (sortMode) {
        case 'title-asc':
            sorted.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
            break;
        case 'title-desc':
            sorted.sort((a, b) => b.title.localeCompare(a.title, 'ru'));
            break;
        case 'year-asc':
            sorted.sort((a, b) => Number(a.releaseYear) - Number(b.releaseYear));
            break;
        case 'year-desc':
            sorted.sort((a, b) => Number(b.releaseYear) - Number(a.releaseYear));
            break;
        default:
            break;
    }

    return sorted;
}

function renderTable() {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const filmTableBody = document.querySelector('#film-tbody');

    filmTableBody.innerHTML = "";

    const filmsToRender = getSortedFilms(films);

    filmsToRender.forEach((film) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${film.title}</td>
            <td>${film.genre}</td>
            <td>${film.releaseYear}</td>
            <td>${film.isWatched ? "Да" : "Нет"}</td>
            <td>
                <button class="btn-edit" data-id="${film.id}">Редактировать</button>
                <button class="btn-delete" data-id="${film.id}">Удалить</button>
            </td>
        `;
        filmTableBody.appendChild(row);
    });
}

function deleteFilm(id) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const filtered = films.filter(film => film.id !== id);
    localStorage.setItem('films', JSON.stringify(filtered));
    renderTable();
}

function editFilm(id) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const film = films.find(film => film.id === id);

    if (!film) return;

    const newTitle = prompt('Название фильма:', film.title);
    if (newTitle === null) return;

    const newGenre = prompt('Жанр:', film.genre);
    if (newGenre === null) return;

    const newYear = prompt('Год выпуска:', film.releaseYear);
    if (newYear === null) return;

    const newWatched = confirm('Фильм просмотрен? (ОК — Да, Отмена — Нет)');

    film.title = newTitle.trim() || film.title;
    film.genre = newGenre.trim() || film.genre;
    film.releaseYear = newYear.trim() || film.releaseYear;
    film.isWatched = newWatched;

    localStorage.setItem('films', JSON.stringify(films));
    renderTable();
}

document.querySelector('#film-form').addEventListener('submit', handleFormSubmit);

document.querySelector('#film-tbody').addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('btn-delete')) {
        const id = Number(target.dataset.id);
        if (confirm('Удалить этот фильм?')) {
            deleteFilm(id);
        }
    }

    if (target.classList.contains('btn-edit')) {
        const id = Number(target.dataset.id);
        editFilm(id);
    }
});

document.querySelector('#sort-select').addEventListener('change', (e) => {
    sortMode = e.target.value;
    renderTable();
});

renderTable();