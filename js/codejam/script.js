const selectInput = document.querySelector('.app__select');
const nameinput = document.querySelector('.app__input');
const commitOut = document.querySelector('.app__out');
const copyButton = document.querySelector('.app__copy');
const generateButton = document.querySelector('.app__button');
const manyError = document.querySelector('.app__error');

const lengthCommitName = 70;

const getTime = () => {
    const date = new Date();
    const options = {
        weekday: 'short',
        month: 'short',
        year: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };
    const time = date.toLocaleDateString('en-En', options);

    return time;
};

const generateTempName = () => {
    let preffixCommit = selectInput.value;
    let nameCommit = nameinput.value;

    return (tempCommit = `${preffixCommit} ${nameCommit.toLowerCase()} (${getTime()})`);
};

const outInfo = () => {
    let tempCommit = generateTempName();

    if (tempCommit.length <= lengthCommitName) {
        manyError.classList.remove('hidden');
        manyError.classList.remove('red');
        manyError.innerText = `add ${lengthCommitName - tempCommit.length} characters`;
    } else {
        manyError.classList.remove('hidden');
        manyError.classList.add('red');
        manyError.innerText = `delete ${tempCommit.length - lengthCommitName} characters`;
    }
};

generateButton.addEventListener('click', () => {
    let nameCommit = nameinput.value;

    if (nameCommit) {
        let tempCommit = generateTempName();
        commitOut.value = `git commit -m "${tempCommit}"`;
        manyError.classList.add('hidden');
        nameinput.value = '';
        nameinput.style.setProperty('--c', '#2d0537');
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

nameinput.addEventListener('input', () => {
    outInfo();
});

selectInput.addEventListener('change', () => {
    let nameCommit = nameinput.value;

    if (nameCommit) {
        outInfo();
    }
});
