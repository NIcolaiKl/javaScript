// Используем querySelector и классы вместо id
const bigBlock = document.querySelector('.big-image');
const thumbsContainer = document.querySelector('.thumbs');

// Делегирование событий: слушаем клик на контейнере
thumbsContainer.addEventListener('click', (event) => {
  // Проверяем, что кликнули именно по картинке с классом thumb
  const thumb = event.target.closest('.thumb');
  if (!thumb) return;

  // Убираем класс active у всех миниатюр
  const allThumbs = thumbsContainer.querySelectorAll('.thumb');
  allThumbs.forEach((img) => img.classList.remove('active'));

  // Добавляем класс active текущей миниатюре
  thumb.classList.add('active');

  // Получаем URL и перерисовываем большое изображение
  const fullUrl = thumb.getAttribute('data-full') || thumb.src;
  
  bigBlock.innerHTML = '';
  const bigImg = document.createElement('img');
  bigImg.src = fullUrl;
  bigImg.alt = thumb.alt;
  bigBlock.appendChild(bigImg);
});