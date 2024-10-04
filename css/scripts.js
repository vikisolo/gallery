const photosContainer = document.
querySelector ('.grid');

const API_URL = 'https://api.unsplash.com/';
const API_KEY = 'qj3CT6NPvBB6qF79T7CLDVN7aFEcXAaga7Xl057b5aQ';

async function fetchAPIData(endpoint) {
    const response = await fetch(`${API_URL}${endpoint}`);
    const data = await response.json();
    console.log(data)
    return data;
}

// функция отображения фото при загружке страницы

async function displayPhotos() {
    const data = await fetchAPIData(`grid/?per_page=30&client_id=${API_KEY}`);
    data.forEach(img => {
        const div = document.createElement('div');
        div.classList.add('img ');
        div.style.backgroundImage = `url(${img.urls.regular})`;

        photosContainer.appendChild(div);
    });
}

const searchInput = document.querySelector('.header__search input');
const searchBtn = document.querySelector('.header__search-icon');
const deleteSearchIcon = document.querySelector('.header__delete-icon');

// функция отображения результатов поиска
async function displaySearchPhotos(searchValue) {
    photosContainer.innerHTML = '';
    const data = await fetchAPIData(`search/grid/?per_page=30&query=${searchValue}&client_id=${API_KEY}`);
    console.log(data)

    if (data.results && Array.isArray(data.results)) {
        console.log(data.results.length);
        if (data.results.length === 0) {
            const div = document.createElement('div');
            div.classList.add('img ');
            div.textContent = 'No results';

            photosContainer.appendChild(div);
        } else {
            data.results.forEach(img => {
                const div = document.createElement('div');
                div.classList.add('img ');
                div.style.backgroundImage = `url(${img.urls.regular})`;
    
                photosContainer.appendChild(div);
            });
        };
    } else {
        console.error('Error');
    }
}

// прослушивание при нажатии на кнопку поиска
searchBtn.addEventListener('click', () => {
    searchListener();
})

// прослушивание при нажатии на ентер
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchListener();
    }
})

// функция поиска
function searchListener () {
    const searchValue = searchInput.value;
    console.log(searchValue);

    if (searchInput.value === '') {
        console.log('no search');
        const div = document.createElement('div');
        div.classList.add('img ');
        div.textContent = 'Please, write your search query';

    } else {
        
        displaySearchPhotos(searchValue);
    }
}

// добавление крестика
searchInput.addEventListener('input', () => {
    if (searchInput.value !== '') {
        deleteSearchIcon.style.display = 'block';
    } else {
        deleteSearchIcon.style.display = 'none';
    }
})

deleteSearchIcon.addEventListener('click', () => {
    searchInput.value = '';
    deleteSearchIcon.style.display = 'none';
})

// загрузка страницы
document.addEventListener('DOMContentLoaded', displayPhotos);

// фокус на инпут при загрузки страницы
window.addEventListener('load', () => {
    searchInput.focus();
});
