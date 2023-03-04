const form1 = document.querySelector('#form1');
const form2 = document.querySelector('#form2');
const form3 = document.querySelector('#form3');
const next1 = document.querySelector('#next1');
const next2 = document.querySelector('#next2');
const back1 = document.querySelector('#back1');
const back2 = document.querySelector('#back2');
const stepsProgressOut = document.querySelector('.steps__progress');

next1.addEventListener('click', function () {
    form1.style.left = '-450px';
    form2.style.left = '40px';
    stepsProgressOut.style.width = '240px';
});

next2.addEventListener('click', function () {
    form2.style.left = '-450px';
    form3.style.left = '40px';
    stepsProgressOut.style.width = '360px';
});

back1.addEventListener('click', function () {
    form1.style.left = '40px';
    form2.style.left = '450px';
    stepsProgressOut.style.width = '120px';
});

back2.addEventListener('click', function () {
    form2.style.left = '40px';
    form3.style.left = '450px';
    stepsProgressOut.style.width = '240px';
});
