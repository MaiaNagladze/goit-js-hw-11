'use strict';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export function displayResults(images, resultsDiv, lightbox) {
    const markup = images
        .map((image) => 
            `<li class='gallery-item'>
              <a class='gallery-link' href='${image.largeImageURL}'>
              <img class='gallery-img' src='${image.webformatURL}' alt='${image.tags}' />
              </a>
              <div class='comment-box'>
                <p class='img-comment'><b class='img-comment-title'>Likes</b>: ${image.likes}</p>
                <p class='img-comment'><b class='img-comment-title'>Views</b>: ${image.views}</p>
                <p class='img-comment'><b class='img-comment-title'>Comments</b>: ${image.comments}</p>
                <p class='img-comment'><b class='img-comment-title'>Downloads</b>: ${image.downloads}</p>
              </div>
            </li>`)
            .join('');
    resultsDiv.innerHTML = markup;
        if (!lightbox) {
            lightbox = new SimpleLightbox('.gallery a', {
            captions: true,
            captionsData: 'alt',
            captionDelay: 250,
            nav: true,
            });
        } else {
            lightbox.refresh();
        }
}
