import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const selectCat = document.querySelector('.breed-select');
const loading = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

loading.style.display = 'none';
catInfo.style.display = 'none';

const select = () => {
  loading.style.display = 'block';
  fetchBreeds()
    .then(breeds => {
      const options = breeds.map(breed => ({
        text: breed.name,
        value: breed.id,
      }));
      new SlimSelect({
        select: '#breed-select',
        data: options,
      });
    })
    .catch(error => {
      Notiflix.Notify.failure('Action Failed');
      console.error('Action Failed', error);
    })
    .finally(() => {
      loading.style.display = 'none';
    });
};

const showCats = breedId => {
  loading.style.display = 'block';
  Promise.all([fetchBreeds(), fetchCatByBreed(breedId)])
    .then(([breeds, catData]) => {
      const selectedBreed = breeds.find(breed => breed.id === breedId);
      const catImage = catData[0].url;
      catInfo.innerHTML = `
        <h2>${selectedBreed.name}</h2>
        <p><strong>Description:</strong> ${selectedBreed.description}</p>
        <img src="${catImage}" alt="Cat" />
      `;
      catInfo.style.display = 'block';
    })
    .catch(error => {
      Notiflix.Notify.failure('Action Failed');
      console.error('Action Failed', error);
    })
    .finally(() => {
      loading.style.display = 'none';
    });
};

selectCat.addEventListener('change', event => {
  const selectedBreedId = event.target.value;
  showCats(selectedBreedId);
});

window.addEventListener('DOMContentLoaded', handler);
function handler() {
  select();
}
