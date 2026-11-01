let heights = [164, 157, 160, 143, 170];

const heightList = document.getElementById("heightList");
const addBtn = document.getElementById("addBtn");
const filterBtn = document.getElementById("filterBtn");

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
  if (!trimmed) {
    alert("Рост не введён!");
    return;
  }
  const num = Number(trimmed);
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

  if (!trimmed) {
    renderHeights(heights);
    return;
  }

  const min = Number(trimmed);
  if (isNaN(min)) {
    alert("Введите корректное число!");
    return;
  }

  const filtered = heights.filter(h => h >= min);
  renderHeights(filtered);
});

renderHeights(heights);