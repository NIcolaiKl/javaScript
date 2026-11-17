let products = ["Арбуз", "Книга", "Кофе", "Макароны", "Молоко", "Сахар", "Яблоки"];

const productList = document.querySelector(".product-list");
const addBtn = document.querySelector(".add-btn");

function renderProducts() {
  const sorted = products.toSorted((a, b) => a.localeCompare(b, "ru"));
  productList.innerHTML = "";
  sorted.forEach((product, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}) ${product}`;
    productList.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  const input = prompt("Введите название товара:");
  if (input === null) return;
  
  const trimmed = input.trim();
  
  if (trimmed.length === 0) {
    alert("Название товара не введено!");
    return;
  }
  
  products.push(trimmed);
  renderProducts();
});

renderProducts();