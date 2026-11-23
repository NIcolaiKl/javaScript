const giftArr = [
  { title: "Скидка 20% на первую покупку в нашем магазине!", icon: "img/discount.svg" },
  { title: "Скидка 10% на всё!", icon: "img/discount_2.svg" },
  { title: "Подарок при первой покупке в нашем магазине!", icon: "img/gift.svg" },
  { title: "Бесплатная доставка для вас!", icon: "img/delivery.svg" },
  { title: "Сегодня день больших скидок!", icon: "img/discount_3.svg" }
];

const popupOverlay = document.querySelector('.popup-overlay');
const popupIcon = document.querySelector('.popup-icon');
const popupEmoji = document.querySelector('.popup-emoji');
const popupTitle = document.querySelector('.popup-title');
const popupCloseBtn = document.querySelector('.popup-close-btn');

const showRandomGift = () => {
  const randomIndex = Math.floor(Math.random() * giftArr.length);
  const gift = giftArr[randomIndex];

  // Сбрасываем состояния перед показом
  popupIcon.style.display = 'block';
  popupEmoji.style.display = 'none';
  
  // Пытаемся загрузить картинку
  popupIcon.src = gift.icon;
  
  // Если картинка не загрузилась (ошибка 404 или нет файла) — показываем эмодзи
  popupIcon.onerror = () => {
    popupIcon.style.display = 'none';
    popupEmoji.style.display = 'block';
  };

  popupTitle.textContent = gift.title;
  popupOverlay.classList.remove('hidden');
};

// Запускаем таймер на 3 секунды
setTimeout(showRandomGift, 3000);

popupCloseBtn.addEventListener('click', () => {
  popupOverlay.classList.add('hidden');
});