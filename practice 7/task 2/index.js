let heights = [164, 157, 160, 143, 170];

const heightList = document.querySelector(".height-list");
const addBtn = document.querySelector(".add-btn");
const filterBtn = document.querySelector(".filter-btn");

function renderHeights(list) {
  heightList.innerHTML = "";
  list.forEach((height, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}) ${height}`;
    heightList.appendChild(li);
  });
}

addBtn.addEventListener("click", () => {
  const input = prompt("Введите рост ученика:");
  if (input === null) return;
  
  const trimmed = input.trim();
  
  if (trimmed.length === 0) {
    alert("Рост не введён!");
    return;
  }
  
  // Используем унарный плюс вместо Number()
  const num = +trimmed; 
  
  if (isNaN(num)) {
    alert("Введите корректное число!");
    return;
  }
  
  heights.push(num);
  renderHeights(heights);
});

filterBtn.addEventListener("click", () => {
  const input = prompt("Введите минимальный рост:");
  if (input === null) return;
  
  const trimmed = input.trim();

  if (trimmed.length === 0) {
    renderHeights(heights);
    return;
  }

  const min = +trimmed;
  
  if (isNaN(min)) {
    alert("Введите корректное число!");
    return;
  }

  const filtered = heights.filter(h => h >= min);
  renderHeights(filtered);
});

renderHeights(heights); 