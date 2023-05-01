import { wordListRUS } from './words-db.js';

const inputs = document.querySelector('.app__word');
const hintOut = document.querySelector('.app__hint span');
const guessLeft = document.querySelector('.app__guess span');
const wrongOut = document.querySelector('.app__wrong span');
const resetButton = document.querySelector('.app__reset');
const hintButton = document.querySelector('.app__show-hint');
const hintElement = document.querySelector('.app__hint');
const charInput = document.querySelector('.app__char');

let word,
    maxGuesses,
    incorrectLetters = [],
    correctLetters = [];

function startNewGame() {
    alert(`Начать новую игру! Угадай слово :)`);

    hintElement.style.display = 'none';
    hintElement.style.opacity = 0;

    // wordListRUS;
    const randomWord = wordListRUS[Math.floor(Math.random() * wordListRUS.length)];
    word = randomWord.word;

    maxGuesses = word.length >= 5 ? 8 : 6;
    incorrectLetters = [];
    correctLetters = [];
    hintOut.innerHTML = randomWord.hint;
    guessLeft.innerHTML = maxGuesses;
    wrongOut.innerHTML = incorrectLetters;

    inputs.innerHTML = '';
    for (let i = 0; i < word.length; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.disabled = true;
        input.classList.add('app__input');
        inputs.appendChild(input);
    }
}

function handleInput(e) {
    const key = e.target.value.toLowerCase();
    if (
        key.match(/^[a-zа-яё]+$/i) &&
        !incorrectLetters.includes(`${key}`) &&
        !correctLetters.includes(`${key}`)
    ) {
        if (word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === key) {
                    inputs.querySelectorAll('input')[i].value += key;
                }
            }
            correctLetters += key;
        } else {
            maxGuesses--;
            incorrectLetters.push(key);
            wrongOut.innerText = incorrectLetters;
        }
    }
    console.log('word: ', word);
    console.log('correctLetters: ', correctLetters);

    guessLeft.innerText = maxGuesses;
    if (correctLetters.length === word.length) {
        alert(`Поздравляем! Вы угадали слово ${word.toUpperCase()}`);
        startNewGame();
    } else if (maxGuesses < 1) {
        alert(`Игра закончена! У Вас закончились попытки!`);
        for (let i = 0; i < word.length; i++) {
            inputs.querySelectorAll('input')[i].value = word[i];
        }
    }

    charInput.value = '';
}

function showHintElement() {
    hintElement.style.display = 'block';
    hintElement.style.opacity = '1';
}

resetButton.addEventListener('click', startNewGame);
hintButton.addEventListener('click', showHintElement);
charInput.addEventListener('input', handleInput);
inputs.addEventListener('click', () => charInput.focus());
document.addEventListener('keydown', () => charInput.focus());

startNewGame();
