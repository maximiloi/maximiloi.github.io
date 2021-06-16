const APIURL = 'https://api.openweathermap.org/data/2.5/weather';
const APIURL8 = 'https://api.openweathermap.org/data/2.5/onecall';
const APIKEY = '&appid=003857592feb5ff0def8aa4fade433b5';
const APISETTINGS = '&lang=ru&units=metric';
const APIURLSearch = 'https://api.openweathermap.org/data/2.5/weather?q=';

let lat = '';
let lng = '';

const main = document.querySelector('.main');
const weatherOnField = document.querySelector('.weather_on_field');
const weatherOnBeach = document.querySelector('.weather_on_beach');
const weatherOnFieldWrapper = document.querySelectorAll('.weather-on-field__wrapper');
const mapOverlay = document.querySelector('.map-overlay');

// navigator.geolocation.getCurrentPosition(function (position) {
//   // поиск координат где находишься
//   lat = position.coords.latitude.toFixed(4);
//   lng = position.coords.longitude.toFixed(4);

//   getWeatherByLocation(lat, lng);
// });

getWeatherOnField(60.001, 30.260, weatherOnField);
getWeatherOnField(60.109, 29.947, weatherOnBeach);


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
        <img src=" https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" width="100" height="100">
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
  console.log('URL_FIELD: ', URL_FIELD);
  const data = await response.json();
  // console.log('data: ', data);

  // let dataArrayHourly = data.hourly;
  let dayDailyArray = data.daily;

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

  const weekday = { // выводим день недели
    weekday: 'short',
  };

  const hour = { // выводим день недели
    hour: 'numeric',
  };

  const titleEL = document.createElement('h2');
  titleEL.innerText = 'Прогноз на ' + place.classList;

  const weatherEl = document.createElement('div');
  weatherEl.classList.add('weather-on-wrap');

  // const mapEL = document.createElement('div');
  // mapEL.classList.add('map-overlay');

  // mapEL.innerHTML = `<div class="map+${place.classList}"></div>`;

  // const hourlyHTML = document.createElement('ul');
  // hourlyHTML.classList.add('weatherHourly-on-wrap');

  // dataArrayHourly.forEach(hourly => {
  //   if ((new Date(hourly.dt * 1000)).toLocaleString('ru', weekday) === 'вс' &&
  //     (new Date(hourly.dt * 1000)).toLocaleString('ru', hour) === '09' || (new Date(hourly.dt * 1000)).toLocaleString('ru', hour) === '14') {
  //     hourlyHTML.innerHTML += `<li class="weather__hourly">${(new Date(hourly.dt * 1000)).toLocaleString('ru', optionsDayMount)}${(new Date(hourly.dt * 1000)).toLocaleString('ru', hour)}</li>`;
  //   }
  //   // console.log('hourlyHTML: ', hourlyHTML);
  // });

  dayDailyArray.forEach(day => {
    if ((new Date(day.dt * 1000)).toLocaleString('ru', weekday) === 'вс') {

      weatherEl.innerHTML += `
      <ul class="weather-on-field__list">
        <li class="weather-on-field__item">
          <div class="weather-on-field__inner" >
            <p class="weather-on-field__text">${(new Date(day.dt * 1000)).toLocaleString('ru', optionsDayMount)}</p>
            <p class="weather-on-field__text  weather-on-field__text--temp">${(day.temp.max).toFixed(0)} / ${(day.temp.min).toFixed(0)} °C</p>
          </div >
          <div class="weather-on-field__inner">
          <img src=" https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="${day.weather[0].description}" width="90" height="90">
            <p class="weather-on-field__text">${day.weather[0].description}</p>
          </div>
          <div class="weather-on-field__inner">
            <p class="weather-on-field__text">Расвет: ${(new Date(day.sunrise * 1000)).toLocaleString('ru', optionsTime)}</p>
            <p class="weather-on-field__text">Закат: ${(new Date(day.sunset * 1000)).toLocaleString('ru', optionsTime)}</p>
          </div>
        </li>
        <li class="weather-on-field__item">
          <p class="weather-on-field__text">Направление ветра: <i class="fas fa-location-arrow" style="transform:rotate(calc(${day.wind_deg}deg - 45deg)"></i></p>
          <p class="weather-on-field__text">Скорость ветра: ${day.wind_speed}м/c</p>
          <p class="weather-on-field__text">Порыв ветра: ${day.wind_gust}м/c</p>
          <p class="weather-on-field__text">Максимальное значение УФ-индекса за день: ${day.uvi}</p>
        </li>
        <li class="weather-on-field__item">
          <p class="weather-on-field__text">Вероятность выпадения осадков: ${day.pop}</p>
          <p class="weather-on-field__text">Влажность: ${day.humidity} %</p>
          <p class="weather-on-field__text">Облачность: ${day.clouds} %</p>
        </li>
        <li class="weather-on-field__item">
          <table class="table">
            <thead>
              <tr>
                <th></th>
                <th>Утро</th>
                <th>День</th>
                <th>Вечер</th>
                <th>Ночь</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Температура</td>
                <td>${(day.temp.morn).toFixed(1)} °C</td>
                <td>${(day.temp.day).toFixed(1)} °C</td>
                <td>${(day.temp.eve).toFixed(1)} °C</td>
                <td>${(day.temp.night).toFixed(0)} °C</td>
              </tr>
              <tr>
              <td>Ощущается как</td>
              <td>${(day.feels_like.morn).toFixed(1)} °C</td>
              <td>${(day.feels_like.day).toFixed(1)} °C</td>
              <td>${(day.feels_like.eve).toFixed(1)} °C</td>
              <td>${(day.feels_like.night).toFixed(0)} °C</td>
            </tr>
            </tbody>
          </table>
        </li>
      </ul>
    `;
    }
  });

  place.innerHTML = '';
  place.appendChild(weatherEl);
  place.insertBefore(titleEL, weatherEl);
  // place.insertBefore(mapEL, weatherEl);
  // place.appendChild(hourlyHTML); //TODO добавление часового прогноза

  // showMap(lat, lon);
}

function showMap(lat, lon) {
  let map = new GMaps({
    el: '.map',
    zoom: 16,
    lat: lat,
    lng: lon,
    mapType: 'hybrid'
  });

  map.addMarker({
    lat: lat,
    lng: lon
  });
}