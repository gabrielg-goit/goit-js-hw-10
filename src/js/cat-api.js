import Notiflix from 'notiflix';
import axios from 'axios';

const api_key =
  'live_Qg1IKeDuL5nHM9ubmt1xjkIStNcZ1di5Ks1Q3Ie3AzdDTYj9IQxtlaMl0Qkw2eRN';
axios.defaults.headers.common['x-api-key'] = api_key;
const url = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
  return axios
    .get(`${url}/breeds`)
    .then(response => response.data)
    .catch(error => {
      Notiflix.Notify.failure('Action failed');
      console.error('Action failed', error);
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`${url}/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      Notiflix.Notify.failure('Action failed');
      console.error('Action failed', error);
    });
}
