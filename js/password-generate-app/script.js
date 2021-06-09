const pwOutEl = document.querySelector('.pw_out');
const pwCopyEl = document.querySelector('.pw_copy');
const pwGeneratorEl = document.querySelector('.pw_generator');
const pwLengthEl = document.getElementById('length');
const upperEl = document.getElementById('upper');
const lowerEl = document.getElementById('lower');
const numberEl = document.getElementById('number');
const symbolEl = document.getElementById('symbol');

const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%ˆ&*()_+=';

function getUpperCase() {
  return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getLowerCase() {
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getNumber() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatX() {
  const xs = [];

  if (upperEl.checked) {
    xs.push(getUpperCase());
  }

  if (lowerEl.checked) {
    xs.push(getLowerCase());
  }

  if (numberEl.checked) {
    xs.push(getNumber());
  }

  if (symbolEl.checked) {
    xs.push(getSymbol());
  }

  if (xs.length === 0) {
    return '';
  }

  return xs[Math.floor(Math.random() * xs.length)];
}

function generatorPassword() {
  const len = pwLengthEl.value;
  pwCopyEl.innerHTML = 'Копировать в буфер обмена';
  let password = '';

  for (let i = 0; i < len; i++) {
    const x = generatX();
    password += x;
  }

  pwOutEl.innerText = password;
}

pwGeneratorEl.addEventListener('click', generatorPassword);

pwOutEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = pwOutEl.innerHTML;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  pwCopyEl.innerHTML = 'Пароль скопирован';
});