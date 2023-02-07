import '../css/styles.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import getPic from './fetch';

const IMG_ONPAGE = 40;

const form = document.querySelector('#search-form');
const increaseGalleryBtn = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');

form.elements.searcBtn.setAttribute('disabled', 'true');

let pageNumber = 1;
let lightbox = '';

form.addEventListener('input', () =>
  form.elements.searcBtn.removeAttribute('disabled', 'true')
);

form.addEventListener('submit', onFormBtnCreateList);
increaseGalleryBtn.addEventListener('click', onincreaseGalleryBtn);

async function onFormBtnCreateList(e) {
  e.preventDefault();
  form.elements.searcBtn.setAttribute('disabled', 'true');
  pageNumber = 1;
  const { value: inputValue } = e.currentTarget.elements.searchQuery;
  if (inputValue.trim().length === 0) {
    form.reset();
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  try {
    const imgData = await getPic(inputValue, pageNumber, IMG_ONPAGE);
    // console.log(imgData.hits.length);

    if (imgData.hits.length === 0) {
      form.reset(imgData.hits.length === 0);
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (imgData.totalHits <= IMG_ONPAGE) {
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

    // console.log(lightbox);
    increaseGalleryBtn.classList.remove('visually-hidden');
  } catch (error) {
    console.log(error);
  }
}

async function onincreaseGalleryBtn() {
  increaseGalleryBtn.classList.add('visually-hidden');
  pageNumber += 1;
  const { value: inputValue } = form.elements.searchQuery;
  try {
    const imgData = await getPic(inputValue, pageNumber, IMG_ONPAGE);
    // console.log(imgData.hits.length);
    console.log(lightbox);

    if (
      imgData.totalHits - (imgData.hits.length * pageNumber + IMG_ONPAGE) <=
      0
    ) {
      increaseGalleryBtn.classList.add('visually-hidden');
      galleryEl.insertAdjacentHTML(
        'beforeend',
        await marcupGallery(imgData.hits)
      );
      lightbox.refresh();
      return Notiflix.Notify.failure(
        `We're sorry, but you've reached the end of search results.`
      );
    }
    galleryEl.insertAdjacentHTML(
      'beforeend',
      await marcupGallery(imgData.hits)
    );
    smothScroll();
    lightbox.refresh();
    increaseGalleryBtn.classList.remove('visually-hidden');
  } catch (error) {
    console.log(error);
  }
}

// async function getPic(inputValue) {
//   const response = await axios({
//     url: 'https://pixabay.com/api/',
//     params: {
//       key: '33377492-476d22b77d4b85ba3622e340f',
//       q: `${inputValue}`,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//       page: pageNumber,
//       per_page: IMG_ONPAGE,
//     },
//   });
//   return response.data;
// }

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
  lightbox = new SimpleLightbox(
    '.gallery a'
    // ,
    // {
    // captionsData: 'alt',
    // captionDelay: 250,
    // }
  );
}

// function imgEmptyArrayChek(data) {
//   if (data.hits.length === 0) {
//     form.reset();
//     return Notiflix.Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//   }
// }

// function imgArrayLenghtChek(data) {
//   if (data.totalHits - data.hits.length * pageNumber <= 0) {
//     increaseGalleryBtn.classList.add('visually-hidden');
//     return Notiflix.Notify.failure(
//       `We're sorry, but you've reached the end of search results.`
//     );
//   }
// }

function totalScoreMessage(data) {
  Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
}

function smothScroll() {
  const { height: cardHeight } =
    galleryEl.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2.5,
    behavior: 'smooth',
  });
}
