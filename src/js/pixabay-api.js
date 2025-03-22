import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { refs, KEY, ACTIVE_CLASS, photosParams, lightbox } from './consts';
import { createCardsMarkup } from './render-functions';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';

async function handlerForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const query = form.elements.request.value.trim();
  photosParams.page = 1;
  photosParams.maxPage = 1;
  if (query === '') {
    iziToast.show({
      title: 'Error',
      message: 'You entered an empty string',
      position: 'topRight',
    });
    return;
  }
  photosParams.q = query;
  refs.loader.classList.add(ACTIVE_CLASS);
  try {
    const photos = await getPhotos(photosParams);
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
    photosParams.maxPage = Math.ceil(photos.totalHits / photosParams.perPage);
    refs.gallery.innerHTML = createCardsMarkup(photos.hits);
    lightbox.refresh();
  } catch (err) {
    refs.loader.classList.remove(ACTIVE_CLASS);
    console.log(err);
  } finally {
    form.reset();
  }
}

async function getPhotos({ q, page = 1, perPage = 12 }) {
  const res = await axios.get('api/', {
    params: { key: KEY, q, page, per_page: perPage },
  });
  return res.data;
}

export { handlerForm };
