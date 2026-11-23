// Получаем элементы
const form = document.getElementById("film-form");
const tbody = document.getElementById("film-tbody");
const deleteAllBtn = document.getElementById("delete-all-btn");

const filterTitle = document.getElementById("filter-title");
const filterGenre = document.getElementById("filter-genre");
const filterYear = document.getElementById("filter-year");
const filterWatched = document.getElementById("filter-watched");

// Функция получения всех фильмов из localStorage
function getFilmsFromStorage() {
    const stored = localStorage.getItem("films");
    return stored ? JSON.parse(stored) : [];
}

// Функция сохранения фильмов в localStorage
function saveFilmsToStorage(films) {
    localStorage.setItem("films", JSON.stringify(films));
}

// 1. Валидация и добавление
function handleFormSubmit(e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const genre = document.getElementById("genre").value.trim();
    const releaseYear = document.getElementById("releaseYear").value.trim();
    const isWatched = document.getElementById("isWatched").checked;

    // Валидация
    if (!title || !genre || !releaseYear) {
        alert("Пожалуйста, заполните все поля: название, жанр и год!");
        return;
    }

    const film = {
        id: Date.now(), // Уникальный ID на основе времени
        title: title,
        genre: genre,
        releaseYear: releaseYear,
        isWatched: isWatched
    };

    const films = getFilmsFromStorage();
    films.push(film);
    saveFilmsToStorage(films);

    form.reset();
    renderTable();
}

// 2. Отрисовка и фильтрация
function renderTable() {
    const films = getFilmsFromStorage();
    tbody.innerHTML = "";

    // Получаем значения фильтров
    const searchTitle = filterTitle.value.trim().toLowerCase();
    const searchGenre = filterGenre.value.trim().toLowerCase();
    const searchYear = filterYear.value.trim();
    const searchWatched = filterWatched.value;

    // Фильтруем массив
    const filteredFilms = films.filter(film => {
        const matchTitle = film.title.toLowerCase().includes(searchTitle);
        const matchGenre = film.genre.toLowerCase().includes(searchGenre);
        const matchYear = searchYear === "" || String(film.releaseYear).includes(searchYear);
        
        let matchWatched = true;
        if (searchWatched === "true") matchWatched = film.isWatched === true;
        if (searchWatched === "false") matchWatched = film.isWatched === false;

        return matchTitle && matchGenre && matchYear && matchWatched;
    });

    if (filteredFilms.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Нет фильмов по заданным критериям</td></tr>`;
        return;
    }

    // Выводим отфильтрованные фильмы
    filteredFilms.forEach((film) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${film.title}</td>
            <td>${film.genre}</td>
            <td>${film.releaseYear}</td>
            <td>${film.isWatched ? "Да" : "Нет"}</td>
            <td>
                <button class="btn-delete" data-id="${film.id}">Удалить</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// 3. Удаление одного фильма
function deleteFilm(id) {
    let films = getFilmsFromStorage();
    films = films.filter(film => film.id !== id);
    saveFilmsToStorage(films);
    renderTable();
}

// 4. Удаление всех фильмов
function deleteAllFilms() {
    if (!confirm("Вы уверены, что хотите удалить ВСЕ фильмы?")) return;
    
    // Очищаем localStorage
    localStorage.removeItem("films");
    renderTable();
}

// --- Обработчики событий ---

// Отправка формы
form.addEventListener("submit", handleFormSubmit);

// Удаление фильма (делегирование событий)
tbody.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-delete")) {
        const id = Number(e.target.dataset.id); // Приводим к числу, т.к. в HTML это строка
        deleteFilm(id);
    }
});

// Удаление всех
deleteAllBtn.addEventListener("click", deleteAllFilms);

// Фильтрация в реальном времени
[filterTitle, filterGenre, filterYear].forEach(input => {
    input.addEventListener("input", renderTable);
});
filterWatched.addEventListener("change", renderTable);

// Первичная загрузка таблицы
renderTable();