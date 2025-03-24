import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import {
  refs,
  KEY,
  ACTIVE_CLASS,
  HIDDEN_CLASS,
  photosParams,
  lightbox,
} from './consts';
import { createCardsMarkup } from './render-functions';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';

async function handlerForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  refs.loadMoreBtn.classList.add(HIDDEN_CLASS);
  photosParams.page = 1;
  const query = form.elements.request.value.trim();

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

    if (photosParams.maxPage !== 1) {
      refs.loadMoreBtn.classList.remove(HIDDEN_CLASS);
      refs.loadMoreBtn.addEventListener('click', handleLoadMore);
    }
  } catch (err) {
    refs.loader.classList.remove(ACTIVE_CLASS);
    console.log(err);
  } finally {
    form.reset();
  }
}

async function handleLoadMore(event) {
  refs.loadMoreBtn.disabled = true;
  refs.loader.classList.add(ACTIVE_CLASS);
  photosParams.page += 1;
  try {
    const photos = await getPhotos(photosParams);
    refs.loader.classList.remove(ACTIVE_CLASS);
    refs.gallery.insertAdjacentHTML(
      'beforeend',
      createCardsMarkup(photos.hits)
    );
    const cardHeight = refs.gallery
      .querySelector('li')
      .getBoundingClientRect().height;
    window.scrollBy({ top: cardHeight * 2, left: 0, behavior: 'smooth' });
    lightbox.refresh();
    refs.loadMoreBtn.disabled = false;
    if (photosParams.page >= photosParams.maxPage) {
      refs.loadMoreBtn.classList.add(HIDDEN_CLASS);
      refs.loadMoreBtn.removeEventListener('click', handleLoadMore);
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (err) {
    console.log(err);
    refs.loader.classList.remove(ACTIVE_CLASS);
  }
}

async function getPhotos({ q, page = 1, perPage = 15 }) {
  const res = await axios.get('api/', {
    params: { key: KEY, q, page, per_page: perPage },
  });
  return res.data;
}

export { handlerForm };
