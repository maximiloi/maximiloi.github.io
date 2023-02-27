const lenghtRange = document.querySelector('.pass-length__range');
const options = document.querySelectorAll('.settings__item input');
const copyIcon = document.querySelector('.input-box__span');
const passInputOut = document.querySelector('.input-box__input');
const passIndicator = document.querySelector('.pass-indicator');
const generateButton = document.querySelector('.generate-btn');

const characters = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!$%&|[](){}:;.,*+-#@<>~',
};

const generatePassword = () => {
    let staticPassword = '';
    let randomPassword = '';
    let excludesDuplicates = false;
    let passLength = lenghtRange.value;

    options.forEach((option) => {
        if (option.checked) {
            if (option.id !== 'exc-duplicate' && option.id !== 'spaces') {
                staticPassword += characters[option.id];
            } else if (option.id === 'spaces') {
                staticPassword += `   ${staticPassword}   `;
            } else {
                excludesDuplicates = true;
            }
        }
    });

    for (let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if (excludesDuplicates) {
            !randomPassword.includes(randomChar) || randomChar == ' ' ? (randomPassword += randomChar) : i--;
        } else {
            randomPassword += randomChar;
        }
    }

    passInputOut.value = randomPassword;
};

const updatePassIndicator = () => {
    passIndicator.id = lenghtRange.value <= 8 ? 'weak' : lenghtRange.value <= 16 ? 'medium' : 'strong';
};

const updateSlider = () => {
    document.querySelector('.details__span').innerText = lenghtRange.value;
    generatePassword();
    updatePassIndicator();
};

updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passInputOut.value);
    copyIcon.innerText = 'check';
    copyIcon.style.color = '#33918c';
    setTimeout(() => {
        copyIcon.innerText = 'copy_all';
        copyIcon.style.color = '#5881c5';
    }, 1500);
};

copyIcon.addEventListener('click', copyPassword);
lenghtRange.addEventListener('input', updateSlider);
generateButton.addEventListener('click', generatePassword);
