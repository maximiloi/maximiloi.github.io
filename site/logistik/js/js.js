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

let navMain = document.querySelector(".main-nav");
let navToggle = document.querySelector(".main-nav__toggle");

navMain.classList.remove("main-nav--nojs");
navMain.classList.remove("main-nav--opened");
navMain.classList.add("main-nav--closed");

navToggle.addEventListener("click", function () {
  if (navMain.classList.contains("main-nav--closed")) {
    navMain.classList.remove("main-nav--closed");
    navMain.classList.add("main-nav--opened");
  } else {
    navMain.classList.add("main-nav--closed");
    navMain.classList.remove("main-nav--opened");
  }
});

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


//scrollUp
$(document).ready(function () {

  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.scrollup').fadeIn();
    } else {
      $('.scrollup').fadeOut();
    }
  });

  $('.scrollup').click(function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });

  $('.lightzoom').lightzoom({
    speed: 400,   // скорость появления
    imgPadding: 10,    // значение отступа у изображения
    overlayOpacity: '0.5', // прозрачность фона (от 0 до 1)
    viewTitle: false, // true, если надо показывать подпись к изобажению
    isOverlayClickClosing: true, // true, если надо закрывать окно при клике по затемненной области
    isWindowClickClosing: true, // true, если надо закрывать окно при клике по любой области
    isEscClosing: true  // true, если надо закрывать окно при нажатии на кнопку Esc
  });

});