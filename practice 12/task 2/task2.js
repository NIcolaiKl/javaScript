const promocodeArr = [
  { promocode: 'PROM10', gift: "Скидка 10%" },
  { promocode: 'PROM50', gift: "Скидка 50%" },
  { promocode: 'GIFT', gift: "Подарок в корзине" }
];

const promoContainer = document.querySelector('.promo-container');
const promoForm = document.querySelector('.promo-form');
const promoInput = document.querySelector('.promo-input');
const promoMessage = document.querySelector('.promo-success-message');

// Функция получения куки
const getCookie = () => {
  return document.cookie.split('; ').reduce((acc, item) => {
    const [name, value] = item.split('=');
    acc[name] = value;
    return acc;
  }, {});
};

const setCookie = (name, value, days = 7) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

// Применение промокода к интерфейсу
const applyPromocode = (giftText, codeText) => {
  // Добавляем класс, который сделает форму зеленой и покажет текст
  promoContainer.classList.add('success');
  promoMessage.textContent = `Промокод активирован! Ваш подарок: ${giftText}`;
  
  promoInput.value = codeText; 
};

// 1. Проверка куки при загрузке страницы
const savedPromoCode = getCookie().activePromo;
if (savedPromoCode) {
  const foundPromo = promocodeArr.find(item => item.promocode === savedPromoCode);
  if (foundPromo) {
    applyPromocode(foundPromo.gift, foundPromo.promocode);
  }
}

// 2. Обработка отправки формы
promoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const inputValue = promoInput.value.trim().toUpperCase();
  
  // Проверка на пустоту (по замечанию преподавателя)
  if (inputValue.length === 0) return;

  // Ищем промокод в массиве
  const foundPromo = promocodeArr.find(item => item.promocode === inputValue);

  if (foundPromo) {
    // Промокод верный
    setCookie('activePromo', foundPromo.promocode);
    applyPromocode(foundPromo.gift, foundPromo.promocode);
  } else {
    // Промокод неверный: сбрасываем форму в исходное состояние
    promoContainer.classList.remove('success');
    promoMessage.textContent = '';
    promoInput.value = '';
  }
});