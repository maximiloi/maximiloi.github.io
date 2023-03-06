const quoteApiUrl = 'https://api.quotable.io/random?minLength=80&maxLength=100';
const quoteOut = document.querySelector('.quote');
const userInput = document.querySelector('.app_input');

let quote = '';
let time = 60;
let timer = '';
let mistakes = 0;

// Get random quotes from API
const renderNewQuote = async () => {
    const response = await fetch(quoteApiUrl);
    let data = await response.json();
    let quote = data.content;

    let arr = quote.split('').map(value => {
        return `<span class="quote__chars">${value}</span>`;
    });

    quoteOut.innerHTML += arr.join('');
};

userInput.addEventListener('input', () => {
    let quoteChars = document.querySelectorAll('.quote__chars');
    quoteChars = Array.from(quoteChars);
    let userInputChars = userInput.value.split('');

    quoteChars.forEach((char, index) => {
        // Проверяем правильность ввода букв, если ОК отмечаем классом 'success'
        if (char.innerText === userInputChars[index]) {
            char.classList.add('success');
        }
        // Если ничего не вводят или нажимают backspace
        else if (userInputChars[index] == null) {
            if (char.classList.contains('success')) {
                char.classList.remove('success');
            } else {
                char.classList.remove('fail');
            }
        }
        //если пользователь ввел неправильный char
        else {
            if (!char.classList.contains('fail')) {
                mistakes++;
                char.classList.add('fail');
            }
            document.querySelector('.statistics__mistakes span').innerText = mistakes;
        }
        //Возвращает true, если все символы верны
        let check = quoteChars.every(element => {
            return element.classList.contains('success');
        });
        //Завершить тест, если все символы верны
        if (check) {
            displayResult();
        }
    });
});

const updateTimer = () => {
    if (time === 0) {
        displayResult();
    } else {
        document.querySelector('.statistics__timer span').innerText = `${--time}s`;
    }
};

const setTimer = () => {
    time = 60;
    timer = setInterval(updateTimer, 1000);
};

const displayResult = () => {
    document.querySelector('.app__result').style.display = 'block';
    document.querySelector('.app__stop').style.display = 'none';
    clearInterval(timer);
    userInput.disabled = true;
    let timeTaken = 1;
    if (time != 0) {
        timeTaken = (60 - time) / 100;
    }
    document.querySelector('.result__speed span').innerText =
        (userInput.value.length / 5 / timeTaken).toFixed(2) + 'wpm';
    document.querySelector('.result__accuracy span').innerText =
        Math.round(((userInput.value.length - mistakes) / userInput.value.length) * 100) + '%';
};

//Start test
const startTest = () => {
    mistakes = 0;
    timer = '';
    userInput.disabled = false;
    setTimer();
    document.querySelector('.app__start').style.display = 'none';
    document.querySelector('.app__stop').style.display = 'block';
};

window.onload = () => {
    userInput.value = '';
    document.querySelector('.app__start').style.display = 'block';
    document.querySelector('.app__stop').style.display = 'none';
    userInput.disabled = true;
    renderNewQuote();
};

document.querySelector('.app__start').addEventListener('click', startTest);
document.querySelector('.app__stop').addEventListener('click', displayResult);
