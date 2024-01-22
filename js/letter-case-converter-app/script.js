const appInput = document.querySelector('.app__input');
const appOutput = document.querySelector('.app__output');
const toast = document.querySelector('.toast');

function showToast(text) {
  toast.style.display = 'block';
  toast.innerText = text;
  setTimeout(function () {
    toast.style.display = 'none';
  }, 1500);
}

const documentActions = async (e) => {
  const inputText = appInput.value;
  const stringLowerCase = inputText.toLowerCase();
  const targetElem = e.target;

  if (!inputText) {
    showToast('Type in text / Введите текст');
    return;
  }

  if (targetElem.closest('.button__upper')) {
    appOutput.innerText = inputText.toUpperCase();
  }

  if (targetElem.closest('.button__lower')) {
    appOutput.innerText = stringLowerCase;
  }

  if (targetElem.closest('.button__sentence')) {
    appOutput.innerText =
      stringLowerCase.charAt(0).toUpperCase() + stringLowerCase.slice(1);
  }

  if (targetElem.closest('.button__capitalize')) {
    const wordsArr = stringLowerCase.split(' ');
    const newArray = wordsArr.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    appOutput.innerText = newArray.join(' ');
  }

  if (targetElem.closest('.button__variable')) {
    let apiUrl = `https://api.mymemory.translated.net/get?q=${inputText}&langpair=ru-RU|en-GB`;
    let translatedWords = await fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => data.responseData.translatedText);
    let words = translatedWords.split(' ');
    appOutput.innerText =
      words[0].toLowerCase() +
      words
        .slice(1)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
  }

  if (targetElem.closest('.app__output')) {
    if (!inputText) {
      showToast('Type in text / Введите текст');
    } else if (!appOutput.value) {
      showToast('Click the button / Нажмите кнопку');
    } else {
      appOutput.select();
      document.execCommand('copy');
      showToast('Text copied to clipboard / Текст скопирован в буфер обмена');
    }
  }
};

document.addEventListener('click', documentActions);
