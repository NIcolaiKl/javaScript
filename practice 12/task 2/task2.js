const promocodeArr = [
  { promocode: 'PROM10', gift: "Скидка 10%" },
  { promocode: 'PROM50', gift: "Скидка 50%" },
  { promocode: 'GIFT', gift: "Подарок в корзине" }
];

const promoContainer = document.querySelector('.promo-container');
const promoForm = document.querySelector('.promo-form');
const promoInput = document.querySelector('.promo-input');
const promoMessage = document.querySelector('.promo-success-message');

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
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
};

const applyPromocode = (giftText, codeText) => {
  promoContainer.classList.add('success');
  promoMessage.textContent = `Промокод активирован! Ваш подарок: ${giftText}`;
  promoInput.value = codeText; 
};

const initCookie = () => {
  const savedPromoCode = getCookie().activePromo;
  if (!savedPromoCode) return;
  
  const foundPromo = promocodeArr.find(item => item.promocode === savedPromoCode);
  if (foundPromo) {
    applyPromocode(foundPromo.gift, foundPromo.promocode);
  }
};

promoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const inputValue = promoInput.value.trim().toUpperCase();
  if (inputValue.length === 0) return;

  const foundPromo = promocodeArr.find(item => item.promocode === inputValue);

  if (foundPromo) {
    setCookie('activePromo', foundPromo.promocode);
    applyPromocode(foundPromo.gift, foundPromo.promocode);
    return;
  }

  promoContainer.classList.remove('success');
  promoMessage.textContent = '';
  promoInput.value = '';
});

initCookie();