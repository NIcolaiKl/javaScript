let books = [
  "Война и мир",
  "Преступление и наказание",
  "Мастер и Маргарита",
  "Евгений Онегин",
  "Отцы и дети"
];

const bookList = document.querySelector(".book-list");
const addBtn = document.querySelector(".add-btn");
const searchBtn = document.querySelector(".search-btn");

// Функция теперь только рисует список, без логики подсветки
function renderBooks() {
  bookList.innerHTML = "";
  books.forEach((book, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}) ${book}`;
    bookList.appendChild(li);
  });
}

// Создание элемента книги для добавления без перерисовки всего списка
function createBookElement(book, index) {
  const li = document.createElement("li");
  li.textContent = `${index + 1}) ${book}`;
  return li;
}

addBtn.addEventListener("click", () => {
  const title = prompt("Введите название книги:");
  if (title === null) return;
  
  const trimmed = title.trim();
  
  // Явная проверка длины
  if (trimmed.length === 0) {
    alert("Название книги не введено!");
    return;
  }
  
  books.push(trimmed);
  // Точечное добавление, без renderBooks()
  const newLi = createBookElement(trimmed, books.length - 1);
  bookList.append(newLi);
});

searchBtn.addEventListener("click", () => {
  const query = prompt("Введите название книги для поиска:");
  if (query === null) return;
  
  const trimmed = query.trim().toLowerCase();
  
  if (trimmed.length === 0) {
    alert("Книга не найдена!");
    return;
  }
  
  const index = books.findIndex(book => book.toLowerCase() === trimmed);
  
  if (index === -1) {
    alert("Книга не найдена!");
  } else {
    // Сначала убираем старую подсветку, если она была
    bookList.querySelectorAll("li").forEach(li => li.classList.remove("found"));
    // Точечно подсвечиваем нужную книгу
    bookList.querySelectorAll("li")[index].classList.add("found");
  }
});

renderBooks();