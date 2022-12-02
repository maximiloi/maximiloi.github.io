const amountInput = document.querySelector('.convector__input');
const selectInput = document.querySelectorAll('.convector__app ul');
const fromSelect = document.querySelector('.convecter__input');
const toSelect = document.querySelector('.convecter__out');
const mainCurrency = { RUB: 1 };

// Сортировка объекта (валют)
function sortObjectByKeys(obj) {
  return Object.keys(obj)
    .sort()
    .reduce((r, k) => ((r[k] = obj[k]), r), {});
}

// Ввод только цифр и Добавление пробелов в водимые суммы
const addingSpacesNumber = (number) => {
  return number
    .replace(/[^0-9.]/g, '')
    .replace(/(\..*?)\..*/g, '$1')
    .replace(/^0[^.]/, '0')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

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

  insertCurrencies(sortObjectByKeys(newData));
  renderExchange();
};

// Формирование Selectов из валют в ответе с сервера
const insertCurrencies = (newData) => {
  for (let index = 0; index < selectInput.length; index++) {
    for (const key in newData) {
      let optionTag = `<li class="convector__item" data-currency="${key}" data-rate="${newData[key]}"><img src="img/flags/${key.toLowerCase()}.png">${key}</li>`;
      selectInput[index].insertAdjacentHTML('beforeend', optionTag);
      if (index == 0 && key == 'RUB') {
        selectInput[index].previousElementSibling.setAttribute('data-rate', newData[key]);
      } else if (index == 1 && key == 'EUR') {
        selectInput[index].previousElementSibling.setAttribute('data-rate', newData[key]);
      }
    }
  }
};

// Вывод курса
const renderExchange = () => {
  const exchangeOut = document.querySelector('.convector__out');

  let amountValue = amountInput.value.split(' ').join('');
  let fromSelectRate = fromSelect.getAttribute('data-rate');
  let toSelectRate = toSelect.getAttribute('data-rate');
  let crossCourse = toSelectRate / fromSelectRate;

  exchangeOut.value = `${addingSpacesNumber((amountValue * crossCourse).toFixed(2))}`;
};

// Смена флага, значений валют
const currencyChange = () => {
  const tempRate = fromSelect.getAttribute('data-rate');
  fromSelect.setAttribute('data-rate', toSelect.getAttribute('data-rate'));
  toSelect.setAttribute('data-rate', tempRate);

  const tempFlag = fromSelect.previousElementSibling.src;
  fromSelect.previousElementSibling.src = toSelect.previousElementSibling.src;
  toSelect.previousElementSibling.src = tempFlag;

  const tempCurrency = fromSelect.innerHTML;
  fromSelect.innerHTML = toSelect.innerHTML;
  toSelect.innerHTML = tempCurrency;
};

window.addEventListener('load', () => {
  getCurrencies();
});

// Ввод валют
amountInput.oninput = () => {
  amountInput.value = addingSpacesNumber(amountInput.value);
  renderExchange();
};

// слушаем сайт на клики
document.addEventListener('click', function (e) {
  const targetItem = e.target;

  // показывать-скрывать выпадающее меню
  if (targetItem.closest('.app__inner span')) {
    if (targetItem.classList.contains('open')) {
      targetItem.classList.remove('open');
      targetItem.nextElementSibling.style.display = 'none';
    } else {
      targetItem.classList.add('open');
      targetItem.nextElementSibling.style.display = 'block';
    }
  }
  // работа с выпадающим меню
  if (targetItem.closest('.convector__item')) {
    targetItem.parentElement.previousElementSibling.classList.remove('open');
    targetItem.parentElement.style.display = 'none';
    targetItem.parentNode.previousElementSibling.innerText = targetItem.innerText.trim(' ');
    targetItem.parentElement.previousElementSibling.previousElementSibling.src = `img/flags/${targetItem.innerText.trim('').toLowerCase()}.png`;
    targetItem.parentElement.previousElementSibling.setAttribute('data-rate', targetItem.getAttribute('data-rate'));
    renderExchange();
  }
  // cмена валют местами
  if (targetItem.closest('.icon')) {
    currencyChange();
    renderExchange();
  }
});
