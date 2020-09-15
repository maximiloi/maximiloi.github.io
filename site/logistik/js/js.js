"use strict";
// tabs  настройки
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

function t3() {
  document.querySelector('.services__description').style.bottom = 60 + 'px';
}
function t4() {
  document.querySelector('.services__description').style.bottom = -350 + 'px';
}

document.querySelector('.services__item').onmouseenter = t3;
document.querySelector('.services__item').onmouseleave = t4;
