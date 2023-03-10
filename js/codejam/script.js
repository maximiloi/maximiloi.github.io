const selectInput = document.querySelector('.app__select');
const nameinput = document.querySelector('.app__input');
const commitOut = document.querySelector('.app__out');
const copyButton = document.querySelector('.app__copy');
const generateButton = document.querySelector('.app__button');
const manyError = document.querySelector('.app__error');

const getTime = () => {
    const date = new Date();
    const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };
    const time = date.toLocaleDateString('en-En', options);

    return time;
};

generateButton.addEventListener('click', () => {
    let preffixCommit = selectInput.value;
    let nameCommit = nameinput.value;

    if (nameCommit) {
        let tempCommit = `${preffixCommit} ${nameCommit.toLowerCase()} (${getTime()})`;

        if (tempCommit.length > 50) {
            manyError.innerText = `delete ${tempCommit.length - 50} characters`;
            manyError.classList.remove('hidden');
        } else {
            commitOut.value = `git commit -m "${tempCommit}"`;
            manyError.classList.add('hidden');
            nameinput.value = '';
            nameinput.style.setProperty('--c', '#2d0537');
        }
    } else {
        nameinput.style.setProperty('--c', 'red');
    }
});

copyButton.addEventListener('click', () => {
    let nameCommit = commitOut.value;

    if (nameCommit === '') {
        return;
    }

    navigator.clipboard.writeText(nameCommit);
    copyButton.innerText = 'check';
    copyButton.style.color = '#33918c';
    setTimeout(() => {
        copyButton.innerText = 'copy_all';
        copyButton.style.color = '#5881c5';
    }, 1500);
});
