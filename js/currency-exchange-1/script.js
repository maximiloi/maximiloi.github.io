const amountInput = document.querySelector(".convector__input");
const outUah = document.querySelector(".convector__out--uah");
const outRub = document.querySelector(".convector__out--rub");
const valueRuble = { RUB: 1 };
let requiredCurrencies = {};

// Ввод только цифр и Добавление пробелов в водимые суммы
const addingSpacesNumber = (number) => {
  return number
    .replace(/[^0-9.]/g, "")
    .replace(/(\..*?)\..*/g, "$1")
    .replace(/^0[^.]/, "0")
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

// Получение курсов по API
const getCurrencies = async () => {
  const data = await fetch("https://www.cbr-xml-daily.ru/latest.js")
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error:", error));

  let rates = data.rates;
  let allRates = { ...valueRuble, ...rates }; // Добавления значения рубля в объект
  requiredCurrencies = {
    RUB: allRates.RUB,
    UAH: allRates.UAH,
    BYN: allRates.BYN,
  };
};

// Вывод курса
const renderExchange = () => {
  let amountValue = amountInput.value.split(" ").join("");

  outUah.value = `${addingSpacesNumber(
    (amountValue * (requiredCurrencies.UAH / requiredCurrencies.BYN)).toFixed(2)
  )}`;

  outRub.value = `${addingSpacesNumber(
    (amountValue * (100 / 3.4)).toFixed(2)
  )}`;
};

window.addEventListener("load", () => {
  getCurrencies();
});

// Ввод валют
amountInput.oninput = () => {
  amountInput.value = addingSpacesNumber(amountInput.value);
  renderExchange();
};

// слушаем сайт на клики
document.addEventListener("click", function (e) {
  const targetItem = e.target;

  // расчет курса по клику
  if (targetItem.closest(".icon img")) {
    console.log("targetItem: ", targetItem);
  }
});
