const APIURL8 = 'https://api.openweathermap.org/data/2.5/onecall';
const APIKEY = '&appid=003857592feb5ff0def8aa4fade433b5';
const APISETTINGS = '&lang=ru&units=metric';

const weatherOnField = document.querySelector('.weather__on--field');
const weatherOnBeach = document.querySelector('.weather__on--beach');

getWeatherOnField(60.001, 30.260, weatherOnField);
getWeatherOnField(60.109, 29.947, weatherOnBeach);

async function getWeatherOnField(lat, lon, place) {
  const URL_FIELD = APIURL8 + '?lat=' + lat + '&lon=' + lon + APISETTINGS + APIKEY;

  const response = await fetch(URL_FIELD);
  const data = await response.json();
  const dayDailyArray = data.daily;

  const optionsDayMount = { // выводим день недели, число и месяц
    day: 'numeric',
    month: 'numeric',
    weekday: 'short',
  };

  const optionsTime = { // выводим время
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };

  const weekday = { // выводим день недели
    weekday: 'short',
  };

  const titleEL = document.createElement('h2');
  titleEL.innerHTML = 'Прогноз на ' + (place.className === 'weather__on--field' ? 'поле' : 'пляже');

  const coordEL = document.createElement('span');
  coordEL.classList.add('ymaps-geolink');
  coordEL.innerHTML = `${lat}, ${lon}`;

  const weatherEl = document.createElement('div');
  weatherEl.classList.add('weather-on-wrap');

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
  place.insertBefore(coordEL, weatherEl);
}