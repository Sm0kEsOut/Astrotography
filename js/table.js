$('document').ready(function () {
    const apiKey = 'yourapikey';
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=50&thumbs=true`;

    async function fetchNasaPhotos() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            populateTable(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function populateTable(photos) {
        const tableBody = document.querySelector('#nasaTable tbody');
        tableBody.innerHTML = '';

        photos.forEach(photo => {
            const row = `<tr>
            <td><a href="${photo.url}" target="_blank">${photo.title}</a></td>
            <td>${photo.copyright || 'Unknown'}</td>
            <td>${photo.date}</td>
            </tr>`;
            tableBody.insertAdjacentHTML('beforeend', row);
        });
    }

    fetchNasaPhotos();
});