const amountInput = document.querySelector('.convector__input');
const selectInput = document.querySelectorAll('.convector__app select');
const fromSelect = document.querySelector('.convector__selected-input');
const toSelect = document.querySelector('.convector__selected-out');
const exchangeIcon = document.querySelector('.icon');
const mainCurrency = { RUB: 1 };

// Получение курсов по API
const getCurrencies = async () => {
  const data = await fetch('https://www.cbr-xml-daily.ru/latest.js')
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log('error:', error));

  createObject(data);
};

// Добавления значения рубля в объект
const createObject = (data) => {
  let rates = data.rates;
  let newData = { ...mainCurrency, ...rates };

  insertCurrencies(newData);
  renderExchange();
};

// Формирование Selectов из валют в ответе с сервера
const insertCurrencies = (newData) => {
  for (let index = 0; index < selectInput.length; index++) {
    for (const key in newData) {
      let selected;
      if (index == 0) {
        selected = key == 'RUB' ? 'selected' : '';
      } else if (index == 1) {
        selected = key == 'EUR' ? 'selected' : '';
      }
      let optionTag = `<option value="${key}" data-rate="${newData[key]}" ${selected}>${key}</option>`;
      selectInput[index].insertAdjacentHTML('beforeend', optionTag);
    }
  }
};

// Установка флага
const loadFlag = (element) => {
  let imgTag = element.previousElementSibling;
  imgTag.src = `img/flags/${element.value.toLowerCase()}.png`;
};

// Ввод только цифр и Добавление пробелов в водимые суммы
const addingSpacesNumber = (number) => {
  return number
    .replace(/[^0-9.]/g, '')
    .replace(/(\..*?)\..*/g, '$1')
    .replace(/^0[^.]/, '0')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

// Вывод курса
const renderExchange = () => {
  const exchangeOut = document.querySelector('.convector__out');

  let amountValue = amountInput.value.split(' ').join('');

  let fromSelectRate = fromSelect.options[fromSelect.selectedIndex].getAttribute('data-rate');
  let toSelectRate = toSelect.options[toSelect.selectedIndex].getAttribute('data-rate');

  let crossCourse = toSelectRate / fromSelectRate;

  exchangeOut.value = `${addingSpacesNumber((amountValue * crossCourse).toFixed(2))}`;
};

window.addEventListener('load', () => {
  getCurrencies();
});

amountInput.oninput = () => {
  amountInput.value = addingSpacesNumber(amountInput.value);
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
