export const fetchPhotosByQuery = query => {
    const searchParams = new URLSearchParams({
        key: '48301172-ef8913a37f764f18c5dbf5629',
        q: query,
        image_type: 'photo', 
        orientation: 'horizontal',
        safesearch: true,
      });

    return fetch(`https://pixabay.com/api/?${searchParams}`)
        .then(response => {
            if(!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });
};