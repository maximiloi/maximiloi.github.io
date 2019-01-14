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
