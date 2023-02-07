import axios from 'axios';

export default async function getPic(inputValue, pageNumber, IMG_ONPAGE) {
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
