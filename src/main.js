'use strict';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"; 

import { performSearch } from './js/pixabay-api';
import { displayResults } from './js/render-functions';

const searchForm = document.querySelector('.user-search');
const inputSearchImages = document.querySelector('#input-search');
const resultsDiv = document.querySelector('#results');
const loader = document.querySelector('#loader-js');
const options = {
    key: '48301172-ef8913a37f764f18c5dbf5629',
    image_type: 'photo', 
    orientation: 'horizontal',
    safesearch: true,
  };
let lightbox = null;

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const query = inputSearchImages.value.trim();

    if (query === '') {
        iziToast.error({
            title: 'Error',
            message: "Sorry, there are no images matching your search query. Please try again!",
            position: 'topRight',
        });
        return;
    }

    resultsDiv.innerHTML = '';
    loader.classList.remove('hidden');
    performSearch(query, options, loader, resultsDiv, lightbox, displayResults);
    inputSearchImages.value = '';
});

