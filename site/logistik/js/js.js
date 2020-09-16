'use strict';

// Переключение tab-ов
let tabsWrap = document.querySelector(".tabs__list");

tabsWrap.addEventListener("click", function (event) {
  if (event.target.className == "tabs__item") {
    let dataTab = event.target.getAttribute("data-tab");
    let tabs = document.getElementsByClassName("tabs__item");
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove("active");
    }
    event.target.classList.add("active");

    let content = document.getElementsByClassName("tabs__content");
    for (let i = 0; i < content.length; i++) {
      if (dataTab == i) {
        content[i].classList.add("active");
      } else {
        content[i].classList.remove("active");
      }
    }
  }
});


// Modal окно
var modal = document.querySelector(".modal");
var span = document.getElementsByClassName("close")[0];
//var btn = document.querySelector(".callback");

document.querySelectorAll('.callback').forEach(elem => {
  elem.onclick = addBlock;
});

function addBlock() {
  modal.style.display = "block";
}

// btn.onclick = function () {
//   modal.style.display = "block";
// }

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// PHPmailer
$(function () {
  $('#form').on('submit', function (e) {
    e.preventDefault();
    var fd = new FormData(this);
    $.ajax({
      url: '../php/send.php',
      type: 'POST',
      contentType: false,
      processData: false,
      data: fd,
      success: function (msg) {
        if (msg == 'ok') {
          alert('Отправлено')
        } else {
          alert('Ошибка')
        }
      }
    });
  });
});
