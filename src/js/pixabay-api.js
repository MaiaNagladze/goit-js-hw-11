'use strict';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export function performSearch(query, options, loader, resultsDiv, lightbox, displayResults) {
    fetch(`https://pixabay.com/api/?key=${options.key}&q=${encodeURIComponent(query)}&image_type=${options.image_type}&orientation=${options.orientation}&safesearch=${options.safesearch}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error (response.status);
            }
            return response.json();
        })
        .then((data) => {
            loader.classList.add('hidden');

            if (data.hits.length === 0) {
                iziToast.warning({
                    title: 'No results',
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                });
                return;
            }
            displayResults(data.hits, resultsDiv, lightbox);

        })
        .catch((error) => {
            loader.classList.add('hidden');
            iziToast.error({
                title: 'Error',
                message: 'Sorry, an error occurred. Please try again!',
                position: 'topRight',
            });
            console.error(error);
        });
}