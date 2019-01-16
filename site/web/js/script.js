"use strict";

var navPage = document.querySelector(".page-nav__list");
var hamburgerToggle = document.querySelector(".hamburger");
var logoMargin = document.querySelector(".page-header__logo");

hamburgerToggle.classList.remove("hamburger--nojs");
hamburgerToggle.classList.remove("hamburger--closed");
hamburgerToggle.classList.add("hamburger--opened");

navPage.classList.remove("page-nav--nojs");
navPage.classList.remove("page-nav--opened");
navPage.classList.add("page-nav--closed");

hamburgerToggle.addEventListener("click", function () {
  if (navPage.classList.contains("page-nav--closed")) {
    navPage.classList.remove("page-nav--closed");
    navPage.classList.add("page-nav--opened");
    hamburgerToggle.classList.add("is-active");
    logoMargin.classList.add("page-header__logo--margin-menu");
  } else {
    navPage.classList.add("page-nav--closed");
    navPage.classList.remove("page-nav--opened");
    hamburgerToggle.classList.remove("is-active");
    logoMargin.classList.remove("page-header__logo--margin-menu");
  }
});

var tabsWrap = document.querySelector(".services__list");

tabsWrap.addEventListener("click", function (event) {
  if (event.target.className == "services__item") {
    var dataTab = event.target.getAttribute("data-tab");
    var tabs = document.getElementsByClassName("services__item");
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove("active");
    }
    event.target.classList.add("active");

    var content = document.getElementsByClassName("services__content");
    for (var i = 0; i < content.length; i++) {
      if (dataTab == i) {
        content[i].classList.add("active");
      } else {
      content[i].classList.remove("active");
    }}
  }
});
