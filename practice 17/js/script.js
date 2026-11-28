import { renderListPage } from './pages/list.js';
import { renderAddPage } from './pages/add.js';

const appContainer = document.querySelector('.app-container');

const renderPage = async (path) => {
  const loader = document.createElement('div');
  loader.className = 'loader-wrapper';
  loader.innerHTML = '<div class="loader"></div>';
  document.body.append(loader);

  await new Promise(resolve => setTimeout(resolve, 800));

  appContainer.innerHTML = '';

  const navigate = (url) => {
    history.pushState({}, '', url);
    renderPage(url);
  };

  let pageElement;
  if (path === '/add') {
    pageElement = renderAddPage(navigate);
  } else {
    pageElement = renderListPage(navigate);
  }

  appContainer.append(pageElement);

  loader.remove();
};

window.addEventListener('popstate', () => {
  renderPage(window.location.pathname);
});

renderPage(window.location.pathname);