const coin = document.querySelector('.coin');
const flipButton = document.querySelector('.button__flip');
const resetButton = document.querySelector('.button__reset');

let heads = 0;
let tails = 0;

function updateStats() {
    document.querySelector(
        '.game__heads-count'
    ).textContent = `Heads: ${heads}`;
    document.querySelector(
        '.game__tails-count'
    ).textContent = `Tails: ${tails}`;
}

function disableButton() {
    flipButton.disabled = true;
    setTimeout(function () {
        flipButton.disabled = false;
    }, 3000);
}

flipButton.addEventListener('click', function () {
    let i = Math.floor(Math.random() * 2);
    coin.style.animation = 'none';

    if (i) {
        setTimeout(function () {
            coin.style.animation = 'spin-heads 3s forwards';
        }, 100);
        heads++;
    } else {
        setTimeout(function () {
            coin.style.animation = 'spin-tails 3s forwards';
        }, 100);
        tails++;
    }

    setTimeout(updateStats, 3000);
    disableButton();
});

resetButton.addEventListener('click', function () {
    coin.style.animation = 'none';
    heads = 0;
    tails = 0;
    updateStats();
});
