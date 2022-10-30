const API_URL = 'https://cdn.cur.su/api/cbr.json';

const amountInput = document.querySelector('.convector__input');
const selectInput = document.querySelectorAll('.convector__app select');
const fromSelect = document.querySelector('.convector__selected-input');
const toSelect = document.querySelector('.convector__selected-out');
const exchangeIcon = document.querySelector('.icon');

// Получение курсов по API
const getCurrencies = async () => {
  const response = await axios.get(API_URL);
  const data = response.data;
  const rates = data.rates;

  insertCurrencies(rates);
  renderExchange();
};

// Формирование Selectов из валют в ответе с сервера
const insertCurrencies = (rates) => {
  for (let index = 0; index < selectInput.length; index++) {
    for (const key in rates) {
      let selected;
      if (index == 0) {
        selected = key == 'EUR' ? 'selected' : '';
      } else if (index == 1) {
        selected = key == 'RUB' ? 'selected' : '';
      }
      let optionTag = `<option value="${key}" data-rate="${rates[key]}" ${selected}>${key}</option>`;
      selectInput[index].insertAdjacentHTML('beforeend', optionTag);
    }
  }
};

// Вывод курса
const renderExchange = () => {
  const exchangeOut = document.querySelector('.convector__out');

  let amountValue = amountInput.value;

  let fromSelectRate = fromSelect.options[fromSelect.selectedIndex].getAttribute('data-rate');
  let toSelectRate = toSelect.options[toSelect.selectedIndex].getAttribute('data-rate');

  let crossCourse = toSelectRate / fromSelectRate;

  exchangeOut.value = `${(amountValue * crossCourse).toFixed(2)}`;
};

// Установка флага
const loadFlag = (element) => {
  let imgTag = element.previousElementSibling;
  imgTag.src = `img/flags/${element.value.toLowerCase()}.png`;
};

window.addEventListener('load', () => {
  getCurrencies();
});

amountInput.oninput = () => {
  renderExchange();
};

fromSelect.oninput = () => {
  renderExchange();
  loadFlag(fromSelect);
};

toSelect.oninput = () => {
  renderExchange();
  loadFlag(toSelect);
};

exchangeIcon.addEventListener('click', () => {
  let tempCode = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = tempCode;
  loadFlag(fromSelect);
  loadFlag(toSelect);
  renderExchange();
});
