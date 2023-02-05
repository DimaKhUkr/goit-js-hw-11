import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const newGalleryBtn = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');

let pageNumber = 1;

form.addEventListener('submit', onFormBtnCreateList);

async function onFormBtnCreateList(e) {
  e.preventDefault();
  const { value: inputValue } = e.currentTarget.elements.searchQuery;
  try {
    const imgData = await getPic(inputValue);
    // console.log(marcupGallery(imgData.hits));
    galleryEl.innerHTML = await marcupGallery(imgData.hits);
    lightboxGallery();
  } catch (error) {
    console.log(error);
  }
}

async function getPic(inputValue) {
  const response = await axios({
    url: 'https://pixabay.com/api/',
    params: {
      key: '33377492-476d22b77d4b85ba3622e340f',
      q: `${inputValue}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: pageNumber,
      per_page: 30,
    },
  });
  return response.data;
}

async function marcupGallery(data) {
  return await data
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
      <a class="gallery__item" href="${largeImageURL}">
      <div class="photo-card">
      <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>${likes}
        </p>
        <p class="info-item">
          <b>Views</b>${views}
        </p>
        <p class="info-item">
          <b>Comments</b>${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>${downloads}
        </p>
      </div></div></a>
    `;
      }
    )
    .join('');
}

async function lightboxGallery() {
  return new SimpleLightbox(
    '.gallery a'
    // ,
    // {
    // captionsData: 'alt',
    // captionDelay: 250,
    // }
  );
}
