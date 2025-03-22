import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.js-search-form'),
  gallery: document.querySelector('.js-gallery'),
  loader: document.querySelector('.loader'),
};

const photosParams = {
  page: 1,
  perPage: 12,
  maxPage: 1,
};

const KEY = '49310743-65b3f3ce2dd3324f0da11ae2e';
const ACTIVE_CLASS = 'active';

const lightbox = new SimpleLightbox('.js-gallery a', {
  captionsData: 'alt', // Use the alt attribute of images for captions
  captionDelay: 250, // Delay in milliseconds before showing the caption
});

export { refs, KEY, ACTIVE_CLASS, photosParams, lightbox };
