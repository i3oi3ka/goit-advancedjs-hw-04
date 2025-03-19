import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  refs,
  BASE_URL,
  ENDPOINT,
  KEY,
  ACTIVE_CLASS,
  lightbox,
} from './consts';
import { createCardsMarkup } from './render-functions';

const handlerForm = event => {
  event.preventDefault();
  const form = event.currentTarget;
  const query = form.elements.request.value.trim();
  if (query === '') {
    iziToast.show({
      title: 'Error',
      message: 'You entered an empty string',
      position: 'topRight',
    });
    return;
  }
  refs.loader.classList.add(ACTIVE_CLASS);
  getPhotos(query)
    .then(photos => {
      refs.loader.classList.remove(ACTIVE_CLASS);
      if (photos.total === 0) {
        iziToast.show({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        refs.gallery.innerHTML = '';
        return;
      }
      refs.gallery.innerHTML = createCardsMarkup(photos.hits);
      lightbox.refresh();
    })
    .catch(err => {
      refs.loader.classList.remove(ACTIVE_CLASS);
      console.log(err);
    })
    .finally(() => {
      form.reset();
    });
};

function getPhotos(query) {
  const SearchParams = new URLSearchParams({
    key: KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  return fetch(`${BASE_URL}/${ENDPOINT}/?${SearchParams}`).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}

export { handlerForm };
