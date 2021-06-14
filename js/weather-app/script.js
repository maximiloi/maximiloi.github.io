const APIURL = 'http://api.openweathermap.org/data/2.5/weather';
const APIURL8 = 'http://api.openweathermap.org/data/2.5/onecall';
const APIKEY = '&appid=003857592feb5ff0def8aa4fade433b5';
const APISETTINGS = '&lang=ru&units=metric';
const APIURLSearch = 'http://api.openweathermap.org/data/2.5/weather?q=';

let lat = '';
let lng = '';

const main = document.querySelector('.main');
const weatherOnField = document.querySelector('.weather_on_field');
const weatherOnBeach = document.querySelector('.weather_on_beach');
const mapOverlay = document.querySelector('.map-overlay');

navigator.geolocation.getCurrentPosition(function (position) {
  // поиск координат где находишься
  lat = position.coords.latitude.toFixed(4);
  lng = position.coords.longitude.toFixed(4);

  getWeatherByLocation(lat, lng);
  getWeatherOnField(60.00, 30.26, weatherOnField);
  getWeatherOnField(60.11, 29.94, weatherOnBeach)
});


async function getWeatherByLocation(lat, lng) {
  const url = APIURL + '?lat=' + lat + '&lon=' + lng + APISETTINGS + APIKEY;

  const response = await fetch(url);
  const data = await response.json();

  const weatherEl = document.createElement('div');
  weatherEl.classList.add('weather');

  weatherEl.innerHTML = `
    <h3 class="weather__name">Погода сейчас: ${data.name}</h3>
    <div class="weather__wrapper">
      <div class="weather__inner">
        <img src=" http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" width="100" height="100">
        <p class="weather__description">${data.weather[0].description}</p>
      </div>
      <div class="weather__inner">
        <p class="weather__name  weather__name--big">${data.main.temp} °C</p>
        <p class="weather__description">Ощущается как ${data.main.feels_like} °C</p>
      </div>
    </div>
    <p class="weather__name">Минимальная температура ${data.main.temp_min} °C</p>
    <p class="weather__name">Максимальная темперадура ${data.main.temp_max} °C</p>
  `;

  main.innerHTML = '';
  main.appendChild(weatherEl);

  showMap();
}

async function getWeatherOnField(lat, lon, place) {
  const URL_FIELD = APIURL8 + '?lat=' + lat + '&lon=' + lon + APISETTINGS + APIKEY;

  const response = await fetch(URL_FIELD);
  const data = await response.json();

  let optionsDayMount = { // выводим день недели, число и месяц
    day: 'numeric',
    month: 'numeric',
    weekday: 'short',
  };

  let optionsTime = { // выводим время
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  const titleEL = document.createElement('h2');
  titleEL.innerText = 'Прогноз погоды на ' + place.classList;

  const weatherEl = document.createElement('ul');
  weatherEl.classList.add('weather-on-field__list');

  let dayArray = data.daily;

  dayArray.forEach((day) => {

    weatherEl.innerHTML += `
    <li class="weather-on-field__item ${colorRed(day)}">
      <div class= "weather-on-field__inner" >
        <p class="weather-on-field__text">${(new Date(day.dt * 1000)).toLocaleString('ru', optionsDayMount)}</p>
        <p class="weather-on-field__text  weather-on-field__text--temp">${(day.temp.day).toFixed(0)} / ${(day.temp.night).toFixed(0)} °C</p>
      </div >
      <div class="weather-on-field__inner">
      <img src=" http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="${day.weather[0].description}" width="90" height="90">
        <p class="weather-on-field__text">${day.weather[0].description}</p>
      </div>
      <div class="weather-on-field__inner">
        <p class="weather-on-field__text">Расвет: ${(new Date(day.sunrise * 1000)).toLocaleString('ru', optionsTime)}</p>
        <p class="weather-on-field__text">Закат: ${(new Date(day.sunset * 1000)).toLocaleString('ru', optionsTime)}</p>
      </div>
    </li>
  `;
  });

  place.innerHTML = '';
  place.appendChild(weatherEl);
  place.insertBefore(titleEL, weatherEl);
}

function showMap() {
  let map = new GMaps({
    el: '#map',
    zoom: 16,
    lat: lat,
    lng: lng
  });

  map.addMarker({
    lat: lat,
    lng: lng
  });
}

function colorRed(day) {
  const weekday = { // выводим день недели
    weekday: 'short',
  };

  if ((new Date(day.dt * 1000)).toLocaleString('ru', weekday) === 'вс') {
    return 'red';
  }
}