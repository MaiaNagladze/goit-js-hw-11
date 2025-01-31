'use strict';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"; 

import { fetchPhotosByQuery } from './js/pixabay-api';
import { createGalleryCardTemplate } from './js/render-functions';

const searchForm = document.querySelector('.user-search');
const inputSearchImages = document.querySelector('#input-search');
const resultsDiv = document.querySelector('#results');
const loader = document.querySelector('#loader-js');

let lightbox = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250 });

const onSearchFormSubmit = event => {
    event.preventDefault();

    const searchedQuery = inputSearchImages.value.trim();
    
    if (!searchedQuery) {
        iziToast.error({
            title: 'Error',
            message: 'The search field cannot be empty. Please try again!',
            position: 'topRight'
        });
        return;
    }
    resultsDiv.innerHTML = '';
    inputSearchImages.value = '';
    loader.classList.remove('hidden');

    fetchPhotosByQuery(searchedQuery)
    .then(data => {
        loader.classList.add('hidden');

        if (data.hits.length === 0) {
            iziToast.warning({
                title: 'No results',
                message: 'No images found for your query!',
                position: 'topRight',
            });
            return;
        }

        resultsDiv.innerHTML = data.hits.map(createGalleryCardTemplate).join('');
        lightbox.refresh();

    }) 
    .catch(error => {
        loader.classList.add('hidden'); 
        iziToast.error({
            title: 'Error',
            message: 'An error occurred. Please try again!',
            position: 'topRight'
        });
        console.error(error);
    })
    .finally(() => {
        searchForm.reset();
    });
};

searchForm.addEventListener('submit', onSearchFormSubmit);