const selectInput = document.querySelector('.app__select');
const nameinput = document.querySelector('.app__input');
const commitOut = document.querySelector('.app__out');
const copyButton = document.querySelector('.app__copy');
const generateButton = document.querySelector('.app__button');

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
    const currentDate = date.toLocaleDateString('en-En', options);

    return currentDate;
};

generateButton.addEventListener('click', () => {
    let preffixCommit = selectInput.value;
    let nameCommit = nameinput.value;

    if (nameCommit) {
        commitOut.value = `git commit -m "${preffixCommit} ${nameCommit} (${getTime()})"`;

        nameinput.value = '';
        nameinput.style.setProperty('--c', '#2d0537');
    } else {
        nameinput.style.setProperty('--c', 'red');
    }
});

copyButton.addEventListener('click', () => {
    let nameCommit = commitOut.value;
    navigator.clipboard.writeText(nameCommit);
    copyButton.innerText = 'check';
    copyButton.style.color = '#33918c';
    setTimeout(() => {
        copyButton.innerText = 'copy_all';
        copyButton.style.color = '#5881c5';
    }, 1500);
});
