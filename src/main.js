import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api.js';
import {
  renderImages,
  clearGallery,
  displayLoader,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const searchInput = form.querySelector('input[name="search-text"]');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const query = searchInput.value.trim();

  if (!query) {
    iziToast.info({
      message: 'Please enter a search term.',
      position: 'center',
      titleColor: '#fff',
      messageColor: '#fafafb',
      backgroundColor: '#ef4040',
      progressBarColor: '#b51b1b',
    });
    return;
  }

  clearGallery();
  displayLoader(true);

  fetchImages(query)
    .then(images => {
      if (images.length > 0) {
        renderImages(images); // Рендеримо знайдені зображення
      }
    })
    .finally(() => {
      displayLoader(false);
      searchInput.value = ''; // очищаємо поле вводу
    });
});
