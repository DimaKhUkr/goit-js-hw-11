import '../css/styles.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const IMG_ONPAGE = 40;

const form = document.querySelector('#search-form');
const increaseGalleryBtn = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');

form.elements.searcBtn.setAttribute('disabled', 'true');

let pageNumber = 1;
let lightbox = '';
let inputValue = '';

form.addEventListener('input', () =>
  form.elements.searcBtn.removeAttribute('disabled', 'true')
);

form.addEventListener('submit', onFormBtnCreateList);

async function onFormBtnCreateList(e) {
  e.preventDefault();
  form.elements.searcBtn.setAttribute('disabled', 'true');
  pageNumber = 1;
  inputValue = e.currentTarget.elements.searchQuery.value;
  if (inputValue.trim().length === 0) {
    form.reset();
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  try {
    const imgData = await getPic(inputValue);
    // console.log(imgData.hits.length);

    if (imgData.hits.length === 0) {
      form.reset(imgData.hits.length === 0);
      increaseGalleryBtn.classList.add('visually-hidden');

      galleryEl.innerHTML = '';
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (imgData.totalHits <= IMG_ONPAGE) {
      increaseGalleryBtn.classList.add('visually-hidden');
      totalScoreMessage(imgData);
      galleryEl.innerHTML = await marcupGallery(imgData.hits);
      lightboxGallery();
      return Notiflix.Notify.failure(
        `We're sorry, but you've reached the end of search results.`
      );
    }

    totalScoreMessage(imgData);

    galleryEl.innerHTML = await marcupGallery(imgData.hits);
    lightboxGallery();
    increaseGalleryBtn.classList.remove('visually-hidden');
    window.addEventListener('scroll', onincreaseGalleryScroll);
  } catch (error) {
    console.log(error);
  }
}

async function onincreaseGalleryScroll() {
  const docEl = document.documentElement;

  if (docEl.getBoundingClientRect().bottom < docEl.clientHeight + 200) {
    window.removeEventListener('scroll', onincreaseGalleryScroll);
    pageNumber += 1;
    console.log(pageNumber);
    try {
      const imgData = await getPic(inputValue);
      if (imgData.totalHits - imgData.hits.length * pageNumber <= 0) {
        increaseGalleryBtn.classList.add('visually-hidden');
        galleryEl.insertAdjacentHTML(
          'beforeend',
          await marcupGallery(imgData.hits)
        );
        lightbox.refresh();
        window.removeEventListener('scroll', onincreaseGalleryScroll);
        return Notiflix.Notify.failure(
          `We're sorry, but you've reached the end of search results.`
        );
      }
      galleryEl.insertAdjacentHTML(
        'beforeend',
        await marcupGallery(imgData.hits)
      );
      lightbox.refresh();
      increaseGalleryBtn.classList.remove('visually-hidden');
      window.addEventListener('scroll', onincreaseGalleryScroll);
    } catch (error) {
      console.log(error);
    }
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
      per_page: IMG_ONPAGE,
    },
  });
  return response.data;
}

function marcupGallery(data) {
  return data
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

function lightboxGallery() {
  lightbox = new SimpleLightbox('.gallery a');
}

function totalScoreMessage(data) {
  Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
}
