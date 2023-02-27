const optionButtons = document.querySelectorAll('.option__button');
const optionAdv = document.querySelectorAll('.option__adv');
const inputColors = document.querySelectorAll('.input__color');
const alignButtons = document.querySelectorAll('.align');
const spacingButtons = document.querySelectorAll('.spacing');
const formatButtons = document.querySelectorAll('.format');
const scriptButtons = document.querySelectorAll('.script');
const fontName = document.getElementById('fontName');
const fontSize = document.getElementById('fontSize');
const textInput = document.getElementById('text-input');
const linkButton = document.getElementById('createLink');
const fontList = ['Arial', 'Verdana', 'Times New Roman', 'Garamond', 'Georgia', 'Courier New', 'Cursive'];

const init = () => {
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);

    // подставляю шрифты
    fontList.map((value) => {
        let option = document.createElement('option');
        option.value = value;
        option.innerText = value;
        fontName.appendChild(option);
    });

    // Подставляю значения размеру шрифта
    for (let i = 1; i <= 7; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.innerText = i;
        fontSize.appendChild(option);
    }

    // разммер шрифта по умолчанию
    fontSize.value = 3;
};

const modifyText = (command, defaultlUi, value) => {
    document.execCommand(command, defaultlUi, value);
};

const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener('click', () => {
            if (needsRemoval) {
                let alrredyActive = false;
                if (button.classList.contains('active')) {
                    alrredyActive = true;
                }
                highlighterRemover(className);
                if (!alrredyActive) {
                    button.classList.add('active');
                }
            } else {
                button.classList.toggle('active');
            }
        });
    });
};

const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove('active');
    });
};

optionButtons.forEach((button) => {
    button.addEventListener('click', function () {
        modifyText(button.id, false, null);
    });
});

optionAdv.forEach((button) => {
    button.addEventListener('change', function () {
        modifyText(button.id, false, button.value);
    });
});

linkButton.addEventListener('click', function () {
    let userLink = prompt('Enter a URL?');
    if (/http/i.test(userLink)) {
        modifyText(linkButton.id, false, userLink);
    } else {
        userLink = 'http://' + userLink;
        modifyText(linkButton.id, false, userLink);
    }
});

window.onload = init();
