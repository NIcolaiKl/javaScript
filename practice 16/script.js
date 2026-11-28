function sanitize(html) {
  const el = document.createElement('div');
  el.innerHTML = html;
  return el.textContent;
}

let user;

function setUser(userData) {
  user = userData;
}

function getUser() {
  return user;
}

async function getFilms() {
  try {
    const user = getUser();
    const response = await fetch("https://sb-film.skillbox.cc/films", {
      headers: {
        email: user?.email
      }
    });

    const data = await response.json();

    if (!response.ok) {
      handleErrorResponse(data);
    }

    return data;
  } catch (error) {
    handleError(error);
    return [];
  }
}

function handleErrorResponse(data) {
  const isNeedAuth = data.errors.some(error => error.location === 'headers' && error.param === 'email');

  if (isNeedAuth) {
    const err = new Error('Некорректный email');
    err.name = 'AuthError';
    throw err;
  }
}

function handleError(error) {
  if (error.name === 'AuthError') {
    throw error;
  }
  console.error(error);
}

function renderTopBar(user) {
  const el = document.createElement('div');
  el.classList.add('topbar');

  el.innerHTML = `
    <span class="topbar-logo">Фильмотека</span>
    <div class="topbar-user user">
      <div class="user-name">${sanitize(user.name)}</div>
      <div class="user-email">${sanitize(user.email)}</div>
    </div>
  `;

  return el;
}

function renderFilms(films) {
  const el = document.createElement('div');
  el.classList.add('films');

  if (films.length === 0) {
    el.innerText = 'Cписок фильмов пока пуст';
    return el;
  }

  films.forEach((film) => {
    const filmEl = document.createElement('div');
    filmEl.classList.add('films-card');
    filmEl.dataset.watched = film.isWatched;
    filmEl.textContent = `${film.title} (${film.releaseYear})`;
    el.append(filmEl);
  });

  return el;
}

function renderGlobalError(message) {
  const el = document.createElement('div');

  el.innerHTML = `
    <div class="error">
      <div class="error-title">Упс... Возникла ошибка</div>
      <div class="error-message">${sanitize(message)}</div>
    </div>
  `;

  return el;
}

function renderAuthForm(props) {
  const form = document.createElement('form');
  form.classList.add('authForm');

  form.innerHTML = `
    <label for="name">Ваше имя</label>
    <input id="name" type="text" name="name" required="true" placeholder="Василий" />
    <label for="email">Эл. почта</label>
    <input id="email" type="text" name="email" required="true" placeholder="example@mail.com" />
    <button class="authForm-submit" type="submit">Войти</button>
  `;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const formProps = Object.fromEntries(formData);
    props.onSubmit(formProps);
  });

  return form;
}

function initAuth() {
  const app = document.getElementById("app");
  app.innerHTML = '';

  app.append(renderAuthForm({
    onSubmit: (userData) => {
      setUser(userData);
      initApp();
    }
  }));
}

async function initApp() {
  const app = document.getElementById("app");
  app.innerHTML = '';

  try {
    const currentUser = getUser();
    if (!currentUser) {
      initAuth();
      return;
    }
    const films = await getFilms();
    app.append(renderTopBar(currentUser));
    app.append(renderFilms(films));
  } catch (error) {
    console.error(error);

    if (error.name === 'AuthError') {
      initAuth();
      return;
    }

    app.append(renderGlobalError(error.message));
  }
}

//Задание 4, 5
const networkAlert = document.querySelector('.network-alert');
const PING_URL = 'https://sb-film.skillbox.cc/ping';

const showNetworkAlert = (message, type = 'error') => {
  networkAlert.textContent = message;
  networkAlert.className = `network-alert ${type}`;
};

const hideNetworkAlert = () => {
  networkAlert.className = 'network-alert hidden';
};

// Функция проверки сети
const checkNetwork = async () => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 1000);
  
  const startTime = performance.now();

  try {
    const response = await fetch(PING_URL, { 
      method: 'POST',
      signal: controller.signal 
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error('Ошибка сервера');
    }

    const endTime = performance.now();
    const duration = endTime - startTime;

    if (duration > 500) {
      showNetworkAlert('Медленное соединение', 'slow');
    } else {
      hideNetworkAlert();
    }

  } catch (error) {
    clearTimeout(timeoutId);
    showNetworkAlert('Неполадки с сетью', 'error');
  }
};

checkNetwork();
setInterval(checkNetwork, 5000);

initApp();