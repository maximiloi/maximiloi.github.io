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

const documentActions = (e) => {
  const textInput = appInput.value;
  const targetElem = e.target;

  if (targetElem.closest('.button__upper')) {
    appOutput.innerText = textInput.toUpperCase();
  }

  if (targetElem.closest('.button__lower')) {
    appOutput.innerText = textInput.toLowerCase();
  }

  if (targetElem.closest('.button__sentence')) {
    const newString = textInput.toLowerCase();
    appOutput.innerText =
      newString.charAt(0).toUpperCase() + newString.slice(1);
  }

  if (targetElem.closest('.button__capitalize')) {
    const newString = textInput.toLowerCase();
    const wordsArr = newString.split(' ');
    const newArray = wordsArr.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    appOutput.innerText = newArray.join(' ');
  }

  if (targetElem.closest('.app__output')) {
    if (!textInput) {
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
