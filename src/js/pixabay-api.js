import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorIcon from '../img/bi_error.svg';

const API_KEY = '49402125-a1d49ef049172818d68ba12b9';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImages(query) {
  return axios
    .get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => {
      // Якщо немає зображень
      if (response.data.hits.length === 0) {
        iziToast.error({
          title: `Error`,
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          iconUrl: errorIcon,
          titleColor: '#fff',
          messageColor: '#fafafb',
          backgroundColor: '#ef4040',
          progressBarColor: '#b51b1b',
          class: 'custom-toast',
        });
        return []; // Повертаємо порожній масив
      }
      return response.data.hits; // Повертаємо знайдені зображення
    })
    .catch(error => {
      // Якщо сталася помилка при запиті
      iziToast.error({
        title: 'Error!',
        message:
          'There was an error fetching the images. Please try again later.',
        position: 'topRight',
        iconUrl: errorIcon,
        titleColor: '#fff',
        messageColor: '#fafafb',
        backgroundColor: '#ef4040',
        progressBarColor: '#b51b1b',
        class: 'custom-toast',
      });
      console.error('Error:', error);
      return []; // Повертаємо порожній масив у разі помилки
    });
}
