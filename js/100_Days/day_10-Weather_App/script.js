const weatherContainer = document.querySelector('.weather');
const searchInput = document.querySelector('.weather__input');
const searchButton = document.querySelector('.weather__button');
const weatherNotFound = document.querySelector('.weather__not-found');
const weatherBox = document.querySelector('.weather__box');
const weatherDetails = document.querySelector('.weather__details');
const flagOut = document.querySelector('.weather__search img');
const cityCoord = document.querySelector('.weather__coord');

const getWeather = () => {
    const API_KEY = '003857592feb5ff0def8aa4fade433b5';
    const city = searchInput.value;

    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                // weatherContainer.style.height = '428px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                flagOut.style.display = 'none';
                searchInput.style.marginLeft = '32px';
                cityCoord.href = '';
                weatherNotFound.style.display = 'flex';
                weatherNotFound.classList.add('fade-in');
                return;
            }

            weatherNotFound.style.display = 'none';
            weatherNotFound.classList.remove('fade-in');

            searchInput.style.marginLeft = 0;
            flagOut.style.display = 'block';
            flagOut.src = `https://flagsapi.com/${data.sys.country}/flat/32.png`;

            cityCoord.href = `https://www.google.ru/maps?q=${data.coord.lat},${data.coord.lon}`;

            const imageOut = document.querySelector('.weather__box img');
            const tempOut = document.querySelector('.weather__temperature');
            const descriptionOut = document.querySelector('.weather__description');
            const humidityOut = document.querySelector('.weather__text-span--humidity');
            const windOut = document.querySelector('.weather__text-span--wind');

            switch (data.weather[0].main) {
                case 'Clear':
                    imageOut.src = 'img/clear.png';
                    break;

                case 'Rain':
                    imageOut.src = 'img/rain.png';
                    break;

                case 'Snow':
                    imageOut.src = 'img/snow.png';
                    break;

                case 'Clouds':
                    imageOut.src = 'img/cloud.png';
                    break;

                case 'Mist':
                    imageOut.src = 'img/mist.png';
                    break;

                default:
                    imageOut.src = '';
                    break;
            }

            imageOut.alt = `${data.weather[0].description}`;
            tempOut.innerHTML = `${parseInt(data.main.temp)}<span>&#8451;</span>`;
            descriptionOut.innerHTML = `${data.weather[0].description}`;
            humidityOut.innerHTML = `${data.main.humidity}%`;
            windOut.innerHTML = `${parseInt(data.wind.speed)}km/h`;

            weatherBox.style.display = 'block';
            weatherDetails.style.display = 'flex';
            weatherBox.classList.add('fade-in');
            weatherDetails.classList.add('fade-in');

            searchInput.value = data.name;
        });
};

searchButton.addEventListener('click', getWeather);

searchInput.addEventListener('click', () => {
    searchInput.value = '';
});

searchInput.addEventListener('change', getWeather);

document.addEventListener('click', () => {
    if (searchInput.value === '') {
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        flagOut.style.display = 'none';
        cityCoord.href = '';
        searchInput.style.marginLeft = '32px';
    }
});
