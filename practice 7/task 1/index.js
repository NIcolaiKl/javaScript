let books = [
  "Война и мир",
  "Преступление и наказание",
  "Мастер и Маргарита",
  "Евгений Онегин",
  "Отцы и дети"
];

const bookList = document.getElementById("bookList");
const addBtn = document.getElementById("addBtn");
const searchBtn = document.getElementById("searchBtn");

function renderBooks(highlightIndex = -1) {
  bookList.innerHTML = "";
  books.forEach((book, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}) ${book}`;
    if (index === highlightIndex) {
      li.classList.add("found");
    }
    bookList.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  const title = prompt("Введите название книги:");
  if (title === null) return;
  const trimmed = title.trim();
  if (!trimmed) {
    alert("Название книги не введено!");
    return;
  }
  books.push(trimmed);
  renderBooks();
});

searchBtn.addEventListener("click", () => {
  const query = prompt("Введите название книги для поиска:");
  if (query === null) return;
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) {
    alert("Книга не найдена!");
    return;
  }
  const index = books.findIndex(book => book.toLowerCase() === trimmed);
  if (index === -1) {
    alert("Книга не найдена!");
  } else {
    renderBooks(index);
  }
});

renderBooks();