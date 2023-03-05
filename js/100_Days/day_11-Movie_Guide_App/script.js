const searchInput = document.querySelector('.search__input');
const searchButton = document.querySelector('.search__button');
const movieCardOut = document.querySelector('.movie__card');

function getMovie() {
    let movieName = searchInput.value;

    let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${API_KEY}`;

    if (movieName.length <= 0) {
        movieCardOut.innerHTML = `<h3 class="movie__message">Please enter a movie name</h3>`;
        return;
    } else {
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                console.log('data: ', data);
                if (data.Response === 'True') {
                    console.log('data.Response: ', data.Response);
                    movieCardOut.innerHTML = `<div class="movie__info">
                    <img class="movie__poster" src="${data.Poster}" alt="${data.Title}">
                    <div class="movie__inner">
                        <h2 class="movie__title">${data.Title}</h2>
                        <div class="movie__rating">
                            <img class="movie__rating-star" src="img/star.svg" alt="rating star">
                            <h4 class="movie__rating-number">${data.imdbRating}</h4>
                        </div>
                        <ul class="movie__details">
                            <li>${data.Rated}</li>
                            <li>${data.Year}</li>
                            <li>${data.Runtime}</li>
                        </ul>
                        <div class="movie__genre">
                            <p>${data.Genre.split(',').join('</p><p>')}</p>
                        </div>
                    </div>
                </div>
                <h3>Plot:</h3> <p>${data.Plot}</p>
                <h3>Cast:</h3> <p>${data.Actors}</p>`;
                } else {
                    movieCardOut.innerHTML = `<h3 class="movie__message">${data.Error}</h3>`;
                }
            })
            .catch(() => {
                movieCardOut.innerHTML = `<h3 class="movie__message">Error Occured</h3>`;
            });
    }
}

searchButton.addEventListener('click', getMovie);
window.addEventListener('load', getMovie);
