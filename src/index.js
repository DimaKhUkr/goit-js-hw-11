import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import axios from 'axios';

let userRequestData = 'ukraine';
let pageNumber = 1;

async function getPic() {
  const response = await axios({
    url: 'https://pixabay.com/api/',
    params: {
      key: '33377492-476d22b77d4b85ba3622e340f',
      q: `${userRequestData}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: pageNumber,
      per_page: 30,
    },
  });
  return response.data;
}

getPic().then(console.log);
